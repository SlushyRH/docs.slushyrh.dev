import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  allowCopy?: boolean;
  highlightLines?: number[];
  className?: string;
} & (
  | {
    code: string;
    language: string;
    filename?: string;
    tabs?: never;
  } | {
    code?: never;
    language?: never;
    filename?: never;
    tabs: Array<{
      name: string;
      code: string;
      language: string;
      highlightLines?: number[];
    }>;
  }
)

export function CodeBlock({ code, language, className = "", filename = "", allowCopy = true, highlightLines = [], tabs = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const tabsExist = tabs.length > 0;
  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlights = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div
      className={`relative rounded-lg bg-secondary font-mono text-sm ${className}`}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {tabsExist && (
        <div className="rounded-t-lg border-b border-zinc-700 bg-secondary flex overflow-x-auto max-w-full">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`rounded-t-md px-3 py-2 text-xs transition-colors font-sans whitespace-nowrap ${
                activeTab === index
                  ? "bg-zinc-800 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      )}

      {!tabsExist && filename && (
        <div className="text-xs text-zinc-400 px-4 py-2">{filename}</div>
      )}

      {allowCopy && (
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 z-10 flex items-center gap-1 cursor-pointer rounded-md bg-primary/80 px-2 py-1 text-xs text-zinc-300 hover:bg-accent hover:text-white transition-colors font-sans"
        >
          {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
        </button>
      )}

      <div className="flex-1 overflow-auto w-full h-full show-scrollbar">
        <div className="min-w-0 w-full h-full">
          <SyntaxHighlighter
            language={activeLanguage}
            style={atomDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.875rem",
              minWidth: 0,
            }}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={(lineNumber: number) => ({
              style: {
                backgroundColor: activeHighlights.includes(lineNumber)
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
                display: "block",
                width: "100%",
              },
            })}
            PreTag="div"
          >
            {String(activeCode)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}