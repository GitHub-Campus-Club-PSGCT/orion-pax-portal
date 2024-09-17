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
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        const { data: achievementsData } = await supabase
          .from("achievements")
          .select("*");
        const { data: certificatesData } = await supabase
          .from("certificates")
          .select("*");
        const { data: eventsData } = await supabase
          .from("events_assigned")
          .select("*, event:events(*)")
          .eq("student_username", user.id);
        const { data: linksData } = await supabase
          .from("links")
          .select("*")
          .eq("student_username", user.id);

        const combinedData: StudentData = {
          ...profileData,
          achievements: achievementsData || [],
          certificates: certificatesData || [],
          events: eventsData?.map((ea) => ea.event) || [],
          links: linksData || [],
        };

        setStudentData(combinedData);
        setEditedBio(combinedData.bio || "");
        setEditedLinks({
          github:
            combinedData.links.find((l) => l.platform === "github")?.url || "",
          email:
            combinedData.links.find((l) => l.platform === "email")?.url || "",
          linkedin:
            combinedData.links.find((l) => l.platform === "linkedin")?.url ||
            "",
          leetcode:
            combinedData.links.find((l) => l.platform === "leetcode")?.url ||
            "",
          medium:
            combinedData.links.find((l) => l.platform === "medium")?.url || "",
          instagram:
            combinedData.links.find((l) => l.platform === "instagram")?.url ||
            "",
          snapchat:
            combinedData.links.find((l) => l.platform === "snapchat")?.url ||
            "",
        });
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const saveBio = async () => {
    if (!studentData) return;
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ bio: editedBio })
        .eq("id", studentData.id);

      if (error) throw error;
      setStudentData((prev) => (prev ? { ...prev, bio: editedBio } : null));
    } catch (error) {
      console.error("Failed to save bio:", error);
    }
  };

  const saveLinks = async () => {
    if (!studentData) return;
    try {
      const { error } = await supabase.from("links").upsert(
        Object.entries(editedLinks).map(([platform, url]) => ({
          student_username: studentData.id,
          platform,
          url,
        }))
      );

      if (error) throw error;
      setStudentData((prev) =>
        prev
          ? {
              ...prev,
              links: Object.entries(editedLinks).map(([platform, url]) => ({
                platform,
                url,
              })),
            }
          : null
      );
    } catch (error) {
      console.error("Failed to save links:", error);
    }
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
        <Button onClick={signOut} color="danger" variant="ghost">
          Sign Out
        </Button>
      </div>
      <Card className="p-4">
        <CardBody>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Avatar src={studentData.avatar_url} className="w-24 h-24" />
            <div className="flex-grow">
              <h2 className="text-2xl font-bold">{studentData.full_name}</h2>
              <p className="text-lg font-light">
                Roll Number: {studentData.roll_num || "N/A"}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge color="primary" variant="flat">
                  Year of Study: {studentData.year || "N/A"}
                </Badge>
                <br />
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
                      src={achievement.imageURL}
                      className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 text-white"
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
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  minRows={3}
                  maxRows={5}
                  placeholder="Enter your bio here..."
                  className="mb-4 p-5"
                />
                <Button color="primary" onClick={saveBio} className="mt-4">
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
                        value={url}
                        onChange={(e) =>
                          setEditedLinks((prev) => ({
                            ...prev,
                            [platform]: e.target.value,
                          }))
                        }
                        placeholder={`Enter your ${platform} link`}
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
