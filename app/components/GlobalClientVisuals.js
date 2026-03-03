"use client";

import dynamic from "next/dynamic";

const PreloaderIntro = dynamic(() => import("./PreloaderIntro"), { ssr: false });
const AmbientCinematicLayer = dynamic(() => import("./AmbientCinematicLayer"), { ssr: false });
const ScrollChoreography = dynamic(() => import("./ScrollChoreography"), { ssr: false });

export default function GlobalClientVisuals() {
  return (
    <>
      <PreloaderIntro />
      <AmbientCinematicLayer />
      <ScrollChoreography />
    </>
  );
}
