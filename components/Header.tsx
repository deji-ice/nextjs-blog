import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center space-x-2 font-bold px-10 py-5">
      <div className="flex items-start space-x-2">
        <Link href={"/"}>
          <Image
            className="rounded-full object-cover"
            src={"https://links.papareact.com/1m8"}
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
