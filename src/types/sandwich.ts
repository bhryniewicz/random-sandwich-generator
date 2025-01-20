import { IBreadStuff, ISauce, ProductBase } from "./products";

export interface ISandwich {
  bread: IBreadStuff;
  ingredients: ProductBase[];
  sauce: ISauce | null;
}

export interface ICreatedSandwich extends ISandwich {
  _id: string;
  name: string;
  sandwich: ISandwich;
  createdAt: Date;
  editedAt: Date | null;
}
