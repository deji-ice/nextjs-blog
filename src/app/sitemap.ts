import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { postSlugsQuery, postsQuery } from '@/lib/sanity.queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.thecodechronicles.tech'

  // Fetch all posts with their update dates
  const posts: Post[] = await client.fetch(postsQuery)

  // Generate post URLs
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug.current}`,
    lastModified: post._updatedAt || post._createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  return [...routes, ...postUrls]
}
