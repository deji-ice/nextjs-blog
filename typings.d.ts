type Base = {
    _createdAt: string,
    _updatedAt: string,
    _id: string,
    _rev: string,
    _type: string

}

interface Post extends Base {
    author: Author,
    title: string,
    body: Block[],
    categories: Catergory[],
    mainImage: Image,
    description: string,
    slug: Slug
}

interface Author extends Base {
    bio: string;
    image: Image,
    name: string
    slug: Slug

}

interface Image {
    asset: Reference,
    _type: "image",
}

interface Reference {
    ref: string,
    _type: "reference",
}

interface Slug {
    current: string,
    _type: "slug",
}

interface Block {
    _type: "block",
    _key: string,
    children: Span[],
    markDefs: any[],
    style: string,
}

interface Span {
    _key: string,
    _type: "span",
    marks: any,
    text: string
}

interface Catergory extends Base {
    title: string,
    description: string
}

interface MainImage {
    asset: Reference,
    _type: "image",
}

interface Title {
    current: string,
    _type: "string",
}