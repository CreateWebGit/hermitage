"use server";
import Contact from "@/components/Contact";
import React from "react";

export async function getData() {
  const res = await fetch(`http://localhost:3000/api/profile/`, {
    cache: "no-store",
  });
  const data = res.json();
  return data;
}

export default async function Home({ params }) {
  const data = await getData();

  return <Contact data={data} />;
}
