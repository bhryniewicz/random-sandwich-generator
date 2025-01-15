import Image from "next/image";
import Link from "next/link";
import Sandwich from "@/assets/sandwich.png";

export const Navbar = () => {
  return (
    <div className="flex flex-col justify-center uppercase text-[80px] text-[#471a08] w-[40%] px-8 py-16 font-luckiest">
      <div className="flex items-center mb-auto">
        <Image src={Sandwich} width={100} height={100} alt="sandwich logo" />
        <h1 className="text-xl">
          Random Sandwich
          <br />
          Generator
        </h1>
      </div>
      <Link
        href="/"
        className="hover:text-[#8a4b00] transition-colors duration-300"
      >
        Generate
      </Link>
      <Link
        href="/sandwiches"
        className="hover:text-[#cc760e] hover:underline transition-colors duration-300"
      >
        My list
      </Link>
      <Link
        href="/"
        className="hover:text-[#fa900f] hover:underline transition-colors duration-300"
      >
        The Best of
      </Link>
      <Link
        href="/"
        className="hover:text-[#fa900f] hover:underline transition-colors duration-300"
      >
        Compose
      </Link>
      <Link
        href="/"
        className="mb-auto hover:text-[#fa900f] hover:underline transition-colors duration-300"
      >
        Articles
      </Link>
    </div>
  );
};
