import NavBar from "../components/NavBar";

import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <div className="mx-auto md:w-3/5 w-10/12 my-20">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
