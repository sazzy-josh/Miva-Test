"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {
  FiX,
  FiUser,
  FiBook,
  FiHome,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import Image from "next/image";
import {signOut} from "next-auth/react";
// import {signOut} from "@/lib/auth";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({href, icon, label, isActive, onClick}: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "font-semibold bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          : "font-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      <div className='mr-3 text-xl'>{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({isSidebarOpen, closeSidebar}: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    {href: "/dashboard", icon: <FiHome />, label: "Dashboard"},
    {href: "/students", icon: <FiUser />, label: "Students"},
    {href: "/#", icon: <FiBook />, label: "Courses"},
    {href: "#", icon: <FiSettings />, label: "Settings"},
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/60 z-20 lg:hidden'
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className='flex flex-col h-full'>
          {/* Sidebar header */}
          <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
            <Link href='/dashboard' className='font-bold'>
              <Image
                src='https://miva-university.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/05/15101916/miva-mobile-logo.png'
                alt='Logo'
                width={100}
                height={40}
                style={{objectFit: "contain"}}
              />
            </Link>
            <button
              aria-label='Close sidebar'
              className='p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden'
              onClick={closeSidebar}
            >
              <FiX />
            </button>
          </div>

          {/* Navigation */}
          <div className='flex-1 p-4 overflow-y-auto'>
            <div className='space-y-1'>
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={pathname === item.href}
                  onClick={closeSidebar}
                />
              ))}
            </div>
          </div>

          {/* Sidebar footer */}
          <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
            <div className='my-2 border-gray-200 dark:border-gray-700'></div>
            <button
              onClick={() => signOut({callbackUrl: "/auth/login"})}
              className={`flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors`}
            >
              <FiLogOut className='h-4 w-4' />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
