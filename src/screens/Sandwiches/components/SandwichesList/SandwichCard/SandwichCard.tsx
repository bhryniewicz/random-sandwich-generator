"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Sandwich from "@/assets/sandwich.png";
import { formatDate } from "date-fns";
import { ICreatedSandwich } from "@/types/sandwich";
import Link from "next/link";
import { motion } from "framer-motion";
import { FC } from "react";

interface SandwichCardProps extends ICreatedSandwich {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export const SandwichCard: FC<SandwichCardProps> = ({
  _id,
  name,
  editedAt,
  createdAt,
  onHoverStart,
  onHoverEnd,
}) => {
  return (
    <motion.div
      key={_id}
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.25 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <Card className="w-full grid grid-cols-12 bg-white md:px-4 border-2 border-dark_brown hover:shadow-[0_1px_5px_rgba(101,67,33,0.6)] transition-shadow duration-200">
        <Image
          src={Sandwich}
          alt="sandwich photo"
          width="100"
          height={"100"}
          className="col-span-2 md:col-span-1"
        />
        <Link
          href={`/sandwiches/${_id}`}
          className="flex flex-col justify-center col-span-9 md:col-span-10 pl-4"
        >
          <p>{name}</p>
          <p className="text-[10px] text-gray-400">
            {editedAt
              ? `Edited at: ${formatDate(editedAt, "dd MM yyyy : kk mm")}`
              : `Created at: ${formatDate(createdAt, "dd MM yyyy : kk mm")}`}
          </p>
        </Link>
      </Card>
    </motion.div>
  );
};
