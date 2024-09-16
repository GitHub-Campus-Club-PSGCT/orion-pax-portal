"use client";
import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/react";
import { redirect } from "next/navigation";

import { Logo } from "@/components/icons";
import { createClient } from "@/utils/supabase/server";

// TODO - yet to test the supabase client and the completeProfile function

export default function OnBoardingPage() {
  async function completeProfile(formData: FormData) {
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const profile = {
      full_name: formData.get("full_name") as string,
      avatar_url: formData.get("avatar_url") as string,
      website: formData.get("website") as string,
      phone: formData.get("phone") as string,
      year: formData.get("year") as string,
      projects_count: formData.get("projects_count") as string,
      bio: formData.get("bio") as string,
      roll_num: formData.get("roll_num") as string,
      email: supabase.auth.getUser()?.then((user) => user.data.user?.email),
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(profile)
      .select();

    if (error) {
      redirect("/error");
    }

    redirect("/account");
  }

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
                size="lg"
                type="text"
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
                size="lg"
                type="url"
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
                size="lg"
                type="url"
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
                size="lg"
                type="tel"
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
                max="4"
                min="1"
                name="year"
                size="lg"
                type="number"
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
                min="0"
                name="projects_count"
                size="lg"
                type="number"
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
                size="lg"
                type="text"
              />
              <br />
            </div>
          </div>

          <div>
            <Button
              className="w-full"
              color="primary"
              size="lg"
              type="submit"
              variant="ghost"
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
