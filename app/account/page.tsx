"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Tab,
  Tabs,
  Input,
  Badge,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserButton, UserProfile } from "@clerk/nextjs";

import {
  InstagramLogo,
  MediumLogo,
  GithubIcon,
  MailLogo,
  LinkedInLogo,
  LeetCodeLogo,
  SnapChatLogo,
} from "@/components/icons";
import { createClient } from "@/utils/supabase/client";

interface StudentData {
  id: string;
  full_name: string;
  roll_no: string;
  email: string;
  phone: string;
  avatar_url: string;
  major: string;
  year: string;
  projects_count: number;
  bio: string;
  roll_num: string;
  achievements: any[];
  certificates: any[];
  events: any[];
  links: any[];
}

export default function StudentAccount() {
  const supabase = createClient();
  const router = useRouter();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editedBio, setEditedBio] = useState("");
  const [editedLinks, setEditedLinks] = useState({
    github: "",
    email: "",
    linkedin: "",
    leetcode: "",
    medium: "",
    instagram: "",
    snapchat: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch profile data from Supabase
        // ... (rest of the fetchProfile function remains unchanged)
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  const saveBio = async () => {
    // ... (saveBio function remains unchanged)
  };

  const saveLinks = async () => {
    // ... (saveLinks function remains unchanged)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studentData) {
    return <div>No profile data found</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-4 max-w-4xl">
      <div className="w-full flex items-end justify-end">
        <UserButton afterSignOutUrl="/login" />
      </div>
      <Card className="p-4">
        <CardBody>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Avatar className="w-24 h-24" src={studentData.avatar_url} />
            <div className="flex-grow">
              <h2 className="text-2xl font-bold">{studentData.full_name}</h2>
              <p className="text-lg font-light">
                Roll Number: {studentData.roll_num || "N/A"}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge color="primary" variant="flat">
                  Year of Study: {studentData.year || "N/A"}
                </Badge>
                <Badge color="secondary" variant="flat">
                  Projects: {studentData.projects_count || "N/A"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <p>
              <strong>Email:</strong> {studentData.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {studentData.phone || "N/A"}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-xl font-bold">User Profile</h3>
        </CardHeader>
        <CardBody>
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full max-w-full",
                card: "w-full max-w-full shadow-none",
                navbar: "hidden",
                pageScrollBox: "p-0",
                profileSection__security: "",
                profileSection__account: "",
                // New appearance props for MFA dropdown
                menuList__mfa: "bg-default-100 dark:bg-default-50",
                menuItem__mfa:
                  "text-default-700 dark:text-default-300 hover:bg-default-200 dark:hover:bg-default-100",
                // New appearance props for connected accounts dropdown
                menuList__connectedAccounts:
                  "bg-default-100 dark:bg-default-50",
                menuItem__connectedAccounts:
                  "text-default-700 dark:text-default-300 hover:bg-default-200 dark:hover:bg-default-100",
                menuList__web3Wallets: "bg-default-100 dark:bg-default-50",
                menuItem__web3Wallets:
                  "text-default-700 dark:text-default-300 hover:bg-default-200 dark:hover:bg-default-100",
              },
            }}
          />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <CardHeader>
            <h3 className="text-xl font-bold">Achievements</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {studentData.achievements.length > 0 ? (
                studentData.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <Avatar
                      className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 text-white"
                      src={achievement.imageURL}
                    />
                    <span>{achievement.name}</span>
                  </div>
                ))
              ) : (
                <div>No achievements found</div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <h3 className="text-xl font-bold">About you...</h3>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="Student Information">
              <Tab key="bio" title="Bio">
                <Textarea
                  className="mb-4 p-5"
                  maxRows={5}
                  minRows={3}
                  placeholder="Enter your bio here..."
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                />
                <Button className="mt-4" color="primary" onClick={saveBio}>
                  Save Bio
                </Button>
              </Tab>
              <Tab key="links" title="Links">
                <div className="space-y-4">
                  {Object.entries(editedLinks).map(([platform, url]) => (
                    <div key={platform} className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {platform === "instagram" && <InstagramLogo />}
                        {platform === "medium" && <MediumLogo />}
                        {platform === "leetcode" && <LeetCodeLogo />}
                        {platform === "linkedin" && <LinkedInLogo />}
                        {platform === "github" && <GithubIcon />}
                        {platform === "email" && <MailLogo />}
                        {platform === "snapchat" && <SnapChatLogo />}
                      </div>
                      <Input
                        fullWidth
                        label={
                          platform.charAt(0).toUpperCase() + platform.slice(1)
                        }
                        placeholder={`Enter your ${platform} link`}
                        value={url}
                        onChange={(e) =>
                          setEditedLinks((prev) => ({
                            ...prev,
                            [platform]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
                  <Button color="primary" onClick={saveLinks}>
                    Save Links
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-xl font-bold">Certificates</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {studentData.certificates.length > 0 ? (
              studentData.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cert.icon}</span>
                    <span>{cert.name}</span>
                  </div>
                  <span className="text-sm text-default-500">
                    {cert.date_created}
                  </span>
                </div>
              ))
            ) : (
              <div>No certificates found</div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-xl font-bold">Upcoming Events</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {studentData.events.length > 0 ? (
              studentData.events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{event.name}</span>
                  </div>
                  <div className="text-sm text-default-500">
                    {event.date} | {event.time}
                  </div>
                </div>
              ))
            ) : (
              <div>No upcoming events</div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
