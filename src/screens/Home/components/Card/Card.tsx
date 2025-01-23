import { ArrowBigRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";

interface CardProps {
  image: StaticImageData;
  text: string;
  href: string;
  isWhite?: boolean;
}

export const Card: FC<CardProps> = ({ image, text, href, isWhite }) => (
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
      <Link href={href}>
        <ArrowBigRight
          className={`${isWhite} ? 'text-dark_brown' : 'text-white`}
        />
      </Link>
    </div>
  </div>
);
