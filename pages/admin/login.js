import { useState } from "react"

import Headers from "../../components/Headers";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";


export default function Login(props) {
  console.log(props)
  let [failedAttempt, setFailedAttempt] = useState()
  var headers = {};

  var wrongCreds = <p className="text-center my-20 text-red-600">Wrong Credentials!</p>
  var loggedIn = <p className="text-center my-20">You are logged in as {props.user} :)</p>

  return (
    <div>
      <Headers headers={headers} />
      {failedAttempt ? wrongCreds : null}
      {props.activeSession ? loggedIn : <LoginForm setFailedAttempt={setFailedAttempt} />}
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

  console.log({ res })

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
