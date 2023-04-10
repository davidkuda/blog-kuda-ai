import { useState } from "react";

import Headers from "../../components/Headers";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";

import { hasActiveSession } from "../../lib/lyricsapi";

export default function Login() {
  let [failedAttempt, setFailedAttempt] = useState();
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [userName, setUserName] = useState();

  checkSession(setIsLoggedIn, setUserName);

  var headers = {};

  var loggedIn = (
    <div className="flex flex-col items-center">
      <p className="text-center my-20">You are logged in as {userName} :)</p>
      <button
        onClick={logOut}
        className="w-1/5 px-4 py-1 gradient-fill rounded-md drop-shadow text-white hover:drop-shadow-lg hover:gradient-fill-inverse active:gradient-fill"
      >
        log out
      </button>
    </div>
  );

  async function logOut(event) {
    event.preventDefault();
    var lyricsAPIURL = process.env.NEXT_PUBLIC_LYRICSAPI_BASE_URL;
    var res = await fetch(lyricsAPIURL + "/signout", {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    });

    if (res.status == 204) {
      setIsLoggedIn(false);
    }
  }

  var loginForm = (
    <LoginForm
      setUserName={setUserName}
      setFailedAttempt={setFailedAttempt}
      setIsLoggedIn={setIsLoggedIn}
    />
  );

  var wrongCreds = (
    <p className="text-center my-20 text-red-600">Wrong Credentials!</p>
  );

  return (
    <div>
      <Headers headers={headers} />
      {failedAttempt ? wrongCreds : null}
      {isLoggedIn ? loggedIn : loginForm}
      <Footer />
    </div>
  );
}

async function checkSession(l, n) {
  let [hasSession, sessionData] = await hasActiveSession();
  console.log(hasSession, sessionData);
  l(hasSession);
  if (hasSession) {
    n(sessionData.session);
  }
}
