"use client";
import React from "react";
import { Logo } from "@/components/icons";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/react";

export default function OnBoardingPage() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 gap-12">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full">
        <Logo className="w-64 h-64 p-5" height={100} width={250} />
        <br />
        <h2 className="mt-16 text-center text-4xl font-light leading-9 tracking-tight text-gray-900">
          Complete your profile to continue...
        </h2>
        <br />
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full max-w-md w-full">
        <form className="space-y-8 flex flex-col" method="POST">
          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="full_name"
            >
              Full Name
            </label>
            <div className="w-full">
              <Input
                required
                className="w-full"
                id="full_name"
                name="full_name"
                type="text"
                size="lg"
              />
              <br />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="avatar_url"
            >
              Avatar URL
            </label>
            <div className="w-full">
              <Input
                className="w-full"
                id="avatar_url"
                name="avatar_url"
                type="url"
                size="lg"
              />
              <br />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="website"
            >
              Website
            </label>
            <div className="w-full">
              <Input
                className="w-full"
                id="website"
                name="website"
                type="url"
                size="lg"
              />
              <br />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <div className="w-full">
              <Input
                className="w-full"
                id="phone"
                name="phone"
                type="tel"
                size="lg"
              />
              <br />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="year"
            >
              Year
            </label>
            <div className="w-full">
              <Input
                className="w-full"
                id="year"
                name="year"
                type="number"
                min="1"
                max="4"
                size="lg"
              />
              <br />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="projects_count"
            >
              Projects Count
            </label>
            <div className="w-full">
              <Input
                className="w-full"
                id="projects_count"
                name="projects_count"
                type="number"
                min="0"
                size="lg"
              />
              <br />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="bio"
            >
              Bio
            </label>
            <div className="w-full">
              <Textarea className="w-full" id="bio" name="bio" size="lg" />
              <br />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="roll_num"
            >
              Roll Number
            </label>
            <div className="w-full">
              <Input
                required
                className="w-full"
                id="roll_num"
                name="roll_num"
                type="text"
                size="lg"
              />
              <br />
            </div>
          </div>

          <div>
            <Button
              color="primary"
              className="w-full"
              variant="ghost"
              type="submit"
              size="lg"
            >
              Complete Profile
            </Button>
          </div>
        </form>
      </div>
      <br />
      <br />
    </div>
  );
}
