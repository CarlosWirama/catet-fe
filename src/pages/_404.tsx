import Header from "../components/Header";

export function NotFound() {
  return (
    <>
      <Header />
      <section class="flex-grow flex flex-col items-center justify-center">
        <h1>404: Not Found</h1>

        <br />
        <p>
          <a href="/" class="hover:text-2xl transition-all">
            Go back to the editor
          </a>
        </p>
      </section>
    </>
  );
}
