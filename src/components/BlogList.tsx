import BlogCard from "./BlogCard";

type Props = {
  posts: Post[];
};

const BlogList = ({ posts }: Props) => {
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
  );

  if (sortedPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No posts found.</p>
      </div>
    );
  }

  // Get featured post (first post) and regular posts
  const [featuredPost, ...regularPosts] = sortedPosts;

  return (
    <div className="mt-5 lg:mt-5">
      {/* Featured Post - Full Width */}
      {featuredPost && (
        <div className="mb-8 md:mb-10 lg:mb-12">
          <BlogCard post={featuredPost} variant="featured" />
        </div>
      )}

      {/* Regular Posts Grid - 1 col mobile, 2 cols md, 3 cols lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 md:gap-y-12 lg:gap-8">
        {regularPosts.map((post) => (
          <BlogCard
            key={post._id}
            post={post}
            variant="default"
            className="h-fit w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
