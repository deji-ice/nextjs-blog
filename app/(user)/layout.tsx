import Header from "@/components/Header";
import "../globals.css";
import { Lato } from "@next/font/google";
import localFont from "@next/font/local";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const cabinetGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/CabinetGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

export const metadata = {
  title: "The Code Chronicles",
  description: "Expand your mind and broaden your horizons...",
  // openGraph: {
  //   title: "The Code Chronicles",
  //   description: "Expand your mind...",
  //   images: ["/LOGO.png"],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${cabinetGrotesk.variable} antialiased`}
    >
      <body className="bg-[#FAF9F6] overflow-x-clip  font-body">
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
