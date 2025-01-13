import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex flex-col uppercase text-[90px] text-[#471a08] w-max">
      <Link href="/">Generate</Link>
      <Link href="/sandwiches">My sandwiches</Link>
      {/* <Link>My sandwiches</Link>
      <Link>Compose</Link>
      <Link>Articles</Link> */}
    </div>
  );
};
