import { useRef, useCallback } from "preact/hooks";
import { useEditorContext } from "../context/EditorContext";

function sanitizeContent(html: string) {
  // Keep allowed tags and remove disallowed tags
  const allowedTags = /<\/?(b|i|u|strong|em|p|br|ul|ol|li|div)[^>]*>/gi;
  return html.replace(/<[^>]+>/g, (tag) => (tag.match(allowedTags) ? tag : ""));
}

export default function TextEditor({ class: className = "" }) {
  const editorRef = useRef(null);
  const { editorContent, handleSetEditorContent, setIsNoteContentEdited } =
    useEditorContext();

  // Handle input changes on the editor
  const handleEditorChange = useCallback(
    (content) => {
      handleSetEditorContent(content);
      setIsNoteContentEdited(true);
    },
    [handleSetEditorContent, setIsNoteContentEdited]
  );

  // Handle input changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = sanitizeContent(editorRef.current.innerHTML);
      handleEditorChange(content);
    }
  }, []);

  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      class={`border border-inherit rounded bg-neutral-800 p-2.5 text-base overflow-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: editorContent }}
      autofocus
    />
  );
}
