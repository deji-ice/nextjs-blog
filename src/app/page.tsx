import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/lib/sanity.queries";
import BlogList from "@/components/BlogList";
import Banner from "@/components/Banner";
import WebsiteStructuredData from "@/components/WebsiteStructuredData";

export const revalidate = 60; // revalidate every 60 seconds

export default async function HomePage() {
  const posts = await client.fetch(postsQuery);

  return (
    <>
      <WebsiteStructuredData />
      <div className="flex flex-col px-5 lg:px-10 gap-8 lg:gap-10 pb-24">
        <Banner />
        <BlogList posts={posts} />
      </div>
    </>
  );
}
