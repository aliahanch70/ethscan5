import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LineChartIcon,
  MenuIcon,
  ShoppingBag,
  AreaChart,
  Calendar,
  User2Icon,
  LockIcon,
  BarChart2,
  Component,
  Settings,
  Table2Icon,
  FormInputIcon,
  HomeIcon,
  LampIcon,
  SignalHigh,
  AlertCircle,
  SwissFranc,
  MousePointerClick,
  Bitcoin
} from "lucide-react";
import { useSidebar } from "./use-sidebar";
import { cn } from "@/app/libs/utlis";
import MenuItem from "./MenuItem";
import LinkItem from "./LinkItem";
import ExpandMenu from "./ExpandMenu";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar((state) => state);
  const [isMobile, setIsMobile] = useState(false);

  // Define the type for the sidebarRef
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        if (isSidebarOpen && isMobile) {
          toggleSidebar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isMobile, toggleSidebar]);

  useEffect(() => {
    // Hide sidebar on page load for mobile devices
    if (isMobile) {
      toggleSidebar();
    }
  }, [isMobile, toggleSidebar]);

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 z-50 p-3 bg-black text-white rounded-full lg:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      )}

      {isSidebarOpen && isMobile && (
        <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={toggleSidebar}></div>
      )}

      <aside
        ref={sidebarRef}
        className={cn(
          `fixed left-0 top-0 z-50 flex h-screen w-20 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0`,
          {
            "translate-x-0": isSidebarOpen,
            "-translate-x-full": !isSidebarOpen && isMobile,
            "w-70": isSidebarOpen,
          }
        )}
      >
        <div className="relative flex w-full items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link className="flex items-center" href="/">
            <Image
              className="h-6 w-6 rounded-md"
              width={400}
              height={400}
              src={"/images/logo/ETHSCANLOGO1 copy.png"}
              alt="Logo"
            />
            {isSidebarOpen && (
              <h1 className="ml-2 text-xl font-semibold text-white">
                ETH Scan
              </h1>
            )}
          </Link>
          {isSidebarOpen && (
            <MenuIcon onClick={toggleSidebar} className="h-6 w-6 cursor-pointer" />
          )}
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="px-4 py-4 lg:px-6">
            <div>
              <ul
                className={cn("mb-6 flex flex-col gap-1.5", {
                  "items-center justify-center": !isSidebarOpen,
                })}
              >
                <li>
                  <LinkItem
                    icon={<Bitcoin className="h-6 w-6"/>}
                    title="ETH Gas Fee"
                    href="/"
                    onClick={handleLinkClick}
                  />
                </li>

                <li>
                  <LinkItem
                    title="Crypto Price"
                    href="/price"
                    icon={<Calendar className="h-6 w-6" />}
                    onClick={handleLinkClick}
                  ></LinkItem>
                </li>

                <li>
                  <LinkItem
                    title="Settings"
                    href="/settings"
                    icon={<Settings className="h-6 w-6" />}
                    onClick={handleLinkClick}
                  ></LinkItem>
                </li>

                <li>
                  <LinkItem
                    title="Profile"
                    href="/profile"
                    icon={<User2Icon className="h-6 w-6" />}
                    onClick={handleLinkClick}
                  ></LinkItem>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
