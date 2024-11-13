import Teams from "@/components/Teams";

async function getData() {
  let fetch_path = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/profile/";
  const res = await fetch(fetch_path, {
    cache: "no-store",
  });
  const data = res.json();
  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="pt-12">
      <Teams data={data} />
    </div>
  );
}
