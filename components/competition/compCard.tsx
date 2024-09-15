import React from "react";
import { Card, CardFooter, Image, Chip } from "@nextui-org/react";

interface CompetitionCardProps {
  title: string;
  date: string;
  type: string;
  imageUrl: string;
}

export default function CompetitionCard({
  title,
  date,
  type,
  imageUrl,
}: CompetitionCardProps) {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-7"
    >
      <Image
        removeWrapper
        alt="Competition background"
        className="z-0 w-full h-full object-cover"
        src={imageUrl}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Chip
            size="sm"
            variant="flat"
            color={type.toLowerCase() === "hackathon" ? "warning" : "primary"}
            className="text-tiny text-white/90"
          >
            {type}
          </Chip>
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">{date}</p>
            <h4 className="text-white/90 font-medium text-xl">{title}</h4>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
