"use client";
import Dashboard from "@/components/Dashboard";
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
  return <Dashboard>{children}</Dashboard>;
}
