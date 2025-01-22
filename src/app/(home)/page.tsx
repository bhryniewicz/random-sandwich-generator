import Image, { StaticImageData } from "next/image";
import HeroSection from "@/assets/hero-section-rm.png";
import Generate from "@/assets/generate-image.jpeg";
import Compose from "@/assets/compose-sandwich.jpeg";
import Geek from "@/assets/geek.jpeg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 font-luckiest h-[90vh] bg-[#f4dac9] p-2 md:px-32">
        <div className="flex flex-col justify-center items-center md:items-start gap-8">
          <h1 className="text-[30px] md:text-[50px] px-4 md:px-0">
            Unleash the Magic of Sandwich Creation:{" "}
            <span className="text-orange_primary">Your Perfect Bite</span>{" "}
            Awaits!
          </h1>
          <p className="text-lg font-base text-dark_brown px-4 md:px-0 text-justify">
            Discover the art of sandwich creation with a single click! Let us
            whip up a random, mouthwatering masterpiece tailored to surprise
            your taste buds. Your next favorite sandwich is just a tap away!
          </p>
          <Link href="/generate">
            <Button className="py-10 px-24 text-[30px]">Generate</Button>
          </Link>
        </div>
        <div className="md:flex hidden justify-end items-center">
          <Image
            src={HeroSection}
            width={700}
            height={700}
            alt="hero section image"
          />
        </div>
      </div>
      <div className="h-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-6 px-4 py-8 md:py-20 md:gap-10">
          <div className="md:col-span-2 md:col-start-2 flex flex-col gap-6 pb-6">
            <h1 className="font-luckiest text-[28px] md:text-[40px] text-orange_primary h-[32px]">
              Check all Our Tools!
            </h1>
            <p>
              Discover the ultimate sandwich experience with our tools! Use
              Generate for instant, random sandwich ideas, or Compose to build
              your custom creation from scratch. For food geeks, dive into
              sandwich trivia, history, and pro tips. There’s something for
              everyone—start exploring now!
            </p>
            <Card image={Generate} text="Generate something special" />
          </div>
          <div className="col-span-2 flex flex-col gap-6">
            <Card image={Compose} text="Compose on your own" />
            <Card image={Geek} text="For computer geeks" />
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] flex flex-col justify-center items-center bg-orange_primary text-white p-4 py-8">
        <h1 className="text-[50px] md:text-[70px] font-luckiest text-center">
          Sharing is caring!
        </h1>
        <p className="text-center px-4 md:px-32 text-lg">
          With our app, your sandwich creations don’t just stop at your plate!
          After using one of our tools, you can save your favorite sandwiches to
          your personal list for easy access anytime. But that’s not all—share
          your sandwich masterpieces with the community, invite others to rate
          your creations, and even receive comments with feedback or praise.
          It’s not just about making sandwiches; it’s about connecting and
          sharing the love of great food!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mt-8 md:mt-16">
          <div className="md:col-span-3 md:col-start-3">
            <Card image={Compose} text="Check what is on your list" isWhite />
          </div>
          <div className="md:col-span-3 md:col-start-6">
            <Card image={Compose} text="Share / rate" isWhite />
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({
  image,
  text,
  isWhite,
}: {
  image: StaticImageData;
  text: string;
  isWhite?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col w-full border rounded-lg overflow-hidden shadow-lg`}
    >
      <Image
        src={image}
        alt="image for card"
        className="w-full h-[300px] md:h-[350px]"
        width={400}
        height={400}
      />
      <div className="flex items-center justify-between p-4 border-t border-gray-300">
        <h1 className="font-extrabold text-lg">{text}</h1>
        <ArrowBigRight
          className={`${isWhite} ? 'text-dark_brown' : 'text-white`}
        />
      </div>
    </div>
  );
};
