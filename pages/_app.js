import { useState } from "react"

import NavBar from "../components/NavBar";

import "../styles/globals.css";
// import "../styles/prism.css";

function App({ Component, pageProps }) {
  const [token, setToken] = useState()
  return (
    <div className="mx-auto md:w-3/5 w-10/12 my-20">
      <NavBar />
      <Component token={token} setToken={setToken} {...pageProps} />
    </div>
  );
}

export default App;
