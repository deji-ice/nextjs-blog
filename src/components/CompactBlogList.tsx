import BlogCard from "./BlogCard";

type Props = {
  posts: Post[];
  limit?: number;
  showFeatured?: boolean;
};

const CompactBlogList = ({ posts, limit = 5, showFeatured = false }: Props) => {
  const sortedPosts = posts
    .sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime())
    .slice(0, limit);

  if (sortedPosts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedPosts.map((post, index) => (
        <BlogCard
          key={post._id}
          post={post}
          variant={showFeatured && index === 0 ? "featured" : "compact"}
        />
      ))}
    </div>
  );
};

export default CompactBlogList;
