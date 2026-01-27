type Base = {
    _createdAt: string;
    _updatedAt: string;
    _id: string;
    _rev: string;
    _type: string;
};

interface Seo {
    metaTitle: string;
    metaDescription: string;
}

interface Post extends Base {
    author: Author;
    title: string;
    body: any[]; // Changed to any[] for simplicity with PortableText
    categories: Category[];
    mainImage: any;
    description: string;
    seo: Seo;
    slug: Slug;
    _createdAt: string;
}

interface Author extends Base {
    bio: any[];
    image: any;
    name: string;
    slug: Slug;
}

interface Category extends Base {
    title: string;
    slug: Slug;
    description: string;
}

interface Slug {
    current: string;
    _type: "slug";
}
