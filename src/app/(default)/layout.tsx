"use client";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {FiMenu} from "react-icons/fi";
import Sidebar from "@/components/Shared/Sidebar";
import Image from "next/image";
export default function DefaultLayout({children}: {children: React.ReactNode}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {data: session} = useSession();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className='min-h-screen bg-gray-900'>
      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      {/* Main Content Area */}
      <div className='ml-0 lg:ml-64 min-h-screen flex flex-col'>
        {/* Header */}
        <header className='sticky top-0 z-10 bg-gray-800 shadow-sm'>
          <div className='flex items-center justify-between p-4'>
            <button
              aria-label='Open sidebar'
              className='text-gray-400 hover:bg-gray-700 p-2 rounded-md lg:hidden'
              onClick={toggleSidebar}
            >
              <FiMenu />
            </button>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='relative w-8 h-8 rounded-full bg-gray-700 overflow-hidden'>
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-300 text-sm font-medium'>
                      {(session?.user?.name || "U").charAt(0)}
                    </div>
                  )}
                </div>
                <span className='hidden md:inline text-gray-300'>
                  {session?.user?.name || "User"}
                </span>
              </div>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className='flex-1 p-4 md:p-6'>
          <div className='max-w-7xl mx-auto'>{children}</div>
        </main>
      </div>
    </div>
  );
}
