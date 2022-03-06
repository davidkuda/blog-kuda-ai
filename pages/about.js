import Image from "next/image";

import Headers from "../components/Headers"
import { getAboutPageContent } from "../lib/contentful_api";

export default function About(props) {
  var img = "https://images.ctfassets.net/pedj0c0bs6fa/7dr3gvDG0rlRZofUmDvJWx/00d13a6a2a23a749f46fd13cd7d4e057/DKU.jpg?w=800";
  return (
    <div>
      <Headers title="About | kuda.ai" url_endpoint="about" />
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
