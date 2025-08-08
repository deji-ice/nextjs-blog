import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t flex items-start md:items-end justify-between px-5 md:px-12 lg:px-20 border-slate-200 bg-slate-950 backdrop-blur ">
      <div className="   py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-white font-heading text-lg">
            The Code Chronicles
          </p>
          <p className="text-slate-200 text-sm max-w-[40ch]">
            Fresh takes on tech that matters.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            {/* <li>
              <Link className="hover:underline underline-offset-4" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:underline underline-offset-4" href="/">
                Blog
              </Link>
            </li> */}
            {/* Add real routes when available */}
            {/* <li><Link className="hover:underline underline-offset-4" href="/about">About</Link></li> */}
            {/* <li><Link className="hover:underline underline-offset-4" href="/contact">Contact</Link></li> */}
          </ul>
        </nav>
      </div>
      <div className="   pb-8 text-xs text-slate-200">
        © {year} The Code Chronicles. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
