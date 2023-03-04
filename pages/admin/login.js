import Headers from "../../components/Headers";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";

export default function Login() {
  var headers = {};
  return (
    <div>
      <Headers headers={headers} />
      <LoginForm submitHandler={handleLogin} />
      <Footer />
    </div>
  );
}

function handleLogin(event) {
  event.preventDefault();
  console.log(event.target)
}
