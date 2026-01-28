import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/lib/sanity.queries";
import BlogList from "@/components/BlogList";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import { Metadata } from "next";

export const revalidate = 60; // revalidate every 60 seconds

export const metadata: Metadata = {
  title: "The Code Chronicles - Fresh Takes on Tech That Matters",
  description:
    "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep. Real insights.",

  keywords: [
    "web development",
    "programming",
    "software engineering",
    "tech blog",
    "coding tutorials",
    "developer insights",
  ],

  openGraph: {
    type: "website",
    url: "https://www.thecodechronicles.tech",
    title: "The Code Chronicles - Fresh Takes on Tech That Matters",
    description:
      "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep.",
    siteName: "The Code Chronicles",
    images: [
      {
        url: "https://www.thecodechronicles.tech/LOGO.png",
        width: 1200,
        height: 630,
        alt: "The Code Chronicles",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Code Chronicles - Fresh Takes on Tech That Matters",
    description:
      "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep.",
    images: ["https://www.thecodechronicles.tech/LOGO.png"],
    creator: "@dejixice",
    site: "@dejixice",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.thecodechronicles.tech",
  },
};

export default async function HomePage() {
  const posts = await client.fetch(postsQuery);

  return (
    <div className="flex flex-col px-5 lg:px-10 gap-8 lg:gap-10 pb-24">
      <Banner />
      <BlogList posts={posts} />
    </div>
  );
}
