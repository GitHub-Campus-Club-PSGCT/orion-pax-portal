"use client";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

interface CompetitionProps {
  title: string;
  date: string;
  time: string;
  description: string;
  imageUrl: string;
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export default function CompetitionPage({
  title,
  date,
  time,
  description,
  imageUrl,
}: CompetitionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    //TODO- Add the function that fetch the competition details from Supabase...

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(`${date} ${time}`) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof TimeLeft]) {
      return null;
    }

    return (
      <span className="text-2xl font-bold mr-4" key={interval}>
        {timeLeft[interval as keyof TimeLeft]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <Card className="bg-gray-800 mb-8">
        <CardBody className="p-0">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-64 object-cover"
          />
        </CardBody>
      </Card>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <Button color="primary" size="lg">
          Start Competition
        </Button>
      </div>

      <div className="mb-8">
        <p className="text-xl mb-2">
          Date: {date} | Time: {time}
        </p>
        <div className="text-xl">
          Time left:{" "}
          {timerComponents.length ? (
            timerComponents
          ) : (
            <span>Competition has started!</span>
          )}
        </div>
      </div>

      <Card className="bg-gray-800 mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold">Description</h2>
        </CardHeader>
        <CardBody>
          <p className="text-lg">{description}</p>
        </CardBody>
      </Card>
    </div>
  );
}
