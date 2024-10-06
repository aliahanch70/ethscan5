"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header";

export default function RootContent({
  children,
  user, // دریافت اطلاعات کاربر از سمت سرور
}: {
  children: React.ReactNode;
  user: { username: string } | null; // نوع اطلاعات کاربر (username یا null)
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* بخش Sidebar */}
          <Sidebar />

          {/* ناحیه اصلی محتوا */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* بخش Header */}
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              user={user} // ارسال اطلاعات کاربر به Header
            />

            {/* محتوای اصلی */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
