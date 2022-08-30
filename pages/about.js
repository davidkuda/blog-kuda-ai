import Image from "next/image";

import Headers from "../components/Headers";
import { getPageContent } from "../lib/contentful_api";
import Footer from "../components/Footer";

export default function About(props) {
  return (
    <div>
      <Headers
        title="About | kuda.ai"
        url_endpoint="about"
        img="https://images.ctfassets.net/pedj0c0bs6fa/6M0SALWnTnYGur0iA4t4SP/8fb4d909051af28e5e1656c23d6badac/kudas_cropped.jpg"
      />
      <div className="flex flex-col md:items-center">
        <main className="prose text-sm md:text-base">
          <div dangerouslySetInnerHTML={{ __html: props.pageContent }} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      pageContent: await getPageContent("about_page"),
    },
  };
}
