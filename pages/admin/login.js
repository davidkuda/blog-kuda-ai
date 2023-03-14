import Headers from "../../components/Headers";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";


export default function Login(props) {
  var headers = {};
  var loggedIn = <p className="text-center my-20">You are logged in :)</p>

  return (
    <div>
      <Headers headers={headers} />
      {props.token ? loggedIn : <LoginForm setToken={props.setToken} />}
      <Footer />
    </div>
  );
}
