import { useRef, useCallback } from "preact/hooks";
import type { Note } from "../types/note";

interface TextEditorProps {
  content: string;
  onChange: (newNote: Note["content"]) => void;
}

function sanitizeContent(html: string) {
  // Keep allowed tags and remove disallowed tags
  const allowedTags = /<\/?(b|i|u|strong|em|p|br|ul|ol|li|div)[^>]*>/gi;
  return html.replace(/<[^>]+>/g, (tag) =>
    tag.match(allowedTags) ? tag : ""
  );
}

export default function TextEditor({ content, onChange }: TextEditorProps) {
  const editorRef = useRef(null);

  // Handle input changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = sanitizeContent(editorRef.current.innerHTML);
      onChange(content);
    }
  }, []);

  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      class="border border-inherit rounded bg-neutral-800 h-full p-2.5 text-base overflow-auto"
      dangerouslySetInnerHTML={{ __html: content }}
      autofocus
    />
  );
}
