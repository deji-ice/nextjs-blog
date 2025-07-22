import urlFor from "@/util/urlFor";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import ClientSideRoute from "./ClientSideRoute";

type Props = {
  posts: Post[];
};

const BlogList = ({ posts }: Props) => {
  // Sort the posts by the _createdAt field in descending order
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  );

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 px-10 gap-10 xl:mx-5  pb-24 gap-y-16">
        {/* all the posts */}
        {sortedPosts.map((post) => (
          <ClientSideRoute route={`/post/${post.slug.current}`} key={post._id}>
            <div className="group cursor-pointer flex flex-col">
              <div className="relative w-full h-80  drop-shadow-xl transition-transform duration-200 ease-out">
                <Image
                  className="object-cover object-left lg:object-center"
                  src={urlFor(post.mainImage).url()}
                  alt={post.author.name}
                  fill
                />
                {/* <div
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
                  
                </div> */}
              </div>
              <div className="mt-5 flex-1">
                <div className="flex items-start gap-3 justify-between">
                  <p className="text-lg max-w-[90%] h-fit font-bold ">
                    {post.title}
                  </p>
                  <span className="mt-2 font-bold">
                    {/* @ts-ignore */}
                    <FaArrowUpRightFromSquare className="h-4 w-4" />
                    {/* <ArrowUpRightIcon className="h-4 w-4" /> */}
                  </span>
                </div>

                <p className="lg:text-sm font-semibold text-xs mt-2">
                  {post.description}{" "}
                </p>
              </div>
              <div className="flex mt-4 flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className=" flex items-center justify-center text-center text-black
                             py-[1px] rounded-full border-2 border-black text-xs px-2  font-semibold"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
