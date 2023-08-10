import { client } from "@/util/sanity.client";
import urlFor from "@/util/urlFor";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichTextComponent } from "@/components/RichTextComponent";
import Pathname from "@/components/Pathname";
import { ShareIcon } from "@heroicons/react/24/solid";
import Share from "@/components/Share";
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
    <div className="relative ">
      <div className="mt-1 md:mt-0 sticky flex justify-between top-0 p-5 xl:mx-10 md:pl-10 bg-[#FAF9F6]  z-30  md:py-5  ">
        <Pathname />
        <Share classNames="w-5 md:w-6 mr-5 md:mr-3 lg:mr-6 xl:mr-16" />
      </div>
      <article className=" relative pb-28 px-5 xl:w-screen flex flex-col items-center mt-8  text-slate-800">
        {post && (
          <>
            <section className=" space-y-2 border border-gray-500  mb-5">
              <div className="relative min-h-56 flex w-full flex-col md:flex-row justify-center">
                <div className="absolute top-0 w-full h-full blur-xs opacity-80 z-0 ">
                  {post && post.mainImage && (
                    <Image
                      className="object-fill w-full object-center "
                      src={urlFor(post.mainImage).url()}
                      alt={post.author.name}
                      fill
                    />
                  )}
                </div>
                <section className="max-w-4xl z-20 text-white space-y-5 md:p-2 xl:space-y-10 lg:pb-5">
                  <div className="flex md:flex-row justify-center hyphens-auto lg:pt-6  xl:pt-10 ">
                    <h1 className="text-4xl xl:text-6xl text-left p-5 md:p-3 md:text-center md:px-10 md:text-5xl font-bold hyphens-auto">
                      {post.title}
                    </h1>
                  </div>
                  <div className="flex flex-col text-sm lg:text-lg font-semibold items-center mb-2 justify-center">
                    <div className="flex flex-row items-center justify-between space-x-5">
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
                      p-2 text-sm "
                        >
                          <span className="text-blue-800 ">#</span>
                          {category.title}
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
    </div>
  );
};

export default page;
