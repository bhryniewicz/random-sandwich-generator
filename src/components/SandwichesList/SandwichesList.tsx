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
    <div className="container flex flex-col h-[800px] p-16 justify-end gap-2 overflow-y-scroll pt-16">
      <Input
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for your sandwich"
      />
      {sandwichList?.map((sandwich) => {
        return <SandwichCard key={sandwich._id} {...sandwich} />;
      })}
    </div>
  );
};
