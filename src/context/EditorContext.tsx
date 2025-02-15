import { createContext } from "preact";
import { useState, useContext, type Dispatch, type StateUpdater } from "preact/hooks";
import type { Note } from "../types/note";

interface EditorContextProps {
  editorContent: string;
  setEditorContent: Dispatch<StateUpdater<string>>;
  notes: Note[];
  setNotes: Dispatch<StateUpdater<Note[]>>;
  editIndex: number | null;
  setEditIndex: Dispatch<StateUpdater<number | null>>;
  isNoteContentEdited: boolean;
  setIsNoteContentEdited: Dispatch<StateUpdater<boolean>>;
  isNoteListOpen: boolean;
  setIsNoteListOpen: Dispatch<StateUpdater<boolean>>
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const EditorProvider = ({ children }) => {
  const [editorContent, setEditorContent] = useState("");
  const [isNoteContentEdited, setIsNoteContentEdited] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isNoteListOpen, setIsNoteListOpen] = useState(false);

  return (
    <EditorContext.Provider
      value={{
        editorContent,
        setEditorContent,
        notes,
        setNotes,
        editIndex,
        setEditIndex,
        isNoteContentEdited,
        setIsNoteContentEdited,
        isNoteListOpen,
        setIsNoteListOpen,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};
