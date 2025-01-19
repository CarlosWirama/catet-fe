import { type JSX } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

export default function TextEditor(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const className = props.className ?? props.class ?? "";

  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("textEditorContent") || "";
    setContent(savedContent);
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("textEditorContent", content);
  }, [content]);

  // Handle input changes
  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const containerClass = "m-5 flex-auto max-h-full overflow-auto border border-inherit rounded";
  const contentClass = "p-2.5 text-base";
  return (
    <div
      {...props}
      ref={editorRef}
      contentEditable
      // suppressContentEditableWarning
      onInput={handleInput}
      class={containerClass + contentClass + className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
