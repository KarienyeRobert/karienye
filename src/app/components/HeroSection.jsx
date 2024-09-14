"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className="text-white mb-4 lg:text-5xl font-extrabold text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Hello, I&apos;m {""}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Robert",
                1000,
                "A full stack developer",
                1000,
                "A web developer",
                1000,
                "A mobile-app developer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#adb7be] text-base sm:text-lg mb-6 lg:text-xl">
          I&apos;m a dedicated programmer based in Nairobi, Kenya, with a strong focus on creating impactful, user-centered applications. Let&apos;s connect and turn your vision into a reality!







          </p>
          <div>
            <button className="px-4 py-3 rounded-full w-full sm:w-fit mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white">
              Hire Me
            </button>
            <button className="px-1 py-1 rounded-full w-full sm:w-fit bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500  hover:bg-slate-800 text-white  mt-3">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2 ">
                Download CV
              </span>
            </button>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src={"/images/avatar.png"}
              alt="Hero Image"
              width={300}
              className="rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
