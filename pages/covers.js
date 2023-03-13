import Link from "next/link";

import Headers from "../components/Headers";
import Footer from "../components/Footer";

export default function Covers(props) {
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
  var lyricsAPIURL = process.env.NEXT_PUBLIC_LYRICSAPI_BASE_URL
  var res = await fetch(lyricsAPIURL + "/songs", {
    method: "GET",
  });

  var songs = await res.json();

  return {
    props: {
      songs,
    },
  };
}
