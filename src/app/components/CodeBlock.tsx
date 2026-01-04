"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

const dedentString = (code: string) => {
  const lines = code.split("\n");
  if (lines.length <= 1) return code;

  if (lines[0].trim() === "") lines.shift();
  if (lines[lines.length - 1].trim() === "") lines.pop();

  const minIndent = lines
    .filter((line) => line.trim().length > 0)
    .reduce((min, line) => {
      const indentMatch = line.match(/^\s*/);
      if (indentMatch) {
        const indent = indentMatch[0].length;
        return Math.min(min, indent);
      }
      return min;
    }, Infinity);

  return lines.map((line) => line.slice(minIndent)).join("\n");
};

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const processedCode = dedentString(code);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(processedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 rounded-lg overflow-hidden bg-[#1e1e1e] border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#333]">
        <span className="text-xs font-mono text-[#858585]">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs text-[#858585] transition-smooth hover:text-[#ccc] focus:outline-none"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <Highlight
          theme={themes.vsDark}
          code={processedCode}
          language={language}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="py-4 px-4 text-sm font-mono leading-relaxed"
              style={{
                ...style,
                background: "transparent",
                margin: 0,
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell text-right pr-4 select-none text-[#555] text-xs w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeBlock;
