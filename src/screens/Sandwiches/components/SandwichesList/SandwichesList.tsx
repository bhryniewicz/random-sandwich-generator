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
    <div className="container flex flex-col items-start gap-2">
      <Search setText={setText} />
      <p>
        Search results:{" "}
        <span className="text-orange_primary font-bold">
          {sandwichList?.length}
        </span>
      </p>
      <motion.div
        className="grid grid-cols-2 gap-4 pt-4"
        key="initial-list-state"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <AnimatePresence>
          {sandwichList?.map((sandwich) => {
            return <SandwichCard key={sandwich._id} {...sandwich} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
