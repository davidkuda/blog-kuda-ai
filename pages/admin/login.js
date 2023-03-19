import { useState } from "react"

import Headers from "../../components/Headers";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";


export default function Login(props) {
  let [failedAttempt, setFailedAttempt] = useState()
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [userName, setUserName] = useState()

  if (props.activeSession == true) {
    setIsLoggedIn(true)
    setUserName(props.user)
  }

  var headers = {};

  var loginForm = (
    <LoginForm
      setUserName={setUserName}
      setFailedAttempt={setFailedAttempt}
      setIsLoggedIn={setIsLoggedIn}
    />)

  var wrongCreds = <p className="text-center my-20 text-red-600">Wrong Credentials!</p>
  var loggedIn = <p className="text-center my-20">You are logged in as {userName} :)</p>

  return (
    <div>
      <Headers headers={headers} />
      {failedAttempt ? wrongCreds : null}
      {isLoggedIn ? loggedIn : loginForm}
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // check if there is an active session based on cookie
  let activeSession = false
  let sessionData = {}

  var lyricsAPIURL = process.env.NEXT_PUBLIC_LYRICSAPI_BASE_URL
  var res = await fetch(lyricsAPIURL + "/session", {
    method: "GET",
  });

  if (res.status == 401) {
    activeSession = false
  }

  if (res.status == 200) {
    activeSession = true
    sessionData = await res.json()
  }

  if (activeSession) {
    return {
      props: {
        activeSession,
        user: sessionData.session,
      },
    };
  }
  return {
    props: {
      activeSession,
    },
  };
}
