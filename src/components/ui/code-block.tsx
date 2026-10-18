import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { Prism as SyntaxHighlighter, type SyntaxHighlighterProps } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  allowCopy?: boolean;
  hideNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
} & Omit<SyntaxHighlighterProps, "language" | "children"> & (
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

export function CodeBlock({ 
  code, 
  language, 
  className = "", 
  filename = "", 
  allowCopy = true, 
  hideNumbers = false, 
  highlightLines = [], 
  tabs = [], 
  ...props 
}: CodeBlockProps) {
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
      className={`relative rounded-lg bg-bg border border-border font-mono text-sm ${className}`}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {tabsExist && (
        <div className="rounded-t-lg border-b border-border bg-input/20 flex overflow-x-auto max-w-full">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2.5 text-xs transition-colors font-sans whitespace-nowrap ${
                activeTab === index
                  ? "bg-secondary text-secondary-text"
                  : "bg-transparent text-text/60 hover:text-text hover:bg-secondary/30"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      )}

      {!tabsExist && filename && (
        <div className="text-xs text-text/60 px-4 py-2 border-b border-border bg-input/20">
          {filename}
        </div>
      )}

      {allowCopy && (
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 z-10 flex items-center gap-1 cursor-pointer rounded-md bg-primary px-2 py-1 text-xs text-primary-text hover:bg-accent transition-colors font-sans shadow-sm"
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
            showLineNumbers={!hideNumbers}
            lineProps={(lineNumber: number) => ({
              className: activeHighlights.includes(lineNumber)
                ? "block w-full bg-secondary/50 border-accent"
                : "block w-full border-transparent hover:bg-secondary/30 hover:border-accent/50 transition-colors",
            })}
            PreTag="div"
            {...props}
          >
            {String(activeCode)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}