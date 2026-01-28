import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { postSlugsQuery, postsQuery } from "@/lib/sanity.queries";
import { urlForImage } from "@/sanity/lib/image";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.thecodechronicles.tech";

  // Fetch all posts with their update dates
  const posts: Post[] = await client.fetch(postsQuery);

  // Generate post URLs with image metadata
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug.current}`,
    lastModified: post._updatedAt || post._createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: post.mainImage
      ? [urlForImage(post.mainImage).width(1200).height(630).url()]
      : undefined,
  }));

  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  return [...routes, ...postUrls];
}
