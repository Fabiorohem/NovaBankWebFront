"use client"

import MenuNavigation from "@/components/menuNavigation";
import Navbar from "@/components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full min-h-screen bg-[#151515]">
      <MenuNavigation />
      <main className="flex flex-col w-full min-h-screen">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
