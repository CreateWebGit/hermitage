"use server";
import MenuList from "@/components/MenuList";
import React from "react";

async function getData() {
  const res = await fetch(`http://localhost:3000/api/profile`, {
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
