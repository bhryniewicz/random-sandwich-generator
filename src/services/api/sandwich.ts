import { ICreatedSandwich, ISandwich } from "@/types/sandwich";
import { redirect } from "next/navigation";

export const getSandwich = async (id: string): Promise<ICreatedSandwich> => {
  const response = await fetch(`http://localhost:3000/api/sandwich/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get sandwich with this ID");
  }

  const data = await response.json();
  return data;
};

export const insertSandwich = async (name: string, sandwich: ISandwich) => {
  const newSandwich = {
    name,
    sandwich,
  };

  try {
    const response = await fetch("/api/sandwich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSandwich),
    });

    if (!response.ok) {
      throw new Error("Failed to insert sandwich");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteSandwich = async (id: string) => {
  try {
    const response = await fetch(`/api/sandwich`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const editSandwich = async (sandwich: ICreatedSandwich) => {
  try {
    await fetch("/api/sandwich", {
      method: "PUT",
      body: JSON.stringify(sandwich),
    });
  } catch (e) {
    console.error(e);
  }

  redirect(`/sandwiches/${sandwich._id}`);
};
