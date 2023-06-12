import Image from "next/image";
import Link from "next/link";
import logo from "../assets/LOGO.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center mt-8 font-bold px-5 py-5">
      <div className="flex items-start space-x-2">
        <Link href={"/"}>
          <Image
            className="rounded-full object-cover"
            src={logo}
            height={50}
            width={50}
            alt="logo"
          />
        </Link>
      </div>
      <div><Link href={"/"} className="flex items-center text-center px-5 py-3 text-sm md:text-base rounded-full text-white bg-slate-700">
      Sign up for my newsletter </Link></div>
    </header>
  );
};

export default Header;
