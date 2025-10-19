import { ProductInputScheme } from "@/lib/validator";
import z from "zod";

export type IProductInput = z.infer<typeof ProductInputScheme>;

export type Data = {
  products: IProductInput[];
  headersMenu: {
    name: string;
    href: string;
  }[];
  carousels: {
    image: string;
    href: string;
    title: string;
    buttonCaption: string;
    isPublish: boolean;
  }[];
};
