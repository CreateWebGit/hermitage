import TimePicker from "@/components/TimePicker";
import { OpenTimesForm } from "@/components/open-times-form";

async function getData() {
  const res = await fetch(`http://localhost:3000/api/profile/`, {
    cache: "no-store",
  });
  const data = res.json();
  console.log(data);
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="flex justify-center items-start h-[2000px]">
      <div className="w-[700px]">
        <OpenTimesForm data={data} />
      </div>
    </div>
  );
}
