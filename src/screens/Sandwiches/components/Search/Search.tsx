import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface SearchProps {
  setText: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ setText }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

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
    <Input
      type="search"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search for your sandwich"
      className="bg-white text-black border-2 border-orange_primary"
    />
  );
};
