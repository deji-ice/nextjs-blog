import { client } from "@/util/sanity.client";
import urlFor from "@/util/urlFor";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichTextComponent } from "@/components/RichTextComponent";

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

  return (
    <article className="pb-28 px-5 xl:w-screen flex flex-col items-center mt-10  text-slate-800">
      {post && (
        <>
          <section className="space-y-2 border border-gray-500 xl:px-20 mb-5">
            <div className="relative min-h-56 flex flex-col md:flex-row justify-center">
              {/* <div className="absolute top-0 w-full h-full blur-sm opacity-10   p-10">
                {post && post.mainImage && (
                  <Image
                    className="object-cover mx-auto object-center "
                    src={urlFor(post.mainImage).url()}
                    alt={post.author.name}
                    fill
                  />
                )}
              </div> */}

              <section className="max-w-4xl  space-y-5 md:p-2 xl:space-y-10 lg:pb-5">
                <div className="flex md:flex-row justify-center hyphens-auto lg:pt-6  xl:pt-10 ">
                    <h1 className="text-4xl xl:text-6xl text-left p-3 md:text-center md:px-5 md:text-5xl font-bold hyphens-auto">{post.title}</h1>
                </div>
                <div className="flex flex-col text-sm lg:text-lg text-gray-700 font-semibold items-center mb-2 justify-center">
                  <div className="flex flex-row items-center justify-between space-x-5">
                  <div className="flex flex-row items-center space-x-2">
                    <Image
                      className="rounded-full"
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      height={10}
                      width={20}
                    />
                    <div className=" ">
                      <h3>By {post.author.name}</h3>
                      <div>{/* TODO bio */}</div>
                    </div>
                  </div>
                  <p className="">
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    </div>
                  <div className="flex items-center lg:space-x-0  mt-auto ">
                    {post.categories.map((category) => (
                      <p
                        key={category._id}
                        className="text-center
                      px-1 py-1 "
                      >
                        <span  className="text-blue-600 ">#</span>{category.title}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section className="mt-10 md:px-10 xl:px-28">
            <PortableText value={post.body} components={RichTextComponent} />
          </section>
        </>
      )}
    </article>
  );
};

export default page;
