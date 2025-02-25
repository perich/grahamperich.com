"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

const dedentString = (code: string) => {
  // Split into lines and remove empty first/last lines from template literals
  const lines = code.split("\n");
  if (lines.length <= 1) return code;

  // Remove empty first and last lines that come from template literals
  if (lines[0].trim() === "") lines.shift();
  if (lines[lines.length - 1].trim() === "") lines.pop();

  // Find the minimum indentation level
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

  // Remove the common indentation from all lines
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
    <div className="group relative my-8 rounded-lg overflow-hidden shadow-2xl">
      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-xs font-mono text-gray-400 ml-2">
              {language}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors duration-200 focus:outline-none"
          >
            {copied ? (
              <span className="text-blue-400">Copied!</span>
            ) : (
              <span>Copy</span>
            )}
          </button>
        </div>

        <div className="overflow-x-auto">
          <Highlight
            theme={themes.vsDark}
            code={processedCode}
            language={language}
          >
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className="py-4 px-5 text-sm font-mono"
                style={{
                  ...style,
                  background: "transparent",
                  margin: 0,
                }}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    className="table-row"
                  >
                    <span className="table-cell text-right pr-4 select-none text-gray-500 text-xs">
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
    </div>
  );
};

export default CodeBlock;
