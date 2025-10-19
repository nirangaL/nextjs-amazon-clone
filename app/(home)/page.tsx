import { Button } from "@/components/ui/button";
import { HomeCarousel } from "@/components/ui/shared/home/home-carousel";
import data from "@/lib/data";
import Image from "next/image";

export default function Page() {
  return <HomeCarousel items={data.carousels} />;
}
