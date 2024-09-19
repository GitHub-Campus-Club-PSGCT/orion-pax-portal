"use client";
import React from "react";
import { Image } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

import { Logo } from "@/components/icons";

export default function HomePage() {
  return (
    <main className="w-full bg-black text-white">
      {/* Hero Section */}
      <section className="w-full bg-black text-white py-20 px-4">
        <div className="min-h-9xl flex flex-col justify-between">
          <div className="flex justify-end pt-8">
            <Logo className="w-48 h-48" height={300} width={500} />
          </div>
          <div className="flex justify-between items-end">
            <h1
              className="font-bold mb-6 text-left"
              style={{ fontSize: "4rem" }}
            >
              Welcome to
              <br />
              <span style={{ fontSize: "9rem" }}>ByteNova</span>
            </h1>
            <div className="flex flex-col items-end">
              <h1 className="text-3xl">A GitHub Campus Club Venture.</h1>
            </div>
          </div>
        </div>
      </section>

      {/* No Setup Section */}
      <section className=" flex flex-row py-20 my-20 px-4">
        <div className=" flex flex-col max-w-9xl mx-auto justify-end">
          <h2 className="text-7xl font-bold mb-6">
            No Muss.
            <br />
            <span className="text-gray-500">
              No Fuss
              <br />
            </span>
            Just Excellence.
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <p className="text-xl text-gray-400 max-w-md">
              Get right into coding. Code, Create and be the best Innovator you
              can...
            </p>
          </div>
        </div>
        <div>
          <Image alt="Hero Image" height={500} src="/demo.png" width={1000} />
        </div>
      </section>

      {/* Private, Reliable, Secure Section */}
      <section className="py-20 px-4 text-center bg-white">
        <div className="mb-8">
          <svg
            className="w-16 h-16 mx-auto text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <h2 className="text-7xl font-bold text-black">
          Custom-Made,
          <br />
          reliable
          <br />
          and just awesome.
        </h2>
      </section>

      {/* Better Coding Challenges Section */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-7xl font-bold mb-6">Better coding challenges.</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Improve development capability with insightful and replicable coding
          challenges.
        </p>
      </section>
    </main>
  );
}
