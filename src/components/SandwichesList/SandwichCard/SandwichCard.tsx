"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Sandwich from "@/assets/sandwich.png";
import { formatDate } from "date-fns";
import { useDeleteSandwich } from "@/hooks/queries/useSandwichSearch/useSandwichSearch";
import { Trash } from "lucide-react";
import { ICreatedSandwich } from "@/types/sandwich";
import Link from "next/link";

export const SandwichCard = ({
  _id,
  name,
  editedAt,
  createdAt,
}: ICreatedSandwich) => {
  const { mutate } = useDeleteSandwich();

  return (
    <Card className="w-full grid grid-cols-12 bg-white px-4 border-2 border-dark_brown">
      <Image src={Sandwich} alt="sandwich photo" width="100" height={"100"} />
      <Link
        href={`/sandwiches/${_id}`}
        className="flex flex-col justify-center col-span-10 pl-4"
      >
        <p>{name}</p>
        <p className="text-[10px] text-gray-400">
          {editedAt
            ? `Edited at: ${formatDate(editedAt, "dd mm yyyy:kk mm")}`
            : `Created at: ${formatDate(createdAt, "dd mm yyyy:kk mm")}`}
        </p>
      </Link>
      <div className="flex items-center justify-center">
        <Trash
          onClick={() => {
            mutate(_id);
          }}
          className="cursor-pointer text-dark_brown hover:text-orange_secondary transition-colors duration-200"
          strokeWidth={2}
        />
      </div>
    </Card>
  );
};
