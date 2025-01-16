"use client";

import { deleteSandwich } from "@/server/insertSandwich";
import { Card } from "../ui/card";
import { formatDate } from "date-fns";
import { FC, useState } from "react";
import { ICreatedSandwich } from "@/types/sandwich";
import Link from "next/link";

interface SandwichesListProps {
  sandwiches: ICreatedSandwich[];
}
export const SandwichesList: FC<SandwichesListProps> = ({ sandwiches }) => {
  const [sandwichList, setSandwichList] = useState(sandwiches);

  const handleDelete = async (id: string) => {
    const response = await deleteSandwich(id);
    if (response?.status === 200) {
      setSandwichList((prev) => prev.filter((sandwich) => sandwich._id !== id));
    } else {
      console.error("Failed to delete sandwich");
    }
  };

  return (
    <div className="container flex justify-center gap-8">
      {sandwichList.map((sandwich) => {
        return (
          <Card key={sandwich._id} className="p-8 bg-[#fc733d]">
            <p>{sandwich.name}</p>
            <button onClick={() => handleDelete(sandwich._id)}>
              Delete sandwich
            </button>
            <Link href={`/sandwiches/${sandwich._id}/edit`}>edit Route</Link>
            <Link href={`/sandwiches/${sandwich._id}`}>page Route</Link>
            <p className="text-[10px] text-gray-400">
              {sandwich.editedAt
                ? `Edited at: ${formatDate(
                    sandwich.editedAt,
                    "dd mm yyyy:kk mm"
                  )}`
                : `Created at: ${formatDate(
                    sandwich.createdAt,
                    "dd mm yyyy:kk mm"
                  )}`}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
