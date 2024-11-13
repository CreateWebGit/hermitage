import Teams from "@/components/Teams";

async function getData() {
  const res = await fetch(`http://localhost:3000/api/profile/`, {
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
