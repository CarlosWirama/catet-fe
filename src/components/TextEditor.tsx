import { type JSX } from "preact";
import { useState, useEffect, useRef, useCallback } from "preact/hooks";
import type { Note } from "../types/note";

type TextEditorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  onSaveNote: (newNote: Note["content"]) => void;
};

function sanitizeContent(html: string) {
  // Keep allowed tags and remove disallowed tags
  const allowedTags = /<\/?(b|i|u|strong|em|p|br|ul|ol|li|div)[^>]*>/gi;
  return html.replace(/<[^>]+>/g, (tag) =>
    tag.match(allowedTags) ? tag : ""
  );
}

export default function TextEditor({
  onSaveNote,
  ...props
}: TextEditorProps) {
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
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = sanitizeContent(editorRef.current.innerHTML);
      setContent(content);
    }
  }, []);

  const handleAddNote = useCallback(() => {
    onSaveNote(editorRef.current.innerHTML);
  }, []);

  return (
    <>
      <div
        {...props}
        ref={editorRef}
        contentEditable
        // TODO do we still need this?
        // suppressContentEditableWarning
        onInput={handleInput}
        class={`"border border-inherit rounded bg-neutral-800 p-2.5 text-base" ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
        autofocus
      />
      <button
        onClick={handleAddNote}
        role="button"
        type="button"
        class="my-5 rounded p-4 bg-emerald-600 hover:bg-emerald-500 transition-all text-xl"
      >
        Save
      </button>
    </>
  );
}
