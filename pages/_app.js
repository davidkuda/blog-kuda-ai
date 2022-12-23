import Link from "next/link";

import "../styles/globals.css";
// import "../styles/prism.css";

function App({ Component, pageProps }) {
  return (
    <div className="mx-auto md:w-3/5 w-10/12 my-20">
      <header>
        <h1 className="md:text-4xl text-xl font-bold text-center gradient-text">
          <Link href="/">
            <a>kuda.ai | code. guitar. life.</a>
          </Link>
        </h1>
        <nav className="my-4 mt-10">
          <ul className="flex flex-row justify-center space-x-6 underline">
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/cv">
                <a>CV</a>
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
