import { createContext } from "preact";
import {
  useContext,
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type StateUpdater,
} from "preact/hooks";
import type { Note } from "../types/note";

interface EditorContextProps {
  editorContent: string;
  handleSetEditorContent: (content: string) => void;
  notes: Note[];
  handleSetNotes: (notes: Note[]) => void;
  editIndex: number | null;
  handleSetEditIndex: (index: number | null) => void;
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

  // Load saved editor and noteList from localStorage on mount
  useEffect(function loadInitiallySavedData() {
    const savedContent = localStorage.getItem("editorContent") || "";
    setEditorContent(savedContent);

    const savedNotes = localStorage.getItem("noteList") || "[]";
    const parsedSavedNotes = JSON.parse(savedNotes);
    setNotes(parsedSavedNotes);

    const savedEditIndex = localStorage.getItem("editIndex");
    const parsedEditIndex: number | null = savedEditIndex
      ? JSON.parse(savedEditIndex)
      : null;
    setEditIndex(parsedEditIndex);
  }, []);

  const handleSetEditorContent = useCallback((content: string) => {
    setEditorContent(content);
    // Save content to localStorage whenever it changes
    localStorage.setItem("editorContent", content);
  }, []);

  const handleSetEditIndex = useCallback((index: number) => {
    setEditIndex(index);
    localStorage.setItem("editIndex", index?.toString() ?? null);
  }, []);

  const handleSetNotes = useCallback((notesList: Note[]) => { 
    setNotes(notesList);
    localStorage.setItem("noteList", JSON.stringify(notesList));
  }, []);

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
    handleSetNotes(updatedNotesList);
    if (isNewNote) {
      handleSetEditIndex(0);
    }
    setIsNoteContentEdited(false);
  }, [editIndex, editorContent, notes]);

  return (
    <EditorContext.Provider
      value={{
        editorContent,
        handleSetEditorContent,
        notes,
        handleSetNotes,
        editIndex,
        handleSetEditIndex,
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
