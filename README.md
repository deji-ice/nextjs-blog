# Modern Next.js + Sanity v5 Blog

This is a high-performance blog system built with Next.js 15, Sanity Studio v5, and Tailwind CSS, preserving the original "The Code Chronicles" aesthetic.

## Features

- **Next.js 15 (App Router)**: Utilizing React Server Components and optimized performance.
- **Sanity v5**: Latest Sanity Studio for interactive content management.
- **Related Posts**: Intelligent content suggestions via GROQ.
- **Premium Design**: Preservation of original "The Code Chronicles" typography and layout.
- **SEO & Metadata**: Dynamic Open Graph and Meta tags for every post.
- **Portable Text**: Rich content rendering with optimized images.

## Setup Instructions

1. **Clone and Install**:

   ```bash
   pnpm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file with the following:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=e1we4hfw
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN= (Optional: For preview mode)
   ```

3. **Run the Development Server**:

   ```bash
   pnpm run dev
   ```

4. **Access the CMS**:
   Navigate to `http://localhost:3000/studio` to manage your content.

## Content Management

- **Posts**: Create and publish blog posts with images, categories, and SEO metadata.
- **Authors**: Manage author profiles.
- **Categories**: Organize posts into categories to power the "Related Posts" feature.

## Tech Stack

- Frontend: Next.js 15, React 19, Tailwind CSS
- CMS: Sanity v5
- Types: TypeScript
- Fonts: Lato (Body), Cabinet Grotesk (Headings)
