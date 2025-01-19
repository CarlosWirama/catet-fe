export default function Toolbar() {
  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div>
      <button type="button" onClick={() => formatText("bold")}><b>B</b></button>
      <button type="button" onClick={() => formatText("italic")}><i>I</i></button>
    </div>
  );
}
