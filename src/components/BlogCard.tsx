import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { calculateReadingTime } from "@/lib";

type BlogCardProps = {
  post: Post;
  variant?: "default" | "featured";
  className?: string;
};

const BlogCard = ({
  post,
  variant = "default",
  className = "",
}: BlogCardProps) => {
  const readingTime = calculateReadingTime(post.body);

  const formattedDate = new Date(post._createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (variant === "featured") {
    return (
      <Link
        href={`/post/${post.slug.current}`}
        key={post._id}
        className="block w-full mb-8 md:mb-10"
      >
        <article className="group relative w-full h-[75vh] md:h-[80vh] lg:h-[95vh] overflow-hidden rounded-xl">
          {/* Background Image */}
          <Image
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
            src={urlForImage(post.mainImage).url()}
            alt={post.title}
            fill
            priority
            sizes="100vw"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Featured Tag - Top Left */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <span className="inline-flex font-cabinet-grotesk uppercase tracking-widest items-center italic px-3 py-1 rounded-sm text-xs md:text-sm font-semibold bg-white backdrop-blur-sm text-gray-900">
              Featured
            </span>
          </div>

          {/* Content - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-10">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="inline-flex items-center  px-3 py-1 rounded-xl text-xs md:text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 line-clamp-3">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-white/90 mb-4 md:mb-6 line-clamp-2 max-w-4xl">
              {post.description}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center gap-3">
              <Image
                className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-white/30"
                src={urlForImage(post.author.image).url()}
                alt={post.author.name}
                width={48}
                height={48}
              />
              <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base text-white/90">
                <span className="font-semibold text-white text-sm md:text-base whitespace-nowrap">
                  {post.author.name}
                </span>
                <span className="inline text-base">|</span>
                <span className="whitespace-nowrap">{formattedDate}</span>

                <span className="inline text-base">|</span>
                <div className="flex items-center gap-0.5 lg:gap-1.5 text-xs flex-nowrap md:text-base text-white/90">
                  <Clock className=" w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="whitespace-nowrap">
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default card - clean design matching the reference image
  return (
    <article className={`group ${className}`}>
      <Link href={`/post/${post.slug.current}`} className="block">
        {/* Image */}
        <div className="relative w-full h-52 md:h-56 lg:h-60 mb-4 overflow-hidden rounded-xl">
          <Image
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-out"
            src={urlForImage(post.mainImage).url()}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Categories - pill style */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 px-2">
            {post.categories.map((category) => (
              <span
                key={category._id}
                className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium text-gray-700 border border-gray-300"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl px-2 font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 px-2 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Author & Meta - responsive layout */}
        <div className="flex px-2 items-center gap-2 md:gap-3">
          <Image
            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover flex-shrink-0"
            src={urlForImage(post.author.image).url()}
            alt={post.author.name}
            width={40}
            height={40}
          />
          <div className="flex flex-wrap items-center text-xs text-gray-600 gap-x-1">
            <span className="font-medium font-sm text-gray-900">
              {post.author.name}
            </span>
            <span className="inline text-base">|</span>
            <span className="w-auto">{formattedDate}</span>
            <span className="inline text-base">|</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min. read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
