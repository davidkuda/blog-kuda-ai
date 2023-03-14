import Link from "next/link";

export default function NavBar() {
  return (
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
          <li>
            <Link href="/covers">
              <a>Covers</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
