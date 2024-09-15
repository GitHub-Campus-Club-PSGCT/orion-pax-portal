import {
  Fira_Code as FontMono,
  Inter as FontSans,
  League_Spartan as FontLeague,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontleague = FontLeague({
  subsets: ["latin"],
  variable: "--font-mono",
});
