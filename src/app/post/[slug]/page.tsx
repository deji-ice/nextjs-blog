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
import TableOfContents from "@/components/TableOfContents"
import Newsletter from "@/components/Newsletter";

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

  return {
    // Use SEO metaTitle if available, otherwise use post title
    title: post.seo?.metaTitle || post.title,

    // Use SEO metaDescription if available, otherwise use description
    description: post.seo?.metaDescription || post.description,

    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.description,
      images: [urlForImage(post.mainImage).url()],
    },

    twitter: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.description,
      images: [urlForImage(post.mainImage).url()],
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
    <main id="main-content" className="relative w-full lg:px-4 lg:mt-5">
      <section className=" relative pb-28  flex flex-col items-center  text-slate-950">
        {post && (
          <>
            <section className="space-y-2 w-full">
              <div className="relative w-full h-[75vh] md:h-[80vh] lg:h-[85vh] overflow-hidden rounded-xl">
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
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                  {/* Categories */}
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
                    <Image
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-white/30"
                      src={urlForImage(post.author.image).url()}
                      alt={`Photo of ${post.author.name}`}
                      width={48}
                      height={48}
                    />
                    <div className="flex items-center gap-2 text-sm md:text-base text-white/90">
                      <span className="font-semibold text-white">
                        {post.author.name}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(post._createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="text-sm md:text-base text-white/90">
                      •
                    </span>
                    <div className="flex items-center gap-1.5 text-sm md:text-base text-white/90">
                      <Clock className="w-4 h-4" />
                      <span>{calculateReadingTime(post.body)} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="lg:mt-14 px-4 lg:px-10 flex flex-col-reverse lg:flex-row justify-between gap-20  w-full ">
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
              <aside className="flex-[3] max-w-[300px] flex flex-col-reverse lg:flex-col w-full">
                <div className="sticky top-[15vh] hidden lg:block">
                  <div className="space-y-6">
                    <TableOfContents headings={headings} />
                    <Newsletter />
                  </div>
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
