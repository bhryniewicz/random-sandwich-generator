export interface ProductBase {
  _id: string;
  name: string;
}

export interface IBreadStuff extends ProductBase {
  flour: string;
}

type SauceType = "vege" | "mayo";

export interface ISauce extends ProductBase {
  type: SauceType;
}

export interface IProducts {
  ingredients: ProductBase[];
  breadStuff: IBreadStuff[];
  sauces: ISauce[];
}
