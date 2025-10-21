"use server";

import { connectToDb } from "../db";
import Product, { IProduct } from "../db/models/product.model";

export async function getAllCategories() {
  await connectToDb();
  const categories = await Product.find({ isPublished: true }).distinct(
    "category"
  );

  return categories;
}

export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string;
  limit?: number;
}) {
  await connectToDb();
  const products = await Product.find(
    {
      isPublished: true,
      tags: { $in: [tag] },
    },
    {
      name: 1,
      href: { $concat: ["/product/", "$slug"] },
      image: { $arrayElemAt: ["$images", 0] },
    }
  )
    .sort({ createdAt: "desc" })
    .limit(limit)
    .lean();

  return products as unknown as {
    name: string;
    href: string;
    image: string;
  }[];
}

export async function getProductsByTag({
  tag,
  limit = 10,
}: {
  tag: string;
  limit?: number;
}) {
  await connectToDb();
  const products = (await Product.find({
    isPublished: true,
    tags: { $in: [tag] },
  })
    .sort({ createdAt: "desc" })
    .limit(limit)
    .lean()) as unknown as IProduct[];

  return products;
}
