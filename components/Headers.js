import Head from "next/head";

export default function Headers(props) {
  if (props.title === null) {
    props.title = "kuda.ai";
  }

  if (props.description === null) {
    props.description = "kuda.ai | David Kuda on Code, Guitar and Life.";
  }

  if (props.img === null) {
    props.img =
      "https://images.ctfassets.net/pedj0c0bs6fa/7dr3gvDG0rlRZofUmDvJWx/00d13a6a2a23a749f46fd13cd7d4e057/DKU.jpg?w=800";
  }

  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content="kuda.ai" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={"https://www.kuda.ai/" + props.url_endpoint}
      />
      <meta property="og:image" content={props.img} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
