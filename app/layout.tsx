import type { Metadata } from "next";
import "./globals.css";
import Scene from "./components/canvas/Scene";
import ChronoTerminal from "./components/ui/ChronoTerminal";
import AnywhereDoor from "./components/ui/AnywhereDoor";
import CustomCursor from "./components/ui/CustomCursor";
import IdleEasterEgg from "./components/ui/IdleEasterEgg";
import VideoBackground from "./components/ui/VideoBackground";
import TransitionOverlay from "./components/ui/TransitionOverlay";

export const metadata: Metadata = {
  title: "Arcoistry | artismchemcoder",
  description: "Doraemon-themed interactive personal portfolio for Arcoistry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative min-h-screen text-white overflow-x-hidden">
        {/* Route-aware video background (client component) */}
        <VideoBackground />
        <TransitionOverlay />

        <CustomCursor />
        <AnywhereDoor />
        <Scene />
        <ChronoTerminal />
        <IdleEasterEgg />

        <main className="relative z-10 w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
