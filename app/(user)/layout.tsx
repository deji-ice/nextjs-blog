import Header from "@/components/Header";
import "../globals.css";
import Banner from "@/components/Banner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
    
      <head />

      <body className="mx-auto max-w-7xl ">
        <p className="w-full bg-black text-white text-center text-xs fixed z-30 p-1 top-0 md:text-sm">The website is currently undergoing reconstruction and will be back soon with an enhanced user experience 🚧 👷 </p>
        <Header />
        <Banner/>
        {children}
      </body>
    </html>
  );
}
