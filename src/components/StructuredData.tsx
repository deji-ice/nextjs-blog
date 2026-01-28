import { urlForImage } from "@/sanity/lib/image";

type StructuredDataProps = {
  post: Post;
  type?: "article" | "blogPosting";
};

export default function StructuredData({
  post,
  type = "blogPosting",
}: StructuredDataProps) {
  const imageUrl = urlForImage(post.mainImage).width(1200).height(630).url();
  const baseUrl = "https://www.thecodechronicles.tech";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "BlogPosting",
    headline: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: post._createdAt,
    dateModified: post._updatedAt || post._createdAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${baseUrl}/author/${post.author.slug?.current || ""}`,
      image: {
        "@type": "ImageObject",
        url: urlForImage(post.author.image).url(),
      },
    },
    publisher: {
      "@type": "Organization",
      name: "The Code Chronicles",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/LOGO.png`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/post/${post.slug.current}`,
    },
    keywords: post.categories?.map((cat) => cat.title).join(", "),
    articleSection: post.categories?.[0]?.title || "Technology",
    inLanguage: "en-US",
  };

  // Add breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/post/${post.slug.current}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
