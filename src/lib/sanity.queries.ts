import { groq } from "next-sanity";

export const postsQuery = groq`
*[_type == "post"] {
  _id,
  _createdAt,
  title,
  description,
  mainImage,
  slug,
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
  _createdAt,
  author->
}
`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
