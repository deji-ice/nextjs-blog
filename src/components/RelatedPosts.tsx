import { client } from "@/sanity/lib/client";
import { relatedPostsQuery } from "@/lib/sanity.queries";
import BlogCard from "./BlogCard";

type Props = {
  categories: Category[];
  currentSlug: string;
};

export default async function RelatedPosts({ categories, currentSlug }: Props) {
  const categorySlugs =
    categories?.filter((c) => c?.slug?.current)?.map((c) => c.slug.current) ||
    [];

  const posts: Post[] = await client.fetch(relatedPostsQuery, {
    categories: categorySlugs,
    currentSlug,
  });

  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-20 border-t border-gray-200 pt-10 px-4 lg:px-8">
      <h3 className="text-2xl md:text-3xl font-bold mb-8">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} variant="default" />
        ))}
      </div>
    </div>
  );
}
