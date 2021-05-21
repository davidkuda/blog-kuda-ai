import Link from 'next/Link'

import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <div className='mx-auto w-3/5 my-20'>
      <header>
        <h1 className='text-4xl font-bold text-center'>
          kuda.ai | code. guitar. life.
        </h1>
        <nav className='my-4'>
          <ul className='flex flex-row justify-center space-x-4'>
            <li><Link href='/'><a>Home</a></Link></li>
            <li><Link href='/about'><a>About</a></Link></li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
