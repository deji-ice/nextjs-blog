export default function WebsiteStructuredData() {
  const baseUrl = "https://www.thecodechronicles.tech";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Code Chronicles",
    description:
      "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep.",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
      sameAs: [
        "https://twitter.com/dejixice",
        // Add other social profiles here
      ],
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Code Chronicles",
    url: baseUrl,
    logo: `${baseUrl}/LOGO.png`,
    description:
      "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep.",
    sameAs: ["https://twitter.com/dejixice"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Editorial",
      url: baseUrl,
    },
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Code Chronicles",
    description:
      "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep.",
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: "The Code Chronicles",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/LOGO.png`,
      },
    },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </>
  );
}
