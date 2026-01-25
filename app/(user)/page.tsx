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
  return (
    <div className="flex flex-col px-5 lg:px-10 gap-8 lg:gap-10 pb-24">
      <div className="flex flex-col gap-2 lg:gap-4 min-h-[20vh] border-b-2 border-slate-950 pt-5 md:pt-10 lg:pt-8 md:p-4 pb-8 md:pb-10">
        <h1 className="font-heading text-3xl lg:text-5xl font-bold  ">
          The Code Chronicles
        </h1>
        <p className=" font-medium  max-w-[800px]">
          Fresh takes on tech that matters. We dig into frameworks worth
          learning, trends reshaping development, and the bugs that ruin your
          sleep. Real insights.
        </p>

        <div>
          <button className="flex px-6 py-2.5 bg-indigo-900 text-white text-[13px] font-bold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm active:scale-95">
            Subscribe
          </button>
        </div>
      </div>
      {/* all the posts */}
      <BlogList posts={posts} />
    </div>
  );
}
