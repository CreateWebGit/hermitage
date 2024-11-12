"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isData, setData] = useState();

  const session = useSession();
  const { status } = session;

  const checkProfile = () => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setData(data);
        router.replace(`dashboard/${data._id}`);
      });
    });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      if (res.ok) {
        console.log("yes");
        router.replace("dashboard/");
      }
      // checkProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="hero">
        <div className=" w-full h-full bg-black/50 flex flex-col justify-center items-center text-white">
          <div className=" w-[700px] text-center">
            <div className="flex justify-center items-center w-full">
              <img className=" mr-[-8px]" src="/home/Ellipse1.png" alt="" />
              <img className=" mr-[-8px]" src="/home/Ellipse2.png" alt="" />
              <img className=" mr-[-8px]" src="/home/Ellipse3.png" alt="" />
              <div className="w-[48px] h-[48px] bg-black rounded-full flex justify-center items-center">
                <img src="/home/Arrow1.png" alt="" />
              </div>
              <p>Över 100+ nöjda vegetarianer!</p>
            </div>
            <h1 className=" font-forum text-9xl">HERMITAGE</h1>
            <h2 className=" font-forum text-2xl tracking-[.5em]">
              VEGETARISKA RESTAURANG
            </h2>
            <p className=" font-giestsans">
              Vi erbjuder vegetarisk mat lagad med kärlek i en trevlig miljö i
              Gamla Stan i Stockholm. Till oss ska den med hunger gå. Känner du
              att det kurrar i magen? Styr då din kosa hit och njut av vår
              vegetariska buffé.
            </p>
          </div>
        </div>
      </section>
      <section className=" bg-black">
        <div className="w-[1000px] h-svh m-auto text-white flex  items-center relative ">
          <div className="absolute  top-[150px] left-0 ">
            <span className="text-[#A4AC85]">MATEN</span>
            <h2 className=" font-IslandMoments text-[90px] leading-[1em] text-[#EFE7D2]">
              Vår passion för växtbaserad <br />
              matlagning
            </h2>
          </div>
          <div className="flex flex-col justify-end items-stretch h-full ">
            <p className="mb-[150px] text-[#C2C5AA]">
              På Hermitage, tror vi på att ge näring till både kropp och själ.
              Vår meny är omsorgsfullt gjord med färska, säsongsbetonade råvaror
              från lokala gårdar. Oavsett om du är en livslång vegetarian eller
              bara utforskar en växtbaserad kost, erbjuder vi något för alla
              smaker.
            </p>
          </div>
          <div className=" w-[1007px]">
            <img className=" h-auto" src="/home/thefood.jpeg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
