"use client";

import { Button } from "@/components/ui/button";
import {
  useDeleteSandwich,
  useGetSandwich,
} from "@/hooks/queries/useGetSandwich/useGetSandwich";
import { formatDate } from "date-fns";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";

export const Sandwich = () => {
  const { id } = useParams();
  const { sandwichData, isSandwichDataLoading } = useGetSandwich(id as string);
  const { mutate } = useDeleteSandwich();

  if (isSandwichDataLoading) return <h1>Loading...</h1>;
  if (!sandwichData) return <h1>Sandwich not found</h1>;

  return (
    <div className="container mx-auto p-6">
      <motion.div
        key={sandwichData._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-dark_brown">
          {sandwichData.name}
        </h2>

        <p className="text-lg font-medium text-dark_brown">
          <span className="font-semibold">Created At: </span>
          {formatDate(sandwichData.createdAt, "dd-MM-yyyy : kk:mm")}
        </p>

        {sandwichData.editedAt && (
          <p className="text-lg font-medium text-dark_brown">
            <span className="font-semibold">Edited At: </span>
            {formatDate(sandwichData.editedAt, "dd-MM-yyyy : kk:mm")}
          </p>
        )}

        {/* Bread Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-dark_brown">Bread:</h3>
          <p className="text-md text-dark_brown">
            <span className="font-semibold">Name:</span>{" "}
            {sandwichData.sandwich.bread.name}
          </p>
          <p className="text-md text-dark_brown">
            <span className="font-semibold">Flour:</span>{" "}
            {sandwichData.sandwich.bread.flour}
          </p>
        </div>

        {/* Ingredients Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-dark_brown">
            Ingredients:
          </h3>
          <ul className="list-disc list-inside text-md text-dark_brown">
            {sandwichData.sandwich.ingredients.map((ingredient) => (
              <li key={ingredient._id}>{ingredient.name}</li>
            ))}
          </ul>
        </div>

        {/* Sauce Section */}
        {sandwichData.sandwich.sauce && (
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-dark_brown">Sauce:</h3>
            <p className="text-md text-dark_brown">
              <span className="font-semibold">Name:</span>{" "}
              {sandwichData.sandwich.sauce.name}
            </p>
            <p className="text-md text-dark_brown">
              <span className="font-semibold">Type:</span>{" "}
              {sandwichData.sandwich.sauce.type}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Link href={`/sandwiches/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Button
            onClick={() => mutate(id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
