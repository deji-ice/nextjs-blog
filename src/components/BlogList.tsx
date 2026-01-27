import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { calculateReadingTime } from "@/lib";

type Props = {
  posts: Post[];
};

const BlogList = ({ posts }: Props) => {
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
  );

  return (
    <div
      className={`grid grid-cols-1 mt-5 lg:mt-5 md:grid-cols-3  gap-14 md:gap-5 lg:gap-10 `}
    >
      {sortedPosts.map((post, index) => (
        <Link
          href={`/post/${post.slug.current}`}
          key={post._id}
          className={`${
            index === 0
              ? "md:col-span-3 md:border-b-2 md:border-black md:pb-10 md:mb-5 "
              : "md:col-span-1"
          }h-fit w-full `}
        >
          <div className={`group cursor-pointer flex flex-col w-full `}>
            <div
              className={`relative w-full h-60 ${
                index === 0 ? " lg:h-[50rem]" : " md:h-48 lg:h-60"
              }  drop-shadow-xl transition-transform duration-200 ease-out`}
            >
              <Image
                className={`object-cover object-left lg:object-center rounded-2xl`}
                src={urlForImage(post.mainImage).url()}
                alt={post.author.name}
                fill
              />
            </div>
            <section
              className={` flex flex-col flex-1 justify-between px-2 md:px-0 ${
                index === 0 ? " md:mx-3 md:pr-14" : "min-h-[225px]"
              } h-full w-full`}
            >
              <div className={`mt-5 flex-1`}>
                <div className={`flex items-start gap-3 justify-between`}>
                  <p
                    className={`${
                      index === 0
                        ? "lg:text-3xl md:text-2xl"
                        : "text-xl md:text-lg md:line-clamp-2 lg:text-lg "
                    } font-heading max-w-[90%] h-fit font-semibold lg:font-bold `}
                  >
                    {post.title}
                  </p>
                  <span
                    className={`mt-2 font-bold ${index === 0 ? "hidden" : "block"}`}
                  >
                    <ArrowUpRight className={`h-5 w-5  md:h-4 md:w-4`} />
                    {/* <ArrowUpRightIcon className="h-4 w-4" /> */}
                  </span>
                </div>

                <p
                  className={`${
                    index === 0 ? "lg:text-base md:pr-40" : " lg:text-sm"
                  }  font-heading  line-clamp-2 text-sm mt-2`}
                >
                  {post.description}
                </p>
              </div>
              <div
                className={`flex w-full  mt-4  ${
                  index === 0
                    ? "md:flex-row-reverse flex-col gap-4 md:mt-4 md:justify-between md:gap-10 md:min-h-[80px] md:h-full md:items-center "
                    : "flex-col gap-4"
                } `}
              >
                <div
                  className={`flex flex-col  ${
                    index === 0 ? " md:justify-between md:items-start " : "gap-"
                  }`}
                >
                  <span
                    className={`${
                      index === 0
                        ? "hidden md:inline md:text-sm md:mb-1 md:font-semibold"
                        : "hidden"
                    }`}
                  >
                    Tags
                  </span>
                  <div className={`flex gap-2 items-center`}>
                    {post.categories.map((category) => (
                      <span
                        key={category._id}
                        className={`flex items-center justify-center text-center text-black
                             px-1  py-0.5 rounded-md border border-black text-xs  font-medium md:font-semibold`}
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center font-heading gap-2">
                  <Image
                    className="rounded-full h-10 lg:h-12 w-10 lg:w-12 object-cover"
                    src={urlForImage(post.author.image).url()}
                    alt={`Photo of ${post.author.name}`}
                    height={48}
                    width={48}
                  />
                  <div className="flex flex-col text-sm ">
                    <span className="font-semibold">{post.author.name}</span>
                    <span className=" ">
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {" • "}
                      {calculateReadingTime(post.body)} min read
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
