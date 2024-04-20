"use client"
import { Canvas } from "./components/canvas/Canvas";
import { FrameSelector } from "./pages/frameSelector";

export default function Home() {
  return (
    <main style={{maxWidth: '1200px', height: '100%', margin: '0 auto', backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
      <FrameSelector />
    </main>
  );
}
