import React from "react";
import { SidebarRoutes } from "./sidebar-routes";
import Logo from "./Logo";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-white">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
