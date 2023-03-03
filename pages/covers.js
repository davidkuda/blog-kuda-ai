import Link from "next/link";

import Headers from "../components/Headers";
import Footer from "../components/Footer";

export default function Home(props) {
  return (
    <div>
      <Headers headers={{ title: "kuda.ai | Guitar Songs I like to play" }} />
      <main className="space-y-4 mt-16">
        <ul className="blog-posts-container flex flex-row flex-wrap justify-center items-center">
          {props.songs.map((song) => (
            <li className="w-2/3 mx-2 my-3">
              <Link href={"covers/" + song.id}>
                <a className="cursor-pointer font-medium underline">
                  {song.artist}: {song.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  var lyricsAPIURL = "http://127.0.0.1:8032/songs";
  var res = await fetch(lyricsAPIURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LYRICSAPI_PROD_TOKEN}`,
    },
  });

  var songs = await res.json();

  return {
    props: {
      songs,
    },
  };
}
