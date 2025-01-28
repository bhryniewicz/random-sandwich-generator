import { ICreatedSandwich } from "@/types/sandwich";
import { formatDate } from "date-fns";
import { motion } from "framer-motion";

export const SandwichDetails = ({
  sandwichInfo,
}: {
  sandwichInfo: ICreatedSandwich | null;
}) => {
  return sandwichInfo ? (
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
        <h3 className="text-xl font-semibold text-dark_brown">Bread:</h3>
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
        <h3 className="text-xl font-semibold text-dark_brown">Ingredients:</h3>
        <ul className="list-disc list-inside text-md text-dark_brown">
          {sandwichInfo.sandwich.ingredients.map((ingredient) => (
            <li key={ingredient._id}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
      {sandwichInfo.sandwich.sauce && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-dark_brown">Sauce:</h3>
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
      <h1 className="text-dark_brown text-lg">Hover on item to see info!</h1>
    </div>
  );
};
