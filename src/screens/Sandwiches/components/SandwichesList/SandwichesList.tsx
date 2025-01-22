"use client";

import { FC, useState } from "react";
import { ICreatedSandwich } from "@/types/sandwich";
import { useSandwichSearch } from "@/hooks/queries/useSandwichSearch/useSandwichSearch";
import { useDebounce } from "use-debounce";
import { SandwichCard } from "./SandwichCard";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "../Search";

interface SandwichesListProps {
  sandwiches: ICreatedSandwich[];
}

export const SandwichesList: FC<SandwichesListProps> = ({ sandwiches }) => {
  const [text, setText] = useState<string>("");

  const [searchParam] = useDebounce(text, 500);
  const { sandwichList } = useSandwichSearch(sandwiches, searchParam);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="h-full overflow-hidden">
        <Search setText={setText} />
        <p className="pt-4 font-semibold text-md text-dark_brown">
          All saved sandwiches:{" "}
          <span className=" font-bold">{sandwichList?.length}</span>
        </p>
        <motion.div
          className="flex flex-col gap-2 py-4 mb-4 h-[100%]"
          key="initial-list-state"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="md:h-[77vh] flex flex-col gap-2 overflow-y-auto scroll-smooth overscroll-y-none no-scrollbar">
            <AnimatePresence>
              {sandwichList?.map((sandwich) => {
                return <SandwichCard key={sandwich._id} {...sandwich} />;
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className="hidden md:block pl-8 pb-4">
        <div className="w-full h-full bg-[#ffb654] rounded-xl">
          wymyslic co z ta przestrzenia
        </div>
      </div>
    </div>
  );
};
