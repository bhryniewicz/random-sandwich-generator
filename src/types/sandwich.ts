import { IBreadStuff, ISauce, ProductBase } from "./ingredients";

export interface ISandwich {
  bread: IBreadStuff;
  products: ProductBase[];
  sauce: ISauce;
}

export interface ICreatedSandwich extends ISandwich {
  _id: string;
  name: string;
  sandwich: ISandwich;
  createdAt: Date;
  editedAt: Date | null;
}
