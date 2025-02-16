import { useCallback } from "preact/hooks";
import { useLocation } from "preact-iso";
import { useEditorContext } from "../context/EditorContext";
import { svgPaths } from "../icons/svgPaths";
import IconButton from "./IconButton";

export default function Navbar() {
  const { url } = useLocation();

  const {
    setEditorContent,
    setEditIndex,
    isNoteContentEdited,
    setIsNoteContentEdited,
    isNoteListOpen,
    setIsNoteListOpen,
    handleSaveNote,
  } = useEditorContext();

  const handleClearNote = useCallback(() => {
    setEditorContent("");
    setIsNoteContentEdited(false);
    localStorage.setItem("textEditorContent", "");
    localStorage.setItem("editIndex", "");
    setEditIndex(null);
  }, [setEditorContent, setIsNoteContentEdited, setEditIndex]);

  const handleNoteListClick = useCallback(() => {
    setIsNoteListOpen((isOpen: boolean) => !isOpen);
  }, [setIsNoteListOpen]);

  return (
    <nav class="flex items-center justify-between p-2 bg-gray-800 text-white">
      <IconButton
        onClick={handleClearNote}
        svgPath={svgPaths.x}
        disabled={isNoteListOpen}
      />
      <IconButton
        onClick={handleNoteListClick}
        svgPath={svgPaths.menu}
        class={isNoteListOpen ? "bg-white/20 duration-75" : ""}
      />
      <IconButton
        onClick={handleSaveNote}
        svgPath={svgPaths.save}
        disabled={!isNoteContentEdited}
      />
    </nav>
  );
}
