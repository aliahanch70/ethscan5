"use client";
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import { MenuIcon } from "lucide-react";
import { useSidebar } from "@/components/Sidebar/use-sidebar";
import { useState, useEffect } from "react";
import Image from "next/image";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  user, // This user data is passed from the server-side parent component.
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  user: { username: string } | null; // User object or null
}) => {
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!user);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          {/* Hamburger Toggle BTN */}
          {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              aria-hidden={!isSidebarOpen}
              aria-controls="sidebar"
            >
              <MenuIcon className="h-6 w-6 text-white" />
            </button>
          )}
          
          {/* Welcome User or Sign In */}
          {user ? (
            <span className="text-sm font-semibold">
              Welcome, {user.username}
            </span>
          ) : (
            <Link href="/auth/signin">
              <span className="text-sm font-semibold">Sign In</span>
            </Link>
          )}

          {/* Logo */}
          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/ETHSCANLOGO1 copy.png"}
              alt="Logo"
            />
          </Link>
        </div>

        {/* Notifications and Dark Mode */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Dark Mode Toggler */}
            <DarkModeSwitcher />
            {/* Notification Menu */}
            <DropdownNotification />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
