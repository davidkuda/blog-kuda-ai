import Link from "next/link";

export default function NavBar() {
  return (
    <header>
      <h1 className="md:text-4xl text-xl font-bold text-center gradient-text">
        <Link href="/">
          kuda.ai | code. guitar. life.
        </Link>
      </h1>
      <nav className="my-4 mt-10">
        <ul className="flex flex-row justify-center space-x-6 underline">
          <li>
            <Link href="/about">
              About
            </Link>
          </li>
          <li>
            <Link href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/cv">
              CV
            </Link>
          </li>
          <li>
            <Link href="/covers">
              Covers
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
