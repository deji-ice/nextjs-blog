import { client } from "@/sanity/lib/client";
import { postQuery, postSlugsQuery } from "@/lib/sanity.queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import RelatedPosts from "@/components/RelatedPosts";
import { Metadata } from "next";
import SharePost from "@/components/SharePost";
import { slugify, calculateReadingTime } from "@/lib";
import RichTextComponent from "@/components/RichTextComponent";
import { Clock } from "lucide-react";
import TableOfContents from "@/components/TableOfContents";
import Newsletter from "@/components/Newsletter";
import StructuredData from "@/components/StructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReadingProgress from "@/components/ReadingProgress";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: Post = await client.fetch(postQuery, { slug });

  if (!post) {
    return { title: "Post Not Found" };
  }

  const imageUrl = urlForImage(post.mainImage).width(1200).height(630).url();
  const url = `https://www.thecodechronicles.tech/post/${post.slug.current}`;

  return {
    // Use SEO metaTitle if available, otherwise use post title
    title: post.seo?.metaTitle || post.title,

    // Use SEO metaDescription if available, otherwise use description
    description: post.seo?.metaDescription || post.description,

    // Additional metadata
    authors: [{ name: post.author.name }],
    keywords: post.categories?.map((cat) => cat.title).join(", "),

    // OpenGraph (Facebook, LinkedIn, etc.)
    openGraph: {
      type: "article",
      url: url,
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.mainImage.alt || post.title,
        },
      ],
      siteName: "The Code Chronicles",
      locale: "en_US",
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt,
      authors: [post.author.name],
      tags: post.categories?.map((cat) => cat.title),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.description,
      images: [imageUrl],
      creator: "@dejixice",
      site: "@dejixice",
    },

    // Additional meta tags
    other: {
      "article:published_time": post._createdAt,
      "article:modified_time": post._updatedAt,
      "article:author": post.author.name,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post: Post = await client.fetch(postQuery, { slug });

  const headings = post?.body?.filter(
    (block) => block.style && ["h1", "h2", "h3"].includes(block.style),
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main id="main-content" className="relative w-full lg:px-0 lg:mt-1">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Structured Data for SEO */}
      <StructuredData post={post} />

      {/* Breadcrumbs */}
      <div className="px-4 lg:px-8 py-2">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/" },
            { label: post.title, href: `/post/${post.slug.current}` },
          ]}
        />
      </div>

      <section className=" relative pb-28  flex flex-col items-center  text-slate-950">
        {post && (
          <>
            <section className="space-y-2 w-full">
              <div className="relative w-full h-[75vh] md:h-[80vh] lg:h-[85vh] overflow-hidden xl:rounded-b-sm">
                {/* Background Image */}
                {post && post.mainImage && (
                  <Image
                    className="object-cover w-full h-full"
                    src={urlForImage(post.mainImage).url()}
                    alt={post.mainImage.alt || `Cover image for ${post.title}`}
                    fill
                    priority
                    loading="eager"
                    sizes="100vw"
                  />
                )}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => (
                        <span
                          key={category._id}
                          className="inline-flex items-center px-3 py-1 rounded-xl text-xs md:text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 max-w-4xl">
                    {post.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base md:text-lg text-white/90 mb-4 md:mb-6 max-w-4xl">
                    {post.description}
                  </p>

                  {/* Author & Meta */}
                  <div className="flex items-center gap-3">
                    {/* Author & Meta */}
                    <div className="flex items-center gap-3">
                      <Image
                        className="w-8 h-8 md:w-11 md:h-11 rounded-full object-cover ring-2 ring-white/30"
                        src={urlForImage(post.author.image).url()}
                        alt={post.author.name}
                        width={48}
                        height={48}
                      />
                      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base text-white/90">
                        <span className="font-semibold text-white text-sm md:text-base whitespace-nowrap">
                          {post.author.name}
                        </span>
                        <span className="inline text-lg">|</span>
                        <span className="whitespace-nowrap">
                          {new Date(post._createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </span>

                        <span className="inline text-lg">|</span>
                        <div className="flex items-center gap-0.5 lg:gap-1.5 text-xs flex-nowrap md:text-base text-white/90">
                          <Clock className=" w-3 h-3 lg:w-4 lg:h-4" />
                          <span className="whitespace-nowrap">
                            {calculateReadingTime(post.body)} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-5 lg:mt-14 px-4 md:px-8 lg:px-10 flex flex-col items-center md:items-start lg:flex-row justify-between gap-10 lg:gap-20  w-full ">
              <article className="flex-[7] max-w-[800px] font-medium  lg:space-y-0">
                <PortableText
                  value={post.body}
                  components={RichTextComponent}
                />
                <div className="flex flex-col gap-2 pt-16">
                  <h2 className="font-semibold font-heading text-base text-[#60707A] ">
                    Share
                  </h2>
                  <SharePost />
                </div>
              </article>
              <aside className="flex-[3] md:max-w-[500px] lg:max-w-[300px] flex flex-col w-full lg:sticky top-[15vh]">
                <div className="space-y-6">
                  <TableOfContents
                    className="hidden lg:block"
                    headings={headings}
                  />
                  <Newsletter />
                </div>
              </aside>
            </section>
          </>
        )}
        <RelatedPosts
          categories={post?.categories}
          currentSlug={post?.slug.current}
        />
      </section>
    </main>
  );
}
