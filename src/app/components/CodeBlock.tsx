import React from "react";
import { Highlight, HighlightProps, themes } from "prism-react-renderer";

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
      const indent = line.match(/^\s*/)[0].length;
      return Math.min(min, indent);
    }, Infinity);

  // Remove the common indentation from all lines
  return lines.map((line) => line.slice(minIndent)).join("\n");
};

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const processedCode = dedentString(code);

  return (
    <div className="min-w-[50vw]">
      <Highlight
        theme={themes.shadesOfPurple}
        code={processedCode}
        language={language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={{ ...style, padding: "1rem" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
