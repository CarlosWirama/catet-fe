import { type JSX } from "preact";
import { useState, useEffect, useRef, useCallback } from "preact/hooks";
import { sanitizeContent } from "./helpers";
import type { Note } from "../../types/note";

type TextEditorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isEditing: boolean;
  onSaveNote: (newNote: Partial<Note>) => void;
};

export default function TextEditor({
  isEditing,
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
    onSaveNote({
      content: editorRef.current.innerHTML,
      ...(isEditing ? { editedAt: new Date() } : { createdAt: new Date() }),
    });
  }, []);

  return (
    <>
      <div
        {...props}
        ref={editorRef}
        contentEditable
        // suppressContentEditableWarning
        onInput={handleInput}
        class={`"border border-inherit rounded bg-neutral-800 p-2.5 overflow-auto text-base" ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
        autofocus
      />
      <button
        onClick={handleAddNote}
        role="button"
        type="button"
        class="my-5 rounded p-4 bg-emerald-600 hover:bg-emerald-500 transition-all text-xl"
      >
        Note
      </button>
    </>
  );
}
