import Link from "next/link";

import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <div className="mx-auto md:w-3/5 w-10/12 my-20">
      <header>
        <h1 className="md:text-4xl text-xl font-bold text-center gradient-text">
          kuda.ai | code. guitar. life.
        </h1>
        <p className="flex justify-center text-center">
          (please note that this webiste is under construction)
        </p>
        <nav className="my-4">
          <ul className="flex flex-row justify-center space-x-4 underline">
            <li>
              <Link href="/">
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
