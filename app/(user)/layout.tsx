import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FAF9F6] min-h-screen overflow-x-clip">
      <Header />
      <main className="mx-auto max-w-[1400px]">{children}</main>
      <Footer />
    </div>
  );
}
