import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",
});

export const outfit = localFont({
  src: "./Outfit-SemiBold.ttf",
  variable: "--font-outfit",
});

export const outfitTitle = localFont({
  src: "./Outfit-Bold.ttf",
  variable: "--font-outfittitle",
});
