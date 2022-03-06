import Head from "next/head";
import Image from "next/image";

import { getAboutPageContent } from "../lib/contentful_api";

export default function About(props) {
  var img = "https://images.ctfassets.net/pedj0c0bs6fa/7dr3gvDG0rlRZofUmDvJWx/00d13a6a2a23a749f46fd13cd7d4e057/DKU.jpg?w=800";
  return (
    <div>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="kuda.ai | David Kuda on Code, Guitar and Life."
        />
        <meta property="og:title" content="kuda.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kuda.ai/about" />
        <meta
          property="og:image"
          content={img}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col md:items-center">
        <main className="prose text-sm md:text-base">
          <img src={img} />
          <div dangerouslySetInnerHTML={{ __html: props.aboutPageContent }} />
      </main>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      "aboutPageContent": await getAboutPageContent(),
    },
  };
}
