import Image from "next/image";

import Headers from "../components/Headers";
import SimpleMarkdownPage from "../components/SimpleMarkdownPage";
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
      <SimpleMarkdownPage markdownContent={props.pageContent} />
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
