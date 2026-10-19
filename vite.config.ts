import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function plainTextExportPlugin(): Plugin {
  let isBuild = false;

  const cleanText = (code: string) => {
    const extractedText: string[] = [];

    const templateLiteralRegex = /`([^`]+)`/g;
    let match: RegExpExecArray | null;
    while ((match = templateLiteralRegex.exec(code)) !== null) {
      const val = match[1].trim();
      if (val && !val.startsWith('/') && val.length > 5) {
        const cleanSnippet = val.replace(/\$\{[^}]+\}/g, '');
        extractedText.push(cleanSnippet);
      }
    }

    const propRegex = /\b(?:label|title|caption|tooltip|alt|placeholder|name)\b\s*[:=]\s*["']([^"']+)["']/gi;
    while ((match = propRegex.exec(code)) !== null) {
      if (match[1] && match[1].trim()) {
        extractedText.push(match[1].trim());
      }
    }

    const codeWithoutComments = code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*/g, '');

    // 4. Extract text nodes inside JSX elements (> text <)
    const jsxTextRegex = />([^<>{}\r\n]+)</g;
    while ((match = jsxTextRegex.exec(codeWithoutComments)) !== null) {
      const textNode = match[1].trim();
      if (textNode) {
        extractedText.push(textNode);
      }
    }

    return extractedText
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const generatePlainTextFile = () => {
    const contentDir = path.resolve(process.cwd(), 'src/content');
    if (!fs.existsSync(contentDir)) return;

    const getTsxFiles = (dir: string): string[] => {
      let results: string[] = [];
      const list = fs.readdirSync(dir);

      list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
          results = results.concat(getTsxFiles(filePath));
        } else if (
          file.endsWith('.tsx') &&
          !file.startsWith('_')
        ) {
          results.push(filePath);
        }
      });

      return results;
    };

    const files = getTsxFiles(contentDir);
    let combinedText = '';

    files.forEach((file) => {
      const rawCode = fs.readFileSync(file, 'utf-8');
      const text = cleanText(rawCode);
      const relativePath = path.relative(contentDir, file).replace(/\\/g, '/');

      combinedText += `========================================\n`;
      combinedText += `FILE: ${relativePath}\n`;
      combinedText += `========================================\n`;
      combinedText += `${text}\n\n`;
    });

    const rootFilePath = path.resolve(process.cwd(), 'plainText.txt');
    fs.writeFileSync(rootFilePath, combinedText, 'utf-8');
    console.log(`\n✅ Exported plainText.txt (${files.length} pages) to project root.\n`);
  };

  return {
    name: 'vite-plugin-plain-text-export',

    configResolved(config) {
      isBuild = config.command === 'build';
    },

    buildStart() {
      if (!isBuild) return;
      generatePlainTextFile();
    },

    transform(code, id) {
      if (!isBuild) return;

      if (
        id.includes('/src/content/') &&
        id.endsWith('.tsx') &&
        !id.endsWith('index.tsx') &&
        !id.endsWith('_index.tsx')
      ) {
        const rawText = cleanText(code);

        if (!code.includes('plainText:')) {
          const pageExportRegex = /(export\s+const\s+page(?:\s*:\s*[\w<>]+)?\s*=\s*\{)/;
          if (pageExportRegex.test(code)) {
            const injectedCode = code.replace(
              pageExportRegex,
              `$1\n  plainText: ${JSON.stringify(rawText)},`
            );
            return { code: injectedCode, map: null };
          }
        }
      }
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    plainTextExportPlugin(),
  ],
});