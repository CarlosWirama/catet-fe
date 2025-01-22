import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

import Home from "./pages/Home";
import { NotFound } from "./pages/_404";

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
