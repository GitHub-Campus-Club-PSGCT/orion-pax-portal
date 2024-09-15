"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Badge,
  Tabs,
  Tab,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

import {
  InstagramLogo,
  MediumLogo,
  LeetCodeLogo,
  LinkedInLogo,
  GithubIcon,
  MailLogo,
  SnapChatLogo,
} from "@/components/icons";

export default function StudentAccount() {
  const { setTheme } = useNextTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // This would typically come from a database or API
  const [studentData, setStudentData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    profileImage: "/placeholder.svg?height=200&width=200",
    major: "Computer Science",
    year: "3rd Year",
    projects: 10,
    achievements: [
      { name: "Leadership", avatar: "👑" },
      { name: "Community Service", avatar: "🤝" },
      { name: "Academic Excellence", avatar: "🎓" },
      { name: "Innovation", avatar: "💡" },
    ],
    certificates: [
      { name: "Web Development Fundamentals", date: "2023-05-15", icon: "🌐" },
      { name: "Public Speaking Workshop", date: "2023-07-22", icon: "🎤" },
      { name: "Data Science Bootcamp", date: "2023-09-10", icon: "📊" },
    ],
    upcomingEvents: [
      { name: "Career Fair", date: "2023-12-01", time: "10:00 AM - 4:00 PM" },
      { name: "Hackathon", date: "2023-12-15", time: "9:00 AM - 9:00 PM" },
    ],
    bio: "As a passionate Computer Science student, I'm dedicated to leveraging technology to solve real-world problems. My journey in the world of coding began with a simple 'Hello, World!' program, and since then, I've been on an exciting adventure of continuous learning and growth.",
    links: {
      github: "https://github.com/alexjohnson",
      email: "alex.johnson@example.com",
      linkedin: "https://linkedin.com/in/alexjohnson",
      leetcode: "https://leetcode.com/alexjohnson",
      medium: "https://medium.com/@alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
      snapchat: "alexjohnson",
    },
  });

  const [editedBio, setEditedBio] = useState(studentData.bio);
  const [editedLinks, setEditedLinks] = useState(studentData.links);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
  };

  const saveBio = () => {
    setStudentData((prev) => ({ ...prev, bio: editedBio }));
    alert("Bio saved successfully!");
  };

  const saveLinks = () => {
    setStudentData((prev) => ({ ...prev, links: editedLinks }));
    alert("Links saved successfully!");
  };

  return (
    <div className="container mx-auto p-4 space-y-4 max-w-4xl">
      <Card className="p-4">
        <CardBody>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Avatar src={studentData.profileImage} className="w-24 h-24" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <p>
              <strong>Email:</strong> {studentData.email}
            </p>
            <p>
              <strong>Phone:</strong> {studentData.phone}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-xl font-bold">Achievements</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            {studentData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <Avatar
                  icon={<span className="text-2xl">{achievement.avatar}</span>}
                  className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white"
                />
                <span>{achievement.name}</span>
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
                className="mb-4"
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
                      {/* Placeholder for SVG */}
                      {platform === "instagram" && <InstagramLogo />}
                      {platform === "medium" && <MediumLogo />}
                      {platform === "leetcode" && <LeetCodeLogo />}
                      {platform === "linkedin" && <LinkedInLogo />}
                      {platform === "github" && <GithubIcon />}
                      {platform === "email" && <MailLogo />}
                      {platform === "snapchat" && <SnapChatLogo />}
                      <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
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

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-xl font-bold">Certificates</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {studentData.certificates.map((cert, index) => (
              <div key={index} className="flex items-center justify-between">
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
            {studentData.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between">
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
    </div>
  );
}
