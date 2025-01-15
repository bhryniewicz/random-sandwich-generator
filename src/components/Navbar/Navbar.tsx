import Image from "next/image";
import Link from "next/link";
import Sandwich from "@/assets/sandwich.png";

const routes = [
  {
    href: "/",
    label: "Generate",
  },
  {
    href: "sandwiches",
    label: "Sandwiches",
  },
  {
    href: "/",
    label: "My list",
  },
  {
    href: "/",
    label: "The best of",
  },
  {
    href: "/",
    label: "Compose",
  },
];

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
          return (
            <LinkItem href={route.href} label={route.label} key={route.label} />
          );
        })}
      </div>
    </div>
  );
};

const LinkItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={`/${href}`}
      className="mb-auto hover:text-[#f36805] hover:underline transition-colors duration-300"
    >
      {label}
    </Link>
  );
};
