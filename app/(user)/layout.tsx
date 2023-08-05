import Header from "@/components/Header";
import "../globals.css";
import Head from "../head";

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

      <Head />
      <body className="bg-[#FAF9F6] overflow-x-clip ">
        {/* <p className="w-full bg-slate-700 text-white text-center text-xs fixed z-30 p-1 top-0 md:text-sm">
          The website is currently undergoing reconstruction and will be back
          soon with an enhanced user experience 🚧 👷{" "}
        </p> */}
        <Header />
        {children}
      </body>
    </html>
  );
}
