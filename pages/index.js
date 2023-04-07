import Headers from "../components/Headers";
import Footer from "../components/Footer";

export default function Home() {
  var linkedinIcon =
    "https://images.ctfassets.net/pedj0c0bs6fa/2h1ZSwhweHvzkxarbhoXYz/a5422792becd785b920b1c6844850679/linkedin_black_logo_icon_147114.png?w=100";
  var githubIcon =
    "https://images.ctfassets.net/pedj0c0bs6fa/6oJ23215IA9trl4aNWm0oh/58fe289d53340a97d4d5bb93dfa89462/github-logo.png?w=100";
  return (
    <div>
      <Headers headers={{ title: "kuda.ai | code. guitar. life." }} />
      <main className="space-y-4 mt-16">
        <div class="box" className="flex justify-center ">
          <h2 className="text-center text-5xl tracking-wide rainbow-text">
            David Kuda
            <br />
            Software Engineer
            <br />
            Berlin
            <br />
          </h2>
        </div>
        <div className="flex justify-center">
          <a
            className="inline mx-4"
            href="https://www.linkedin.com/in/davidkuda/"
            target="_blank"
          >
            <img className="w-10 inline mx-2" src={linkedinIcon} />
            <span className="underline">Linkedin</span>
          </a>
          <a
            className="mx-4"
            href="https://github.com/davidkuda"
            target="_blank"
          >
            <img className="w-10 inline mx-2" src={githubIcon} />
            <span className="underline">GitHub</span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
