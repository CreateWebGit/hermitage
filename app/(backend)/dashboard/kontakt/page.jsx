"use server";
import Contact from "@/components/Contact";
import React from "react";

export async function getData(params) {
  console.log(params);
  const res = await fetch(`http://localhost:3000/api/profile/${params}`, {
    cache: "no-store",
  });
  const data = res.json();
  return data;
}

export default async function Home({ params }) {
  const data = await getData(params.id);

  return <Contact data={data} />;
}
