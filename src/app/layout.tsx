import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const cabinetGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/CabinetGrotesk-Thin.woff2",
      weight: "100",
      style: "normal",
    },
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
      path: "../../public/fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.thecodechronicles.tech/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: {
    template: "%s | The Code Chronicles",
    default: "The Code Chronicles",
  },
  description:
    "Expand your mind and broaden your horizons with our captivating chronicles of curiosity",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thecodechronicles.tech/",
    siteName: "The Code Chronicles",
    images: [
      {
        url: "/LOGO.png",
        width: 1200,
        height: 630,
        alt: "The Code Chronicles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Code Chronicles",
    description: "Explore the latest in tech and development.",
    images: ["/LOGO.png"],
    creator: "@yourhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${cabinetGrotesk.variable}`}>
      <body className="antialiased font-lato">
        <Header />
        <main className="mx-auto max-w-[1400px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
