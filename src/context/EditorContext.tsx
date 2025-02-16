import { createContext } from "preact";
import {
  useState,
  useContext,
  useCallback,
  type Dispatch,
  type StateUpdater,
} from "preact/hooks";
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
  setIsNoteListOpen: Dispatch<StateUpdater<boolean>>;
  handleSaveNote: () => void;
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const EditorProvider = ({ children }) => {
  const [editorContent, setEditorContent] = useState("");
  const [isNoteContentEdited, setIsNoteContentEdited] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isNoteListOpen, setIsNoteListOpen] = useState(false);

  const handleSaveNote = useCallback(() => {
    const isNewNote = editIndex === null;
    const updatedNote = isNewNote
      ? {
          content: editorContent,
          createdAt: new Date(),
        }
      : {
          content: editorContent,
          createdAt: notes[editIndex].createdAt,
          editedAt: new Date(),
        };
    const updatedNotesList = isNewNote
      ? [updatedNote, ...notes]
      : [
          ...notes.slice(0, editIndex),
          updatedNote,
          ...notes.slice(editIndex + 1),
        ];
    localStorage.setItem("noteList", JSON.stringify(updatedNotesList));
    setNotes(updatedNotesList);
    if (isNewNote) {
      setEditIndex(0);
      localStorage.setItem("editIndex", "0");
    }
    setIsNoteContentEdited(false);
  }, [editIndex, editorContent, notes]);

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
        handleSaveNote,
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
