import { FC } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Sandwich from "@/assets/sandwich.png";

interface LoaderProps {
  isBackground?: boolean;
}
export const Loader: FC<LoaderProps> = ({ isBackground = false }) => {
  if (isBackground) {
    return (
      <Card className="flex items-center justify-center w-[600px] h-[400px] opacity-90">
        <Image
          src={Sandwich}
          alt="sandwich loading photo"
          width={200}
          height={200}
          className="animate-pulse"
        />
      </Card>
    );
  }

  return (
    <Image
      src={Sandwich}
      alt="sandwich loading photo"
      width={200}
      height={200}
      className="animate-pulse"
    />
  );
};
