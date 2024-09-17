"use client";

import { useState, useEffect } from "react";
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
import { useTheme as useNextTheme } from "next-themes";
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

interface Achievement {
  id: string;
  name: string;
  avatar: string;
}

interface Certificate {
  id: string;
  name: string;
  date: string;
  icon: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
}

interface StudentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  major: string;
  year: string;
  projects: number;
  bio: string;
  website: string;
  username: string;
  achievements: Achievement[];
  certificates: Certificate[];
  events: Event[];
}

interface EditableLinks {
  github: string;
  email: string;
  linkedin: string;
  leetcode: string;
  medium: string;
  instagram: string;
  snapchat: string;
}

export default function StudentAccount() {
  const supabase = createClient();
  const router = useRouter();
  const { setTheme } = useNextTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editedBio, setEditedBio] = useState("");
  const [editedLinks, setEditedLinks] = useState<EditableLinks>({
    github: "",
    email: "",
    linkedin: "",
    leetcode: "",
    medium: "",
    instagram: "",
    snapchat: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // Fetch profile data
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", user.email)
            .single();

          if (profileError) throw profileError;

          // Fetch achievements
          const { data: achievementsData, error: achievementsError } =
            await supabase
              .from("achievements")
              .select("*")
              .eq("profile_id", user.id);

          if (achievementsError) throw achievementsError;

          // Fetch certificates
          const { data: certificatesData, error: certificatesError } =
            await supabase
              .from("certificates")
              .select("*")
              .eq("profile_id", user.id);

          if (certificatesError) throw certificatesError;

          // Fetch events
          const { data: eventsData, error: eventsError } = await supabase
            .from("events")
            .select("*")
            .eq("profile_id", user.id);

          if (eventsError) throw eventsError;

          // Combine all data
          const combinedData: StudentData = {
            ...profileData,
            achievements: achievementsData,
            certificates: certificatesData,
            events: eventsData,
          };

          setStudentData(combinedData);
          setEditedBio(combinedData.bio || "");
          setEditedLinks({
            github: combinedData.website || "",
            email: combinedData.username || "",
            linkedin: "",
            leetcode: "",
            medium: "",
            instagram: "",
            snapchat: "",
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

    fetchProfile();
  }, [router, supabase]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
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
      alert("Bio saved successfully!");
    } catch (error) {
      console.error("Failed to save bio:", error);
      alert("Failed to save bio");
    }
  };

  const saveLinks = async () => {
    if (!studentData) return;
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          website: editedLinks.github,
          username: editedLinks.email,
        })
        .eq("id", studentData.id);

      if (error) throw error;

      setStudentData((prev) =>
        prev
          ? {
              ...prev,
              website: editedLinks.github,
              username: editedLinks.email,
            }
          : null
      );
      alert("Links saved successfully!");
    } catch (error) {
      console.error("Failed to save links:", error);
      alert("Failed to save links");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studentData) {
    return <div>No profile data found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studentData) {
    return <div>No profile data found</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-4 max-w-4xl">
      <Button onClick={signOut}>Sign Out</Button>

      <Card className="p-4">
        <CardBody>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Avatar className="w-24 h-24" src={studentData.profileImage} />
            <div className="flex-grow">
              <h2 className="text-2xl font-bold">{studentData.name}</h2>
              <p className="text-default-500">{studentData.major}</p>
              <div className="flex gap-2 mt-2">
                <Badge color="primary" variant="flat">
                  {studentData.year}
                </Badge>
                <Badge color="secondary" variant="flat">
                  Projects: {studentData.projects}
                </Badge>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-xl font-bold">Achievements</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            {studentData.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-2">
                <Avatar
                  className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white"
                  icon={<span className="text-2xl">{achievement.avatar}</span>}
                />
                <span>{achievement.name}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-xl font-bold">Certificates</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {studentData.certificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cert.icon}</span>
                  <span>{cert.name}</span>
                </div>
                <span className="text-sm text-default-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-xl font-bold">Upcoming Events</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {studentData.events.map((event) => (
              <div key={event.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{event.name}</span>
                </div>
                <div className="text-sm text-default-500">
                  {event.date} | {event.time}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <p className="text-2xl font-extralight">About you...</p>
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
  );
}
