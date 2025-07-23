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
import { slugify } from "@/util/formatPathname";
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60; //revalidate page every 60 secs

export const generateStaticParams = async () => {
  const query = groq`
    *[_type == "post"] 
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
        author->,
        categories[]->,
    }
`;
  const post: Post = await client.fetch(query, { slug: slug });

  const headings = post.body.filter(
    (block) => block.style && block.style.startsWith("h")
  );

  // console.log(post.body);

  return (
    <div className="relative w-full px-4">
      {/* <div className="mt-1 md:mt-0 sticky flex justify-between top-0 p-5 xl:mx-10 md:pl-10 bg-[#FAF9F6]  z-30  md:py-5  ">
        <Pathname />
        <Share classNames="w-5 md:w-6 mr-5 md:mr-3 lg:mr-6 xl:mr-16" />
      </div> */}
      <section className=" relative pb-28  flex flex-col items-center   text-slate-800">
        {post && (
          <>
            <section className=" space-y-2 w-full  mb-5">
              <div className="relative min-h-56 flex w-full flex-col md:flex-row justify-center">
                <div className="w-full h-full  ">
                  {post && post.mainImage && (
                    <Image
                      className="object-cover w-full h-[90vh] bg-blue-500 rounded-[2rem]  object-center "
                      src={urlFor(post.mainImage).url()}
                      alt={post.author.name}
                      height={500}
                      width={1000}
                    />
                  )}
                </div>

                <section className="absolute w-full px-8 pb-5 gap-5 flex flex-col items-start  bottom-0 z-20 text-white ">
                  <h1
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                    className="text-5xl max-w-[1000px] leading-[1.1] w-full text-start  font-semibold hyphens-auto"
                  >
                    {post.title}
                  </h1>

                  <p className="text-lg">{post.description}</p>

                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-4 ">
                      {post.categories.map((category) => (
                        <span
                          key={category._id}
                          className="text-center px-3  py-1 text-sm shadow-md border border-white rounded-[10px] "
                        >
                          {category.title}
                        </span>
                      ))}
                      <span className="text-center px-3  py-1 text-sm shadow-md border border-white rounded-[10px] ">
                        12 min read
                      </span>
                    </div>

                    <SharePost />
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
            <section className="mt-14 px-10 flex justify-between w-full ">
              <article className="flex-[7] max-w-[800px] space-y-5">
                <PortableText
                  value={post.body}
                  components={RichTextComponent}
                />
              </article>
              <aside className="flex-[3] max-w-[350px]  w-full ">
                <ul className="space-y-4 max-w-[300px]  w-full ">
                  {headings.map((h) => (
                    <li className="font-bold text-lg" key={h._key}>
                      <a href={`#${slugify(h.children[0].text)}`}>
                        {h.children[0].text}
                      </a>
                    </li>
                  ))}
                </ul>

                <hr className="my-7" />

                <div className=" flex flex-col gap-3 ">
                  <span className="font-semibold">Written by</span>

                  <div className="flex items-center gap-2">
                    <Image
                      className="rounded-full h-12 w-12 object-cover"
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      height={50}
                      width={50}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{post.author.name}</span>
                      <span className="text-gray-500 font-semibold">
                        Frontend Engineer
                      </span>
                    </div>
                  </div>
                  <hr className="my-7" />
                </div>
              </aside>
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default page;
