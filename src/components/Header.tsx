import { useCallback } from "preact/hooks";
import { useLocation } from "preact-iso";
import { useEditorContext } from "../context/EditorContext";
import { svgPaths } from "../icons/svgPaths";
import IconButton from "./IconButton";

export default function Navbar({ class: className = "" }) {
  const { url } = useLocation();

  const {
    handleSetEditorContent,
    handleSetEditIndex,
    isNoteContentEdited,
    setIsNoteContentEdited,
    isNoteListOpen,
    handleSaveNote,
    setIsNoteListOpen,
  } = useEditorContext();

  const handleNoteListClick = useCallback(() => {
    setIsNoteListOpen((isOpen: boolean) => !isOpen);
  }, [setIsNoteListOpen]);

  const handleClearNote = useCallback(() => {
    handleSetEditorContent("");
    setIsNoteContentEdited(false);
    handleSetEditIndex(null);
  }, [handleSetEditorContent, setIsNoteContentEdited, handleSetEditIndex]);

  return (
    <header
      class={`flex items-center justify-between p-2 bg-gray-800 ${className}`}
    >
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
    </header>
  );
}
