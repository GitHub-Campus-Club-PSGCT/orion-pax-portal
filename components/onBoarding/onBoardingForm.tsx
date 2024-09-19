"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/react";

import { Logo } from "@/components/icons";
import { completeProfile } from "@/app/onboarding/actions";

export default function OnboardingForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      await completeProfile(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError(
        "An error occurred while submitting the form. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 gap-12">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full">
        <Logo className="w-64 h-64 p-5" height={100} width={250} />
        <br />
        <h2 className="mt-16 text-center text-4xl font-light leading-9 tracking-tight text-gray-200">
          Complete your profile to continue...
        </h2>
        <br />
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full max-w-md w-full">
        <form
          autoComplete="off"
          className="space-y-8 flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-200 mb-2"
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
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-200 mb-2"
              htmlFor="avatar_url"
            >
              Avatar URL (Optional)
            </label>
            <div className="w-full">
              <Input
                className="w-full"
                id="avatar_url"
                name="avatar_url"
                size="lg"
                type="url"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-200 mb-2"
              htmlFor="website"
            >
              Website (Optional)
            </label>
            <div className="w-full">
              <Input
                className="w-full"
                id="website"
                name="website"
                size="lg"
                type="url"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-200 mb-2"
              htmlFor="phone"
            >
              Phone (Optional)
            </label>
            <div className="w-full">
              <Input
                className="w-full"
                id="phone"
                name="phone"
                size="lg"
                type="tel"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-200 mb-2"
              htmlFor="year"
            >
              Year
            </label>
            <div className="w-full">
              <Input
                required
                className="w-full"
                id="year"
                max="4"
                min="1"
                name="year"
                size="lg"
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-200 mb-2"
              htmlFor="projects_count"
            >
              Projects Count
            </label>
            <div className="w-full">
              <Input
                required
                className="w-full"
                id="projects_count"
                min="0"
                name="projects_count"
                size="lg"
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-200 mb-2"
              htmlFor="bio"
            >
              Bio (Optional)
            </label>
            <div className="w-full">
              <Textarea className="w-full" id="bio" name="bio" size="lg" />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-200 mb-2"
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
            </div>
          </div>

          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          <Button
            className="w-full"
            color="primary"
            disabled={isSubmitting}
            size="lg"
            type="submit"
            variant="ghost"
          >
            {isSubmitting ? "Completing Profile..." : "Complete Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}
