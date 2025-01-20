"use client";

import { FC, useState } from "react";
import { ICreatedSandwich } from "@/types/sandwich";
import { useSandwichSearch } from "@/hooks/queries/useSandwichSearch/useSandwichSearch";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { SandwichCard } from "./SandwichCard";

interface SandwichesListProps {
  sandwiches: ICreatedSandwich[];
}

export const SandwichesList: FC<SandwichesListProps> = ({ sandwiches }) => {
  const [text, setText] = useState<string>("");

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [searchParam] = useDebounce(text, 500);
  const { sandwichList } = useSandwichSearch(sandwiches, searchParam);

  const handleSearch = (term: string) => {
    setText(term);
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container flex flex-col items-start gap-2">
      <Input
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for your sandwich"
        className="bg-white text-black border-2 border-orange_primary"
      />
      <p>
        Search results:{" "}
        <span className="text-orange_primary font-bold">
          {sandwichList?.length}
        </span>
      </p>
      <div className="grid grid-cols-2 gap-4 pt-4">
        {sandwichList?.map((sandwich) => {
          return <SandwichCard key={sandwich._id} {...sandwich} />;
        })}
      </div>
    </div>
  );
};
