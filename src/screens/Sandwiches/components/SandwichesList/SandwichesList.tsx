"use client";

import { FC, useState } from "react";
import { ICreatedSandwich } from "@/types/sandwich";
import { useSandwichSearch } from "@/hooks/queries/useSandwichSearch/useSandwichSearch";
import { useDebounce } from "use-debounce";
import { SandwichCard } from "./SandwichCard";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "../Search";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SandwichDetails } from "./SandwichDetails";

interface SandwichesListProps {
  sandwiches: ICreatedSandwich[];
}

export const SandwichesList: FC<SandwichesListProps> = ({ sandwiches }) => {
  const [hoveredSandwich, setHoveredSandwich] =
    useState<ICreatedSandwich | null>(null);
  const [sandwichInfo] = useDebounce(hoveredSandwich, 300);

  const [text, setText] = useState<string>("");
  const [searchParam] = useDebounce(text, 500);
  const { sandwichList, isFetching, isPending } = useSandwichSearch(
    sandwiches,
    searchParam
  );

  //add skeelton for loading
  if (isFetching || isPending) return <h1>Loading sandwiches...</h1>;
  if (!sandwichList) return <h1>jd</h1>;

  return sandwichList.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="h-full overflow-hidden">
        <Search setText={setText} text={text} />
        <p className="pt-4 font-semibold text-md text-dark_brown">
          All saved sandwiches:{" "}
          <span className="font-bold">{sandwichList?.length}</span>
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
              {sandwichList?.map((sandwich) => (
                <SandwichCard
                  key={sandwich._id}
                  {...sandwich}
                  onHoverStart={() => setHoveredSandwich(sandwich)}
                  onHoverEnd={() => setHoveredSandwich(null)}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className="hidden md:block pl-8 pb-4">
        <div className="w-full h-full bg-[#ffb654] rounded-xl p-16">
          <SandwichDetails sandwichInfo={sandwichInfo} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h4 className="text-[50px] text-dark_brown font-luckiest">
        No sandwiches added yet
      </h4>
      <Link href="/generate">
        <Button
          variant={"default"}
          className="flex justify-center items-center w-full p-12 bg-orange_primary text-[40px] font-luckiest"
        >
          Generate one
        </Button>
      </Link>
    </div>
  );
};
