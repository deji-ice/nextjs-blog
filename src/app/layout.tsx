import { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LenisScrollProvider from "@/components/LenisProvider";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thecodechronicles.tech/"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "web development",
    "programming",
    "software engineering",
    "tech blog",
    "coding tutorials",
    "developer insights",
    "javascript",
    "typescript",
    "react",
    "nextjs",
  ],
  title: {
    template: "%s | The Code Chronicles",
    default: "The Code Chronicles - Fresh Takes on Tech That Matters",
  },
  description:
    "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep. Real insights.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thecodechronicles.tech/",
    siteName: "The Code Chronicles",
    title: "The Code Chronicles - Fresh Takes on Tech That Matters",
    description:
      "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep.",
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
    title: "The Code Chronicles - Fresh Takes on Tech That Matters",
    description:
      "Fresh takes on tech that matters. We dig into frameworks worth learning, trends reshaping development, and the bugs that ruin your sleep.",
    images: ["/LOGO.png"],
    creator: "@dejixice",
    site: "@dejixice",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${cabinetGrotesk.variable}`}>
      <Analytics />

      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      <body className="antialiased font-lato">
        <Header />
        <LenisScrollProvider>
          <main className="mx-auto max-w-[1400px]">{children}</main>
        </LenisScrollProvider>
        <Footer />
      </body>
    </html>
  );
}
