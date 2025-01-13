import { ICreatedSandwich, ISandwich } from "@/types/sandwich";

export const getSandwich = async (
  id: string
): Promise<ICreatedSandwich | undefined> => {
  try {
    const response = await fetch(`/api/sandwich/${id}`, {
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
  } catch (e) {
    console.error(e);
  }
};

export const insertSandwich = async (name: string, sandwich: ISandwich) => {
  const newSandwich = {
    name,
    sandwich,
  };

  console.log(newSandwich, "new");

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
};
