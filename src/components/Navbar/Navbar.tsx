import Image from "next/image";
import Link from "next/link";
import Sandwich from "@/assets/sandwich.png";

const routes = ["generate", "sandwiches", "1", "2", "3"];

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
      <div className="flex flex-col">
        {routes.map((route) => {
          return <LinkItem href={route} key={route} />;
        })}
      </div>
    </div>
  );
};

const LinkItem = ({ href }: { href: string }) => {
  return (
    <Link
      href={`/${href}`}
      className="mb-auto hover:text-[#f36805] hover:underline transition-colors duration-300"
    >
      {href}
    </Link>
  );
};
