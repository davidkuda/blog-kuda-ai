import { parseMarkdownWithoutTOC } from "../../lib/markdown";

export default function CoverSong({ song }) {
  return (
    <>
      <div>
        <div className="flex flex-col md:items-center">
          <main className="prose prose-sm md:prose-base">
            <div className="mb-4">
              <h2 className="md:text-xl text-xl font-bold">
                {song.name} -- {song.artist}
              </h2>
            </div>
            <div>
              <h3 className="text-xl font-bold">Chords</h3>
              <div dangerouslySetInnerHTML={{ __html:  song.chords}} />
              <h3 className="text-xl font-bold">Lyrics</h3>
              <div dangerouslySetInnerHTML={{ __html:  song.lyrics}} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  var songID = context.params.song;
  var lyricsAPIEndpoint = "http://127.0.0.1:8032/songs/" + songID;
  var res = await fetch(lyricsAPIEndpoint);
  var song = await res.json();
  
  song.chords = await parseMarkdownWithoutTOC(song.chords)
  song.lyrics = await parseMarkdownWithoutTOC(song.lyrics)

  return {
    props: {
      song,
    },
  };
}