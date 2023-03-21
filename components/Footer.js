import Link from "next/link";

export default function BlogPostPreviewCard() {
  var linkedinIcon =
    "https://images.ctfassets.net/pedj0c0bs6fa/2h1ZSwhweHvzkxarbhoXYz/a5422792becd785b920b1c6844850679/linkedin_black_logo_icon_147114.png?w=100";
  var githubIcon =
    "https://images.ctfassets.net/pedj0c0bs6fa/6oJ23215IA9trl4aNWm0oh/58fe289d53340a97d4d5bb93dfa89462/github-logo.png?w=100";
  return (
    <footer className="mt-8 flex items-center justify-center align-center">
      <p className="text-xs">
        Made with ❤️ in Berlin since 2021 | 
        <a className="inline" href="https://www.linkedin.com/in/davidkuda/" target="_blank">
          <img className="w-3.5 inline mx-1" src={linkedinIcon} />
        </a>
        <a href="https://github.com/davidkuda" target="_blank">
          <img className="w-3.5 inline mx-1" src={githubIcon} />
        </a>
      </p>
    </footer>
  );
}
