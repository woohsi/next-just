"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiBook, BiCollection, BiStar } from "react-icons/bi";
import { BsGear } from "react-icons/bs"
import { FiAperture } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
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
      <div
        className="
          md:flex
          flex-col
          gap-y-2
          bg-black
          h-full
          w-[200px]
          p-2
        ">
        <div>
          <div className="flex justify-center items-center py-2 text-5xl  text-white bg-slate-800 hover:bg-slate-700 font-medium rounded-sm opacity-85 mb-2">
            {/* bg-gradient-to-r from-slate-500 */}
            <Link href={"/"}>G<span className="text-yellow-400 text-2xl "><span>O</span><span className=" text-yellow-400 -ml-[7px]">V</span><span className="text-yellow-400 -ml-[4px]">N</span></span></Link>

          </div>
        </div>
        <Box className="flex flex-col gap-y-4 px-5 py-4 pb-96">
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))

          }
        </Box>
        <Box className="flex flex-col gap-y-4 px-5 py-4 overflow-y-auto h-full">
          
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;