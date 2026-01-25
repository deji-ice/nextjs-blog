"use client";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ language, code }: any) => {
  // Fallback to 'text' if language is undefined or empty
  console.log(language);
  const lang = language || "text";

  return (
    <SyntaxHighlighter language={lang} style={prism}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
