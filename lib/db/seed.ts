import { loadEnvConfig } from "@next/env";
import data from "../data";
import { connectToDb } from ".";
import Product from "./models/product.model";

loadEnvConfig(process.cwd());

const main = async () => {
  try {
    const { products } = data;
    await connectToDb(process.env.DATABASE_URI);

    await Product.deleteMany();
    const createdProducts = await Product.insertMany(products);

    console.log({ createdProducts, message: "Seed data successfully " });
    process.exit(0);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to seed database");
  }
};

main();
