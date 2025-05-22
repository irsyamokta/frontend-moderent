import React from "react";
import { Link } from "react-router";

import LogoWhite from "/src/assets/logo/logo-white.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative px-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-primary dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <div className="flex flex-col items-center max-w-sm">
              <Link to="/" className="block mb-4">
                <img
                  width={600}
                  height={48}
                  src={LogoWhite}
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
