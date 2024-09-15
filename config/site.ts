export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ByteNova",
  description: "Empowering the next generation of coders and hackers.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Competition",
      href: "/competition",
    },
    {
      label: "Resources",
      href: "/resources",
    },
    {
      label: "Forum",
      href: "/forum",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Notifications",
      href: "/notifications",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/github-campus-club-psgct/",
    discord: "https://discord.gg/7XNU3X4Wge",
    instagram: "https://www.instagram.com/githubcampusclub.psgtech/",
    linkedin: "https://www.linkedin.com/company/100541745/",
  },
  adminNavItems: [
    {
      label: "Admin Dashboard",
      href: "/admin",
    },
    {
      label: "User Management",
      href: "/admin/users",
    },
    {
      label: "Competition Management",
      href: "/admin/competition",
    },
    {
      label: "Score Management",
      href: "/admin/scores",
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
    },
  ],
};
