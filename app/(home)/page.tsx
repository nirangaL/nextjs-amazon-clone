import { Button } from "@/components/ui/button";
import HomeCard, { CardItem } from "@/components/ui/shared/home/home-card";
import { HomeCarousel } from "@/components/ui/shared/home/home-carousel";
import {
  getAllCategories,
  getProductsForCard,
} from "@/lib/actions/product.action";
import data from "@/lib/data";
import { toSlug } from "@/lib/utils";
import Image from "next/image";

export default async function Page() {
  const categories = (await getAllCategories()).slice(0, 4);
  const newArrivals = await getProductsForCard({
    tag: "new-arrival",
    limit: 4,
  });
  const features = await getProductsForCard({ tag: "featured", limit: 4 });
  const bestSeller = await getProductsForCard({ tag: "best-seller", limit: 4 });
  console.log(categories);

  const cards: CardItem[] = [
    {
      title: "Categories to explore",
      link: {
        text: "See more",
        href: "/search?tag=category",
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: "Explore New Arrivals",
      link: {
        text: "view more",
        href: "/search?tag=new-arrivals",
      },
      items: newArrivals,
    },
    {
      title: "Discover Best Seller",
      items: bestSeller,
      link: {
        text: "View All",
        href: "/search?tag=best-seller",
      },
    },
    {
      title: "Featured Products",
      items: features,
      link: {
        text: "Shop Now",
        href: "/search?tag=new-arrival",
      },
    },
  ];

  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className="md:p-4 md:space-y-4 pg-border">
        <HomeCard cards={cards} />
      </div>
    </>
  );
}
