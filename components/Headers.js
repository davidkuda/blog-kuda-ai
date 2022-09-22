import Head from "next/head";

export default function Headers(props) {

  var headers = props.headers;
  if (headers.title === null) {
    headers.title = "kuda.ai";
  }

  if (headers.description === null) {
    headers.description = "kuda.ai | David Kuda on Code, Guitar and Life.";
  }

  if (headers.previewImage === null) {
    headers.previewImage =
      "https://images.ctfassets.net/pedj0c0bs6fa/54o6IJpJFmV2D57ZHeyNKS/c4f97ba8b50eea3759c9eac4e52e2ed0/davidkuda_profile_picture.jpeg"
      + "?w=800";
  }

  return (
    <Head>
      <title>{headers.title}</title>
      <meta name="description" content={headers.description} />
      <meta property="og:title" content="kuda.ai" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={"https://www.kuda.ai/" + headers.urlEndpoint}
      />
      <meta property="og:image" content={headers.previewImage} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
