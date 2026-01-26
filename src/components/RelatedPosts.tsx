import { client } from "@/sanity/lib/client";
import { relatedPostsQuery } from "@/lib/sanity.queries";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

type Props = {
  categories: Category[];
  currentSlug: string;
};

export default async function RelatedPosts({ categories, currentSlug }: Props) {
  const categorySlugs =
    categories?.filter((c) => c?.slug?.current).map((c) => c.slug.current) ||
    [];

  // if (categorySlugs.length === 0) return null;

  const posts: Post[] = await client.fetch(relatedPostsQuery, {
    categories: categorySlugs,
    currentSlug,
  });

  console.log("Related posts data:", posts);
  console.log("Categories for related posts:", categories);

  // if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-20 border-t px-4 lg:px-8  border-gray-100 pt-10">
      <h3 className="text-3xl font-cabinet-grotesk font-bold mb-8">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/post/${post.slug.current}`}
            className="group flex flex-col"
          >
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-lg font-cabinet-grotesk font-bold line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {post.title}
            </h4>
            <div className="flex items-center mt-2 space-x-2">
              <Image
                className="rounded-full h-10 lg:h-12 w-10 lg:w-12 object-cover"
                src={urlForImage(post.author.image).url()}
                alt={`Photo of ${post.author.name}`}
                height={48}
                width={48}
              />
              <div className="flex flex-col text-sm  ">
                <span className="font-semibold">{post.author.name}</span>
                <span className=" ">
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
