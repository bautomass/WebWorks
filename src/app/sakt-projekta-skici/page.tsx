// app/sakt-projekta-skici/page.tsx
"use client";

import React from "react";
import Header from "@/components/Header";
import SketchBuilder from "@/components/SketchBuilder";

export default function SketchToolPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <SketchBuilder />
      </main>
    </div>
  );
}
