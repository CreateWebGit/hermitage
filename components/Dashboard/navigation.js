import {
  Layout,
  Building2,
  Clock4,
  LandPlot,
  UtensilsCrossed,
} from "lucide-react";

export const routes = [
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
