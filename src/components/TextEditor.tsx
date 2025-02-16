import { useRef, useCallback } from "preact/hooks";
import { useEditorContext } from "../context/EditorContext";

function sanitizeContent(html: string) {
  // Keep allowed tags and remove disallowed tags
  const allowedTags = /<\/?(b|i|u|strong|em|p|br|ul|ol|li|div)[^>]*>/gi;
  return html.replace(/<[^>]+>/g, (tag) => (tag.match(allowedTags) ? tag : ""));
}

export default function TextEditor() {
  const editorRef = useRef(null);
  const { editorContent, setEditorContent, setIsNoteContentEdited } =
    useEditorContext();

  // Handle input changes on the editor
  const handleEditorChange = useCallback(
    (content) => {
      setEditorContent(content);
      // Save content to localStorage whenever it changes
      localStorage.setItem("textEditorContent", content);
      setIsNoteContentEdited(true);
    },
    [setEditorContent, setIsNoteContentEdited]
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
      class="m-5 border border-inherit rounded bg-neutral-800 h-full p-2.5 text-base overflow-auto"
      dangerouslySetInnerHTML={{ __html: editorContent }}
      autofocus
    />
  );
}
