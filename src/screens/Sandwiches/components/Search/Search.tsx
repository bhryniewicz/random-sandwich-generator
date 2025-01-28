import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, SyntheticEvent } from "react";

interface SearchProps {
  setText: (value: string) => void;
  text: string;
}

export const Search: FC<SearchProps> = ({ setText, text }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (term: string, e: SyntheticEvent) => {
    e.preventDefault();
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
    <Input
      type="search"
      onChange={(e) => handleSearch(e.target.value, e)}
      value={text}
      placeholder="Search for your sandwich"
      className="bg-[#ffb654] text-black border-2 border-orange_primary placeholder:font-luckiest placeholder:text-white placeholder:tracking-wider placeholder:text-lg"
    />
  );
};
