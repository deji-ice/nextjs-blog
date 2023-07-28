# Next.js Blog with Sanity, Tailwind CSS, and TypeScript

This project is a simple and customizable blog built using Next.js, Sanity.io for content management, Tailwind CSS for styling, and TypeScript for type safety. It allows you to create and manage blog posts through Sanity's user-friendly interface and displays them on a Next.js frontend with a beautiful and responsive design powered by Tailwind CSS.

## Features

- Next.js framework for server-side rendering and fast page loads.
- Sanity.io for content management and easy blog post creation.
- Tailwind CSS for styling, providing a fully customizable and responsive design.
- TypeScript for type safety, making the codebase more maintainable.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

- Node.js (version 12 or higher)
- npm (Node Package Manager) or yarn

### Installation

1. Clone this repository to your local machine:

```
git clone <repository-url>
```

2. Navigate to the project directory:

```
cd nextjs-blog-sanity-tailwind-typescript
```

3. Install the required dependencies:

If you use npm:

```
npm install
```

If you use yarn:

```
yarn
```

### Configuration

1. Set up a Sanity.io account if you don't have one already: [https://www.sanity.io/](https://www.sanity.io/)

2. Create a new project in Sanity.io and define a schema for your blog posts.

3. Obtain your Sanity project's API token, which will be used to fetch data from Sanity.

4. In the root of the project, create a `.env.local` file and add the following environment variable with your Sanity API token:

```
SANITY_API_TOKEN=YOUR_SANITY_API_TOKEN
```

### Usage

1. Run the development server:

If you use npm:

```
npm run dev
```

If you use yarn:

```
yarn dev
```

If you use pnpm:

```
pnpm dev
```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the blog in action.

### Editing the Page

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file, allowing you to see the changes in real-time.

### API Routes

API routes can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as API routes instead of React pages.

### Font Optimization

This project uses `next/font` to automatically optimize and load Inter, a custom Google Font. You don't need to worry about loading and optimizing the font manually.

## Customization

- **Tailwind CSS**: The styling of the blog can be fully customized by modifying the `tailwind.config.js` file.

- **Sanity Content**: You can add additional fields to the Sanity schema to enrich your blog posts with images, categories, tags, etc. Feel free to customize the blog post structure according to your requirements.

- **Layout and Components**: The components and layout of the blog can be easily customized by modifying the files in the `components` and `pages` directories.

## Deployment

To deploy the blog to a live server, follow the deployment instructions provided by Vercel, as Next.js projects are easily deployable on Vercel platform: [https://vercel.com/docs](https://vercel.com/docs)

## Contributing

If you'd like to contribute to this project, please fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This project was inspired by the need for a simple, fast, and customizable blog template using Next.js and Sanity.io.
- Thanks to the open-source community for their valuable contributions to the tools and libraries used in this project.

Enjoy your new Next.js blog with Sanity, Tailwind CSS, and TypeScript! Happy blogging! 🚀
