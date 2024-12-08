"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiBook, BiCollection, BiStar } from "react-icons/bi";
import { BsGear } from "react-icons/bs"
import { FiAperture } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Footer from "./Footer";
import Link from "next/link";


interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      icon: BiBook,
      label: 'Search',
      active: pathname == '/',
      href: '/'
    },
    // {
    //   icon: FiAperture,
    //   label: 'Posts',
    //   active: pathname == '/posts',
    //   href: '/posts'
    // },
    // {
    //   icon: BiCollection,
    //   label: 'Favorites',
    //   active: pathname == '/favorites',
    //   href: '/favorites'
    // },
    {
      icon: GoHistory,
      label: 'History',
      active: pathname == '/history',
      href: '/history'
    },
    {
      icon: BsGear,
      label: 'Settings',
      active: pathname == '/settings',
      href: '/'
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [pathname])

  return (
    <div
      className="flex h-full">
      
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
      
    </div>
  );
}

export default Sidebar;