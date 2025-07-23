import { draftMode } from "next/headers";
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

export const revalidate = 60; //revalidate page every 60 secs

export default async function Home() {
  const { isEnabled } = draftMode();

  if (isEnabled) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
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
  return <BlogList posts={posts} />;
}
