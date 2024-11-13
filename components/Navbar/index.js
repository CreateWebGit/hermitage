"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";

import { Message_data } from "@/app/context/context";
import { navLinks } from "./data";

import { AiOutlineMenu, AiOutlineClose, AiFillInstagram } from "react-icons/ai";
import {
  MdEmail,
  MdOutlineAccessTime,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { BsTelephoneFill, BsLinkedin, BsFacebook } from "react-icons/bs";
import Flag from "react-world-flags";
import ReactCountryFlag from "react-country-flag";

import styles from "./styles.module.css";
import { cn } from "@/utils/utils";
import Topbar from "./Topbar";
import { Logo } from "./Logo";

const Navbar = ({ topbar = false, white }) => {
  const [isNav, setIsNav] = useState(false);
  const [isSublinks, setSublinks] = useState(false);
  const [isMobileSublinks, setMobileSublinks] = useState(false);
  const [isShowLanguage, setShowLanguage] = useState(false);
  const [sticky, setSticky] = useState(true);

  const { inLanguage, setLanguage } = useContext(Message_data);

  console.log(inLanguage);

  // const scroll = scrollInfo.y;
  // let test = "-100%";

  const router = useRouter();
  const path = router.path;
  const pathname = usePathname();

  const handleNav = () => {
    setIsNav(!isNav);
  };

  const handleSubNav = () => {
    setMobileSublinks(!isMobileSublinks);
  };

  const handleLangEng = () => {
    setLanguage("eng");
    setShowLanguage(false);
  };

  const handleLangSv = () => {
    setLanguage("sv");
    setShowLanguage(false);
  };

  /*
	useEffect(() => {
		const handleScroll = () => {
			if (scroll > 10.0) {
				//setSticky(true);
			}
		};
		window.addEventListener('scroll', handleScroll);
	});
	*/

  // const styleprops = { scroll, isNav, background };

  // const classes = useStyles(styleprops);

  return (
    <>
      <div
        className={cn(
          "w-full px-4  top-0 z-50 border-b  absolute py-8",
          white ? "border-b-black/10" : "border-b-white/30 md:border-none"
        )}
      >
        <Topbar
          handleLangSv={handleLangSv}
          handleLangEng={handleLangEng}
          topbar={topbar}
        />

        <div className="flex justify-between items-center m-auto h-6 md:h-12 lg:w-[1200px] ">
          <Link href={"/"} className="relative ">
            <Logo />
          </Link>
          <div className="flex items-center w-full justify-center">
            <div className="flex relative justify-between items-center z-50 mr-8 md:hidden">
              <>
                <div
                  className="flex relative justify-between items-center"
                  onClick={() => setShowLanguage(!isShowLanguage)}
                >
                  {inLanguage === "sv" ? (
                    <ReactCountryFlag
                      className="emojiFlag"
                      countryCode="SE"
                      style={{
                        fontSize: "2em",
                        lineHeight: "2em",
                      }}
                      aria-label="United States"
                    />
                  ) : (
                    <ReactCountryFlag
                      className="emojiFlag"
                      countryCode="GB"
                      style={{
                        fontSize: "2em",
                        lineHeight: "2em",
                      }}
                      aria-label="United States"
                    />
                  )}
                  <MdKeyboardArrowDown
                    size={25}
                    color={white ? "#000" : "#fff"}
                  />
                </div>

                {isShowLanguage ? (
                  <>
                    <div className="absolute top-[75px] left-[-15px] text-white bg-[#897B8E] p-3 z-50">
                      <div
                        className="flex relative justify-between items-center px-2"
                        onClick={handleLangSv}
                      >
                        <ReactCountryFlag
                          className="emojiFlag"
                          countryCode="SE"
                          style={{
                            fontSize: "2em",
                          }}
                          aria-label="United States"
                        />
                        <span className="ml-1">
                          {inLanguage === "sv" ? "Svenska" : "Swedish"}
                        </span>
                      </div>
                      <div
                        className="flex relative justify-between items-center px-2"
                        onClick={handleLangEng}
                      >
                        <ReactCountryFlag
                          className="emojiFlag"
                          countryCode="GB"
                          style={{
                            fontSize: "2em",
                          }}
                          aria-label="United States"
                        />
                        <span className="ml-1">
                          {inLanguage === "sv" ? "Engelska" : "English"}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            </div>
            <div className="hidden md:flex flex-col">
              <ul className="flex list-none">
                {navLinks.map((link, index) => {
                  return (
                    <>
                      {link.sublinks ? (
                        <div
                          key={index}
                          className="relative ml-5"
                          onMouseEnter={() => setSublinks(true)}
                          onMouseLeave={() => setSublinks(false)}
                        >
                          <div className="flex items-center">
                            <li>
                              <Link
                                legacyBehavior
                                key={link.id}
                                href={link.path}
                              >
                                <a
                                  className={cn(
                                    "no-underline text-white text-xl before:absolute before:w-full before:h-2 before:bottom-0 before:left-0 before:bg-orange-500 before:duration-300 before:ease-in-out",
                                    router.pathname === link.path
                                      ? "before:scale-x-100"
                                      : "before:scale-x-0 hover:scale-x-100",
                                    white ? "text-slate-600" : "text-white"
                                  )}
                                >
                                  {link.name}
                                </a>
                              </Link>
                            </li>
                            <MdKeyboardArrowDown
                              color={white ? "#333" : "#fff"}
                            />
                          </div>

                          <div
                            className={cn(
                              "absolute w-56  ease-in duration-300",
                              isSublinks
                                ? " opacity-100 pt-4"
                                : "opacity-0 pt-6"
                            )}
                          >
                            <div
                              className={cn(
                                "bg-white pl-4 pt-2 rounded-b-md border-b border-l border-r delay-300",
                                isSublinks ? " block" : " hidden"
                              )}
                            >
                              {link.sublinks.map((sublink) => {
                                return (
                                  <>
                                    <div className="relative inline-block mb-2 ease-in duration-300">
                                      <Link
                                        legacyBehavior
                                        key={sublink.id}
                                        href={sublink.path}
                                      >
                                        <a
                                          className={cn(
                                            "no-underline  before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:top-6 before:rounded-md before:left-0 before:bg-orange-500 before:duration-300 before:ease-in-out",
                                            pathname === sublink.path
                                              ? "before:scale-x-100"
                                              : "before:scale-x-0 before:hover:scale-x-100",
                                            white
                                              ? "text-slate-600"
                                              : "text-slate-600"
                                          )}
                                        >
                                          {sublink.name}
                                        </a>
                                      </Link>
                                    </div>
                                    <br />
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <li className="flex items-center relative ml-5 cursor-pointer">
                            <Link legacyBehavior key={link.id} href={link.path}>
                              <a
                                className={cn(
                                  "no-underline  before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:top-6 before:rounded-md before:left-0 before:bg-orange-500 before:duration-300 before:ease-in-out",
                                  pathname === link.path
                                    ? "before:scale-x-100"
                                    : "before:scale-x-0 before:hover:scale-x-100",
                                  white ? "text-slate-600" : "text-white"
                                )}
                              >
                                {inLanguage === "sv" ? link.name : link.nameEng}
                              </a>
                            </Link>
                          </li>
                        </div>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>
            <div
              onClick={handleNav}
              className="block z-50 cursor-pointer md:hidden"
            >
              {white ? (
                <AiOutlineMenu size={35} />
              ) : (
                <AiOutlineMenu size={35} color="#fff" />
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="cursor-pointer" onClick={handleLangSv}>
              <ReactCountryFlag
                className="emojiFlag"
                countryCode="SE"
                style={{
                  fontSize: "2em",
                  lineHeight: "2em",
                }}
                aria-label="United States"
              />
            </div>
            <div className="cursor-pointer" onClick={handleLangEng}>
              <ReactCountryFlag
                className="emojiFlag"
                countryCode="GB"
                style={{
                  fontSize: "2em",
                  lineHeight: "2em",
                }}
                aria-label="United States"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleNav}
        className={cn(
          isNav
            ? "fixed left-0 top-0 w-full h-screen bg-slate-800/70 z-50 block md:hidden"
            : ""
        )}
      />
      <div
        className={cn(
          "fixed h-screen top-0 bg-[#fff] transition-all duration-500 ease-in z-[999] w-3/4 ",
          isNav ? "left-0" : "left-[-100%]"
        )}
      >
        <div className="flex items-center relative">
          {/*
          <div className="m-auto mt-1 mb-4">
            <p className="text-center ">Låt oss konekta!</p>
          </div>
          */}
          <Link href={"/"} className="relative w-44 h-14 mt-4 ml-8">
            <Image
              className="logo"
              src="/logo/Logo.png"
              alt="loggo för webbutvecklare"
              layout="fill"
            />
          </Link>
          <div
            onClick={handleNav}
            className="rounded-full bg-white p-3 shadow-md absolute top-3 right-3"
          >
            <AiOutlineClose />
          </div>
        </div>

        <div className=" relative mt-[33%]">
          <div className="w-1/2 m-auto relative">
            <ul className="relative no-underline  bg-white transition-all duration-1000 ">
              {navLinks.map((link) => {
                return (
                  <>
                    {link.sublinks ? (
                      <>
                        <li
                          key={link.id}
                          className="relative py-4 pl-4 text-left text-xl border-b border-solid border-black/10 "
                        >
                          <Link key={link.id} href={link.path}>
                            {link.name}
                          </Link>
                          <div
                            className="inline-block ml-3"
                            onClick={handleSubNav}
                          >
                            {" "}
                            {isMobileSublinks ? "-" : "+"}{" "}
                          </div>
                          <div
                            className={cn(
                              "overflow-hidden transition-all duration-300",
                              isMobileSublinks ? "max-h-64" : "max-h-0 "
                            )}
                          >
                            <ul>
                              {link.sublinks.map((sublink) => {
                                return <li>{sublink.name}</li>;
                              })}
                            </ul>
                          </div>
                        </li>
                      </>
                    ) : (
                      <Link key={link.id} href={link.path} onClick={handleNav}>
                        <li
                          key={link.id}
                          className="relative py-4 pl-4 text-left border-b border-solid border-black/10 "
                        >
                          {inLanguage === "sv" ? link.name : link.nameEng}
                        </li>
                      </Link>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
          <div className={styles.navMobileSlogan}>
            <p>{inLanguage === "sv" ? "Låt oss konekta" : "Let's connect"}</p>
          </div>

          {/*
            <div className={styles.navMobileSocialContainer}>
              <a href="#">
                <div className={styles.navMobileSocial}>
                  <Social socialtype="facebook" />
                </div>
              </a>
              <a href="#">
                <div className={styles.navMobileSocial}>
                  <Social socialtype="instagram" />
                </div>
              </a>
              <a href="#">
                <div className={styles.navMobileSocial}>
                  <Social socialtype="linkedin" />
                </div>
              </a>
              
            </div>
            */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
