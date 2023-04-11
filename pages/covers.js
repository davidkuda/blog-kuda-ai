import Link from "next/link";

import Headers from "../components/Headers";
import NewSongForm from "../components/NewSongForm";
import Footer from "../components/Footer";
import { useState } from "react";
import { hasActiveSession } from "../lib/lyricsapi";

export default function Covers(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function checkLoginState(setLoginState) {
    const [loggedIn, sessionData] = await hasActiveSession();
    setLoginState(loggedIn);
  }

  checkLoginState(setIsLoggedIn);

  return (
    <div>
      <Headers headers={{ title: "kuda.ai | Guitar Songs I like to play" }} />
      <div className="flex flex-col md:items-center">
        <main className="prose text-sm md:text-base">
          <p>
            {" "}
            I learned a lot by playing songs and figuring out their chords by by
            ear. Here I publish my transcriptions.{" "}
          </p>
          <p>
            Occasionally, I find myself with a guitar in front of a group or among
            other musicians. Then we think about songs. This list is going to help
            future me in such situations. :)
          </p>
          <ul className="blog-posts-container flex flex-row flex-wrap justify-center items-center">
            {props.songs.map((song) => (
              <li className="w-2/3 mx-2 my-3" key={song.id}>
                <Link
                  href={"covers/" + song.id}
                  className="cursor-pointer font-medium underline"
                >
                  {song.artist}: {song.name}
                </Link>
              </li>
            ))}
          </ul>
          {isLoggedIn ? <NewSongForm token={props.token} /> : ""}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  var lyricsAPIURL = process.env.NEXT_PUBLIC_LYRICSAPI_BASE_URL;
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
