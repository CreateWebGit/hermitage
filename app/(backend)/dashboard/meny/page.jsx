"use server";
import MenuList from "@/components/MenuList";
import React from "react";

async function getData() {
  document.documentElement.requestFullscreen();
  let fetch_path = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/profile/";
  const res = await fetch(fetch_path, {
    cache: "no-store",
  });
  const data = res.json();
  console.log(data);
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="h-full">
      <MenuList data={data} />
    </div>
  );
}
