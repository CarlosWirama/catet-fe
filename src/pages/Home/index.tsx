import Header from "../../components/Header";
import TextEditor from "../../components/TextEditor";
// import Toolbar from './Toolbar';

export default function Home() {
  return (
    <>
      <Header />
      <main class="flex-grow flex flex-col overflow-auto">
        {/* <img src={preactLogo} alt="Preact logo" height="160" width="160" /> */}
      	{/* <Toolbar /> */}
        <TextEditor />
      	<div class="m-4 min-h-10">TODO: History</div>
      </main>
    </>
  );
}
