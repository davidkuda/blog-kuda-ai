import Headers from "../components/Headers";
import { getAllPosts } from "../lib/contentful_api";
import Footer from "../components/Footer";

export default function Home(props) {
  return (
    <div>
      <Headers headers={{ title: "kuda.ai | code. guitar. life." }} />
      <main className="space-y-4 mt-16">
        <div class="box" className="flex justify-center ">
          <h2 class={"text-center text-5xl animate-pulse "}>
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

export async function getServerSideProps() {
  const allPostsData = await getAllPosts();
  return {
    props: {
      allPostsData,
    },
  };
}
