"use client";

import Image from "next/image";
import Link from "next/link";
import Sandwich from "@/assets/sandwich.png";
import { SandwichIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { routes } from "./routes";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const mappedRoutes = routes.map((route) => {
    return <LinkItem href={route.href} label={route.label} key={route.label} />;
  });

  return (
    <div className="flex justify-between items-center uppercase text-[24px] text-[#471a08] bg-[#f4dac9] px-8 py-6 md:py-0 md:px-16 font-luckiest min-h-[10vh]">
      <div className="flex items-center">
        <Image
          src={Sandwich}
          width={100}
          height={100}
          alt="sandwich logo"
          className="hidden md:block"
        />
        <h1 className="text-base leading-4 md:text-xl md:leading-7">
          Random Sandwich
          <br />
          Generator
        </h1>
      </div>
      <SandwichIcon
        className="block md:hidden"
        size={32}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="navbar-state"
            initial={{ opacity: 0.75, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-8 bg-orange_primary text-white absolute left-0 top-0 h-screen w-full tracking-widest"
          >
            <XIcon
              size={32}
              strokeWidth={4}
              className="absolute top-8 right-8"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />
            {mappedRoutes}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden md:flex gap-8 tracking-wider">{mappedRoutes}</div>
    </div>
  );
};

const LinkItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={`/${href}`}
      className="hover:text-orange_primary hover:underline transition-colors duration-300"
    >
      {label}
    </Link>
  );
};
