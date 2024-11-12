"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Logo } from "./Sidebar/Logo";
import { Compass, Layout } from "lucide-react";

const navUrls = [
  {
    id: 1,
    icon: "",
    label: "Frisör Guiden",
    href: "/",
  },
  {
    id: 2,
    icon: "",
    label: "Salonger",
    href: "/salonger",
  },
  ,
  {
    id: 3,
    icon: "",
    label: "Om oss",
    href: "/om",
  },
];

const Navbar = () => {
  const [isUserNav, setUserNav] = useState();

  const { data: session } = useSession(false);

  const role = session?.user?.role;

  console.log("me session: ", session?.user);

  return (
    <div className="flex items-center justify-between m-0 py-8 w-full border-b border-slate-200 relative">
      <div className="flex items-center">
        <Link href="/">
          <div className="ml-8 mr-64">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </Link>
        <div className="flex gap-8 text-slate-500 text-xl">
          {navUrls.map((item) => (
            <div key={item.id}>
              <Link href={item.href}>{item.label}</Link>
            </div>
          ))}
        </div>
      </div>

      {session ? (
        <div className="mr-8 cursor-pointer underline">
          <div onClick={() => setUserNav(!isUserNav)}>{session?.user.name}</div>
        </div>
      ) : (
        <div className="flex mr-4 gap-2">
          <Link
            className="bg-red-800 text-fuchsia-50 px-4 py-2 rounded-2xl"
            href="/registrera"
          >
            Skapa konto
          </Link>
          <Link className="px-4 py-2" href="/login">
            Logga in
          </Link>
        </div>
      )}

      {isUserNav ? (
        <div className="absolute bottom-0 right-0 border mb-[-30px] mr-4 py-2 px-2 bg-slate-100">
          {role === "admin" ? (
            <div>
              <Link href="/users">Användare</Link>
            </div>
          ) : (
            <div>
              <Link href="/profile">Profil</Link>
            </div>
          )}
          <button onClick={() => signOut()}>Logga ut</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
