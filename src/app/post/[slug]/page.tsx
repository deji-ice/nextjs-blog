import { client } from "@/sanity/lib/client";
import { postQuery, postSlugsQuery } from "@/lib/sanity.queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import RelatedPosts from "@/components/RelatedPosts";
import { Metadata } from "next";
import SharePost from "@/components/SharePost";
import { slugify } from "@/lib";
import RichTextComponent from "@/components/RichTextComponent";

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
            <section className=" space-y-2 w-full">
              <div className="relative min-h-56 flex w-full flex-col md:flex-row justify-center">
                <div className="w-full h-full  ">
                  {post && post.mainImage && (
                    <Image
                      className="object-cover w-full h-[75vh] lg:h-[90vh] max-h-[1000px] lg:rounded-[12px]  object-center "
                      src={urlForImage(post.mainImage).url()}
                      alt={
                        post.mainImage.alt || `Cover image for ${post.title}`
                      }
                      height={500}
                      width={1000}
                      priority
                      loading="eager"
                    />
                  )}
                </div>

                <section className="absolute w-full px-4 lg:px-8 pb-3 lg:pb-5 gap-2 lg:gap-4 flex flex-col items-start  bottom-0 z-20 text-white ">
                  <h1
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                    className="text-3xl font-heading lg:text-5xl max-w-[1000px] mb-2 lg:mb-0 lg:leading-[60px] w-full text-start  font-semibold hyphens-auto"
                  >
                    {post.title}
                  </h1>

                  <p className="text-base text-[#FCFCFC] font-normal lg:text-xl lg:leading-[30px]  w-full max-w-[1000px] font-heading">
                    {post.description}
                  </p>

                  <div className="flex mt-8  justify-between gap-5 items-start lg:items-center w-full">
                    <div className="flex items-center font-heading gap-2">
                      <Image
                        className="rounded-full h-10 lg:h-12 w-10 lg:w-12 object-cover"
                        src={urlForImage(post.author.image).url()}
                        alt={`Photo of ${post.author.name}`}
                        height={48}
                        width={48}
                      />
                      <div className="flex flex-col text-sm lg:text-base ">
                        <span className="font-semibold">
                          {post.author.name}
                        </span>
                        <span className=" ">
                          {new Date(post._createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
            <section className="lg:mt-14 px-4 lg:px-10 flex flex-col-reverse lg:flex-row justify-between gap-10  w-full ">
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
              <aside className="flex-[3] max-w-[300px] flex flex-col-reverse lg:flex-col  w-full ">
                <nav
                  className="hidden lg:block sticky top-[15vh]"
                  aria-label="Table of contents"
                >
                  <ul className="space-y-4 max-w-[300px]  w-full ">
                    {headings.map((h) => (
                      <li
                        className="font-semibold  font-body cursor-pointer text-lg"
                        key={h._key}
                      >
                        <a href={`#${slugify(h.children[0].text)}`}>
                          {h.children[0].text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
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
