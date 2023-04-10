export async function hasActiveSession() {
  // check if there is an active session based on cookie
  var lyricsAPIURL = process.env.NEXT_PUBLIC_LYRICSAPI_BASE_URL;
  var res = await fetch(lyricsAPIURL + "/session", {
    method: "GET",
    credentials: "include",
    cache: "no-cache",
  });

  if (res.status == 401) {
    return [false, null];
  }

  if (res.status == 200) {
    let sessionData = await res.json();
    return [true, sessionData];
  }

  return [false, null];
}
