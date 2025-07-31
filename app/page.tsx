import { Connectors } from "@/components/connectores";
import { Footer } from "@/components/footer";
import { Herobackground } from "@/components/Herobackground";
import { NavWrapper } from "@/components/NavWrapper";
import { Ourmission } from "@/components/Ourmistion";
import { RatingsWithImage } from "@/components/Reatings";
import { WhyWeExist } from "@/components/WhyWeExist";


export default function Home() {
  return (
    <>
    <NavWrapper />
    <main className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
      <Herobackground />
      <WhyWeExist />
      <Ourmission />
      {/* <Connectors /> */}
      <RatingsWithImage />
      <Footer />
    </main>
    </>
  );
}

