import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { client } from "@/util/sanity.client";
import PreviewSuspense from "../../components/PreviewSuspense";
import PreviewBlogList from "@/components/PreviewBlogList";
import BlogList from "@/components/BlogList";

const query = groq`
  *[_type== "post"]{
    ...,
    author ->,
    categories[]->,
  } | order(_createdAt, desc)
`;

export default async function Home() {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div className="" role="status">
            <p className="text-center animate-pulse text-lg">
              Loading Preview Mode
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  const posts = await client.fetch(query);
  return (
    <BlogList posts={posts}/>
  );
}
