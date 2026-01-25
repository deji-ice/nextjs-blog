import { client } from "@/util/sanity.client";
import urlFor from "@/util/urlFor";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichTextComponent } from "@/components/RichTextComponent";
import Pathname from "@/components/Pathname";
import { ShareIcon } from "@heroicons/react/24/solid";
import Share from "@/components/Share";
import SharePost from "@/components/SharePost";
import { type Metadata } from "next";

import { notFound } from "next/navigation";
import { slugify } from "@/util/formatPathname";
type Props = {
  params: { slug: string };
};

export const revalidate = 60; //revalidate page every 60 secs

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      mainImage
    }
  `;
  const post = await client.fetch(query, { slug: params.slug });

  const title = post?.title || "The Code Chronicles";
  const ogImage = post?.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit("max").url()
    : "/LOGO.png";
  const description =
    post?.description ||
    "Expand your mind and broaden your horizons with our captivating chronicles of curiosity";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@yourhandle",
      site: "@yourhandle",
    },
  };
}

export const generateStaticParams = async () => {
  const query = groq`
    *[_type == "post"] | order(_createdAt desc) [0...100]
    {
      slug 
    }`;

  const slugs: Post[] = await client.fetch(query);

  let slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
};

const page = async ({ params: { slug } }: Props) => {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] 
    {
        ...,
        author-> {
          name,
          image
        },
        categories[]-> {
          _id,
          title
        }
    }
`;
  const post: Post = await client.fetch(query, { slug: slug });

  if (!post) {
    notFound();
  }

  const headings = post?.body?.filter(
    (block) => block.style && ["h1", "h2", "h3"].includes(block.style),
  );

  // console.log(post.body);

  return (
    <main id="main-content" className="relative w-full lg:px-4">
      <section className=" relative pb-28  flex flex-col items-center  text-slate-950">
        {post && (
          <>
            <section className=" space-y-2 w-full">
              <div className="relative min-h-56 flex w-full flex-col md:flex-row justify-center">
                <div className="w-full h-full  ">
                  {post && post.mainImage && (
                    <Image
                      className="object-cover w-full h-[75vh] lg:h-[90vh] lg:rounded-[12px]  object-center "
                      src={urlFor(post.mainImage).url()}
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
                        src={urlFor(post.author.image).url()}
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
                    {/* <div className="flex items-center gap-2 ">
                      {post.categories.map((category) => (
                        <span
                          key={category._id}
                          className="text-center px-3  py-1 text-sm shadow-md border border-white rounded-[8px] "
                        >
                          {category.title}
                        </span>
                      ))}
                    </div> */}
                  </div>
                  <div className="flex flex-col text-sm lg:text-lg font-semibold items-center mb-2 justify-center">
                    {/* <div className="flex flex-row items-center justify-between space-x-5">
                      <div className="flex flex-row items-center space-x-2">
                        <Image
                          className="rounded-[50%]  overflow-hidden "
                          src={urlFor(post.author.image).url()}
                          alt={post.author.name}
                          height={30}
                          width={30}
                        />
                        <div>
                          <h3>By {post.author.name}</h3>
                        </div>
                      </div>
                      <p className="">
                        {new Date(post._createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div> */}
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
                  className="hidden lg:block sticky top-5"
                  aria-label="Table of contents"
                >
                  <ul className="space-y-4 max-w-[300px]  w-full ">
                    {headings.map((h) => (
                      <li
                        className="font-medium  font-body cursor-pointer text-lg"
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
      </section>
    </main>
  );
};

export default page;
