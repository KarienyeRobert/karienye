"use client"

import React, {useTransition, useState} from 'react'
import Image from "next/image"
import TabButton from './TabButton'

const TAB_DATA=[
  {
  title: "Skills",
  id:"skills",
  content:(
    <ul className='list-disc pl-2'>
      <li>Node.js</li>
      <li>Expressjs</li>
      <li>MongoDb</li>
      <li>Next.js</li>
      <li>React Native</li>
      <li>Javascript</li>
      <li>Python</li>
      <li>Tailwindcss</li>
      <li>Java</li>
    </ul>
  )
  },
  {
    title:"Education",
    id:"education",
    content:(
      <ul className='list-disc pl-2'>
        <li>Bachelor of science, Information Technology</li>
      </ul>
    )
  },
  {
    title: "Certifications",
    id: "certifications",
    content:(
     <ul className='list-disc pl-2'>
      <li>AWS Cloud Practitionier</li>
     </ul>
    )
  }
]

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section id={"about"} className="text-white">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
            <Image alt='' src="/images/avatar.png" width={500} height={500}/>
            <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
              <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
              <p className='text-base lg:text-lg'>
              I am a software engineer specializing in JavaScript frameworks such as ReactJS, React Native, NextJS, and NodeJS. My expertise spans both front-end and back-end development.I excel at creating reusable, modular components, which enables me to develop scalable and maintainable codebases. My extensive experience with these technologies enables me to deliver high-quality software solutions that meet the evolving needs of businesses and users. I thrive in dynamic environments and continually learn and adapt to new challenges in the software development landscape.
              </p>
              <div className='flex flex-row justify-start mt-8'>
               <TabButton selectTab={()=>handleTabChange("skills")} active={tab ==="skills"}>
                {""}
                Skills{""}
                </TabButton>
               <TabButton selectTab={()=>handleTabChange("education")} active={tab ==="education"}>
               {""}
                Education{""}
                </TabButton>
               <TabButton selectTab={()=>handleTabChange("certifications")} active={tab ==="certifications"}>               
                {""}
               Certifications{""}
               </TabButton>
              </div>
              <div className="mt-8">{TAB_DATA.find((t)=>t.id === tab).content}</div>
            </div>
        </div>
    </section>
  )
}

export default AboutSection
