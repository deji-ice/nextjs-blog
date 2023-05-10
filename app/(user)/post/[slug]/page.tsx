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

 let slugRoutes = slugs.map((slug) => slug.slug.current)

 return slugRoutes.map((slug)=>({
  slug
 }))
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
    <article className="pb-28 px-10">
      {post && (
        <>
          <section className="space-y-2 border border-blue-900 text-white">
            <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
              <div className="absolute top-0 w-full h-full blur-sm opacity-10   p-10">
                {post && post.mainImage && (
                  <Image
                    className="object-cover mx-auto object-center "
                    src={urlFor(post.mainImage).url()}
                    alt={post.author.name}
                    fill
                  />
                )}
              </div>

              <section className="bg-blue-900 w-full p-5">
                <div className="flex flex-col md:flex-row justify-between gap-y-5">
                  <div>
                    <h1 className="text-4xl font-extrabold">{post.title}</h1>
                    <p className="">
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      className="rounded-full"
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      height={40}
                      width={40}
                    />
                    <div className="w-64 text-lg font-bold">
                      <h3>{post.author.name}</h3>
                      <div>{/* TODO bio */}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="pt-10 italic ">{post.description}</h2>
                  <div className="flex items-center justify-end mt-auto space-x-2">
                    {post.categories.map((category) => (
                      <p
                        key={category._id}
                        className="bg-black text-center
                     text-white mt-4 px-3 py-1 rounded-full  font-semibold"
                      >
                        {category.title}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </section>
          <PortableText value={post.body} components={RichTextComponent} />
        </>
      )}
    </article>
  );
};


export default page;
