"use client";

import { editSandwich, getSandwich } from "@/server/insertSandwich";
import { ICreatedSandwich } from "@/types/sandwich";
import { useQuery } from "@tanstack/react-query";
import { redirect, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { EditSandwichValues } from "./schema";

export default function EditSandwichPage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery<ICreatedSandwich | undefined>({
    queryKey: ["sandwich"],
    queryFn: async () => await getSandwich(id as string),
    enabled: !!id,
  });

  const { register, handleSubmit } = useForm<EditSandwichValues>({});

  if (isLoading) return <h1>loading sandwich</h1>;

  if (data === undefined) return <h1>no data</h1>;

  const {
    name,
    sandwich: { bread, sauce },
  } = data;

  const onSubmit = async (changedData: EditSandwichValues) => {
    const editedSandwich: ICreatedSandwich = {
      ...data,
      name: changedData.name,
      editedAt: new Date(),
    };

    console.log(editedSandwich);
    await editSandwich(editedSandwich);
    redirect("/sandwiches");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          defaultValue={name}
        />
        Sandwich
        <p>Bread</p>
        <p>Products</p>
        {/* <ul>
          {product.map((prod) => {
            return <li key={prod._id}>{prod.name}</li>;
          })}
        </ul> */}
        {/* <input
          type="text"
          id="product"
          defaultValue={products}
          {...register("sandwich.product")}
        /> */}
        <button>Submit</button>
      </form>
    </div>
  );
}
