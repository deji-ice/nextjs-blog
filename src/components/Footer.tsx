import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-slate-800 bg-slate-950 px-10">
      <div className="mt-16 border-t border-slate-800 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-white font-cabinet-grotesk text-lg font-bold">
            The Code Chronicles
          </p>
          <p className="text-slate-400 text-sm max-w-[40ch] font-lato">
            Fresh takes on tech that matters.
          </p>
        </div>
        <div className="pb-8 text-xs text-slate-500 font-lato">
          © {year} The Code Chronicles. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
