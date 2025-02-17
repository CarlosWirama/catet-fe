import { useEditorContext } from "../context/EditorContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import TextEditor from "../components/TextEditor";

export default function Home() {
  const { isNoteListOpen } = useEditorContext();

  const transitionClass = `lg:transition-width duration-300 ease max-lg:transition-transform transform ${
    isNoteListOpen ? "translate-y-0 lg:w-96" : "translate-y-full lg:w-24"
  } lg:translate-none`;

  return (
    <>
      <Header class="max-lg:hidden" />
      <main class="relative flex-grow flex flex-col lg:flex-row overflow-hidden">
        <NoteList
          class={`absolute lg:relative top-0 left-0 h-full w-full ${transitionClass}`}
        />
        <TextEditor class="m-5 flex-grow" />
      </main>
      <Navbar class="lg:hidden" />
    </>
  );
}
