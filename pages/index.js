import Headers from "../components/Headers";
import { getAllPosts } from "../lib/contentful_api";
import BlogPostPreviewCard from "../components/BlogPostPreviewCard";
import Footer from "../components/Footer";

export default function Home(props) {
  return (
    <div>
      <Headers headers={{ title: "kuda.ai | code. guitar. life." }} />
      <main className="space-y-4 mt-16">
        <ul className="blog-posts-container flex flex-row flex-wrap justify-center items-center">
          {props.allPostsData.map((post) => (
            <BlogPostPreviewCard
              key={post.fields.id}
              id={post.fields.id}
              title={post.fields.title}
              createdAt={post.sys.createdAt}
              updatedAt={post.sys.updatedAt}
            />
          ))}
        </ul>
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
