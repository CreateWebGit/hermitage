"use client";
import Sidebar from "@/components/Sidebar";
import { LogOut, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const session = useSession();
  const { status } = session;
  if (status === "unauthenticated") {
    console.log("hahah");
    redirect("/login");
  }
  console.log(status);
  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <div className="hidden md:flex h-screen w-56 flex-col fixed z-50 justify-between border-r">
        <Sidebar />

        <button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          type="button"
          className="bg-white border-t flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-red-400  py-4"
        >
          <LogOutIcon size={22} />
          Logga ut
          <div className="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all" />
        </button>
      </div>
      <div className="flex-grow ml-56 overflow-y-auto md:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
