import urlFor from "@/util/urlFor";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import ClientSideRoute from "./ClientSideRoute";

type Props = {
  posts: Post[];
};

const BlogList = ({ posts }: Props) => {

  return (
    <div>
      <hr className="border-[#f7ab0a] mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 pb-24 gap-y-16">
        {/* all the posts */}
        {posts.map((post) => (
            <ClientSideRoute route={`/post/${post.slug.current}`} key={post._id} >
          <div className="group cursor-pointer flex flex-col">
            <div className="relative w-full h-80 group-hover:scale-105 drop-shadow-xl transition-transform duration-200 ease-out">
              <Image
                className="object-cover object-left lg:object-center"
                src={urlFor(post.mainImage).url()}
                alt={post.author.name}
                fill
              />
              <div
                className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg
              text-white p-5 flex justify-between"
              >
                <div>
                  <p className="font-bold">{post.title}</p>
                  <p>
                    {new Date(post._createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                    {post.categories.map((catergory)=>(
                            <div key={catergory._id} className="bg-[#f7ab0a] text-center text-black
                            px-3 py-1 rounded-full text-sm font-semibold">
                                <p >{catergory.title}</p>
                                </div>
                        ))}
                </div>
              </div>
            </div>
            <div className="mt-5 flex-1">
                <p className="underline text-lg font-bold">{post.title}</p>
                <p className="text-gray-500">{post.description} </p>
            </div>
            <p className="flex mt-5 font-bold items-center group-hover:underline">
                Read More <ArrowUpRightIcon className="h-4 w-4 ml-2"/>
            </p>
          </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
