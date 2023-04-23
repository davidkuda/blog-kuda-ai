export default function NewSongForm() {
  return (
    <div class="container mx-auto px-4 w-100">
      <form autoComplete="off" onSubmit={uploadSong}>
        <h3 className="mt-20 mb-5">New Song:</h3>
        <FormRowFull id="songID" labelText="Song ID" type="text" />
        <FormRowHalves
          id1="songName" labelText1="Song Name" type1="text"
          id2="artist" labelText2="Artist" type2="text"
        />
        <TextArea id="chords" rows="2" label="Chords" />
        <TextArea id="lyrics" rows="4" label="Lyrics" />
        <div className="flex flex-col md:items-center">
          <button type="submit" className="px-5 py-2 gradient-fill rounded-lg text-white">
            Create New Song
          </button>
        </div>
      </form>
    </div>
  )
}

async function uploadSong(event) {
  event.preventDefault()
  var f = event.target
  var data = {
    "id": f.songID.value,
    "artist": f.artist.value,
    "name": f.name.value,
    "chords": f.chords.value,
    "lyrics": f.lyrics.value,
    "copyright": f.copyright?.value,
  }

  var headers = {
    "Content-Type": "application/json",
    "credentials": "include",
  }

  var lyricsAPIURL = process.env.NEXT_PUBLIC_LYRICSAPI_BASE_URL
  var res = await fetch(lyricsAPIURL + "/songs", {
    method: "POST",
    credentials: "include",
    headers: headers,
    body: JSON.stringify(data),
  })

  if (res.status >= 201) {
    console.log("success")
  } else {
    console.log("failed creating new song: ", res.text)
  }
}

function FormRowFull({ type, id, labelText }) {
  return (
    <div class="relative z-0 w-full mb-6 group">
      <input
        type={type}
        name={id}
        id={id}
        placeholder=" "
        required
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        htmlFor={id}
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {labelText}
      </label>
    </div>
  )
}

function FormRowHalves({ id1, labelText1, type1, id2, labelText2, type2 }) {
  return (
    <div class="grid md:grid-cols-2 md:gap-6">
      <FormRowHalf id={id1} label={labelText1} type={type1} />
      <FormRowHalf id={id2} label={labelText2} type={type2} />
    </div>
  )
}

function FormRowHalf({ id, label, type }) {
  return (
    <div class="relative z-0 w-full mb-6 group">
      <input
        type={type}
        name={id}
        id={id}
        placeholder=" "
        required
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        htmlFor={id}
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  )
}

function TextArea({ id, label, rows }) {
  return (
    <div class="relative z-0 w-full mb-6 group">
      <textarea
        rows={rows}
        type="textarea"
        name={id}
        id={id}
        placeholder=" "
        required
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      ></textarea>
      <label
        htmlFor={id}
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  )
}
