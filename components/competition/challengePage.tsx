"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import NextLink from "next/link";

interface Round {
  name: string;
  description: string;
  duration: string;
}

interface Prize {
  place: string;
  reward: string;
}

interface CompetitionProps {
  title: string;
  date: string;
  time: string;
  description: string;
  imageUrl: string;
  rounds: Round[];
  prizes: Prize[];
  eligibility: string;
  registrationDeadline: string;
  contactEmail: string;
  buttonRedirect: string;
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
  rounds,
  prizes,
  eligibility,
  registrationDeadline,
  contactEmail,
  buttonRedirect,
}: CompetitionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
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
      <span key={interval} className="text-2xl font-bold mr-4">
        {timeLeft[interval as keyof TimeLeft]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 w-full">
      <Card className="bg-black mb-8 w-full">
        <CardBody className="p-0">
          <Image
            alt={title}
            className="w-full h-64 object-cover"
            src={imageUrl}
          />
        </CardBody>
      </Card>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <Button
          color="primary"
          size="lg"
          as={NextLink}
          variant="shadow"
          href={`/${buttonRedirect.replace(/^\//, "")}`}
        >
          Start Now
        </Button>
      </div>

      <div className="mb-8">
        <p className="text-lg md:text-xl mb-2">
          Date: {date} | Time: {time}
        </p>
        <div className="text-lg md:text-xl">
          Time left:{" "}
          {timerComponents.length ? (
            timerComponents
          ) : (
            <span>Competition has started!</span>
          )}
        </div>
      </div>

      <Card className="bg-black mb-8 w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Description</h2>
        </CardHeader>
        <CardBody>
          <p className="text-lg">{description}</p>
        </CardBody>
      </Card>

      <Card className="bg-black mb-8 w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Competition Rounds</h2>
        </CardHeader>
        <CardBody>
          {rounds.map((round, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold">{round.name}</h3>
              <p>{round.description}</p>
              <p className="text-sm text-gray-400">
                Duration: {round.duration}
              </p>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="bg-black mb-8 w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Prizes</h2>
        </CardHeader>
        <CardBody>
          {prizes.map((prize, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold">{prize.place}:</span> {prize.reward}
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="bg-black mb-8 w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Additional Information</h2>
        </CardHeader>
        <CardBody>
          <p>
            <strong>Eligibility:</strong> {eligibility}
          </p>
          <p>
            <strong>Registration Deadline:</strong> {registrationDeadline}
          </p>
          <p>
            <strong>Contact:</strong> {contactEmail}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
