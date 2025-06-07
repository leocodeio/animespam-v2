import { CommonHero } from "@/components/common/CommonHero";
import { User } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import PricingSectionCards from "~/components/common/pricing/PricingComponent";

// animespam components
import Slider from "~/components/animespam/components/Slider";
import Footer from "~/components/animespam/components/Footer";
import Header from "~/components/animespam/components/Header";
import Hero from "~/components/animespam/components/Hero";
import ButtonGradient from "~/components/animespam/assets/svg/ButtonGradient";

import { loader as HomeLoader } from "~/routes/loader+/feature+/home+/home.loader";
import { CommonHeader } from "~/components/common/CommonHeader";
export const loader = HomeLoader;

export default function HomeIndex() {
  const user = useLoaderData<typeof HomeLoader>() as User;
  return (
    <>
      <Slider />
      <Hero />
      {user.subscriptionId === null && <PricingSectionCards />}
      <Footer />
      <ButtonGradient />
    </>
  );
}
