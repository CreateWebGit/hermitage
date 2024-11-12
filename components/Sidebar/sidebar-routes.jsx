"use client";
import {
  Layout,
  Building2,
  Scissors,
  Clock4,
  UserPlus,
  LandPlot,
  UserPen,
  UtensilsCrossed,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const guestRoutes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: `/dashboard/`,
    },
    {
      icon: Building2,
      label: "Om oss",
      href: `/dashboard/om-oss`,
    },
    {
      icon: UtensilsCrossed,
      label: "Meny",
      href: `/dashboard/meny`,
    },
    {
      icon: Clock4,
      label: "Öppettider",
      href: `/dashboard/oppettider`,
    },
    {
      icon: LandPlot,
      label: "Adress",
      href: `/dashboard/kontakt`,
    },
  ];

  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full items-stretch justify-between h-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
