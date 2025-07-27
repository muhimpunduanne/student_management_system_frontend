import { Connectors } from "@/components/connectores";
import { Footer } from "@/components/footer";
import { Herobackground } from "@/components/Herobackground";
import { Ourmission } from "@/components/Ourmistion";
import { RatingsWithImage } from "@/components/Reatings";
// import { RatingsWithImage } from "@/components/RatingsWithImage";
import { WhyWeExist } from "@/components/WhyWeExist";


export default function Home() {
  return (
    <>
    <Herobackground />
    <WhyWeExist />
    <Ourmission />
    <Connectors />
    <RatingsWithImage />
    <Footer/>
    </>
  );
}
