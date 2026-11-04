import { Inter, Newsreader } from "next/font/google";

// Newsreader stands in for the editorial serif (headlines, pull quotes only).
// Inter carries everything functional: body copy, UI, labels.
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const fontVariables = `${serif.variable} ${sans.variable}`;
