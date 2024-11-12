import Teams from "@/components/Teams";

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

  return (
    <div className="pt-12">
      <Teams data={data} id={params.id} />
    </div>
  );
}
