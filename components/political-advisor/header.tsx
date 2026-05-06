"use client";

import Image from "next/image";
import { ProfileMenu } from "@/components/profile-menu";

export function PoliticalAdvisorHeader() {
  return (
    <header className="relative z-10 border-b border-dark-border/60 bg-dark-card/40 backdrop-blur-md">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden glow-blue relative">
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-light-reflection rounded-lg pointer-events-none"></div>
              <Image
                src="/fogreport.png"
                alt="FogReport Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain relative z-0"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-dark-text">
                Fog<span className="text-flame">Report</span>
              </h1>
              <p className="text-xs sm:text-sm text-dark-muted">
                Military Intelligence Briefing Platform
              </p>
            </div>
          </div>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
