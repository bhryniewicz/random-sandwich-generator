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
import { formatDate } from "date-fns";

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
        <Search setText={setText} />
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
          {sandwichInfo ? (
            <motion.div
              key={sandwichInfo._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-2xl font-bold text-dark_brown">
                {sandwichInfo.name}
              </h2>
              <p className="text-lg font-medium text-dark_brown">
                <span className="font-semibold">Created At: </span>
                {formatDate(sandwichInfo.createdAt, "dd-MM-yyyy : kk:mm")}
              </p>
              {sandwichInfo.editedAt && (
                <p className="text-lg font-medium text-dark_brown">
                  <span className="font-semibold">Edited At: </span>
                  {formatDate(sandwichInfo.editedAt, "dd-MM-yyyy : kk:mm")}
                </p>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-dark_brown">
                  Bread:
                </h3>
                <p className="text-md text-dark_brown">
                  <span className="font-semibold">Name:</span>{" "}
                  {sandwichInfo.sandwich.bread.name}
                </p>
                <p className="text-md text-dark_brown">
                  <span className="font-semibold">Flour:</span>{" "}
                  {sandwichInfo.sandwich.bread.flour}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-dark_brown">
                  Ingredients:
                </h3>
                <ul className="list-disc list-inside text-md text-dark_brown">
                  {sandwichInfo.sandwich.ingredients.map((ingredient) => (
                    <li key={ingredient._id}>{ingredient.name}</li>
                  ))}
                </ul>
              </div>
              {sandwichInfo.sandwich.sauce && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-dark_brown">
                    Sauce:
                  </h3>
                  <p className="text-md text-dark_brown">
                    <span className="font-semibold">Name:</span>{" "}
                    {sandwichInfo.sandwich.sauce.name}
                  </p>
                  <p className="text-md text-dark_brown">
                    <span className="font-semibold">Type:</span>{" "}
                    {sandwichInfo.sandwich.sauce.type}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-dark_brown text-lg">
                Hover on item to see info!
              </h1>
            </div>
          )}
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
