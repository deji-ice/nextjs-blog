import { groq } from "next-sanity";

export const postsQuery = groq`
*[_type == "post"] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  description,
  mainImage,
  slug,
  body,
  author -> {
    name,
    image
  },
  categories[]-> {
    _id,
    title
  }
} | order(_createdAt desc)
`;

export const postQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  _createdAt,
  _updatedAt,
  mainImage,
  body,
  description,
  author->,
  categories[]->{
  _id,
  title,
  slug,
  description
}
}
`;

export const relatedPostsQuery = groq`
*[_type == "post" &&
  count((categories[]->slug.current)[@ in $categories]) > 0 &&
  slug.current != $currentSlug &&
  _createdAt < now()
] | order(_createdAt desc) [0...3] {
  _id,
  title,
  slug,
  description,
  mainImage,
  body,
  _createdAt,
  author->
}
`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
