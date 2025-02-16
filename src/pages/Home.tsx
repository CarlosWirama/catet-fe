import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import TextEditor from "../components/TextEditor";

export default function Home() {
  return (
    <>
      <main class="relative flex-grow flex flex-col overflow-hidden">
        <TextEditor />
        <NoteList />
      </main>
      <Navbar />
    </>
  );
}
