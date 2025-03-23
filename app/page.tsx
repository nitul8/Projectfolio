"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {Typewriter} from "react-simple-typewriter";

import nitul from "@/assets/nitul.jpeg";

import {FaGithub, FaLinkedin, FaCloudSun, FaUserGraduate} from "react-icons/fa";
import {SiLeetcode, SiGmail} from "react-icons/si";
import {TbTicTac, TbMathSymbols, TbListDetails} from "react-icons/tb";

const ProjectList = [
    {
        id: 1,
        title: "To Do List",
        icon: <TbListDetails />,
        link: "/todolist",
    },
    {
        id: 2,
        title: "Tic Tac Toe",
        icon: <TbTicTac />,
        link: "/tictactoe",
    },
    {
        id: 3,
        title: "Calculator",
        icon: <TbMathSymbols />,
        link: "/calculator",
    },
    {
        id: 4,
        title: "Weather App",
        icon: <FaCloudSun />,
        link: "/weatherapp",
    },
];

interface ProjectProps {
    title: string;
    icon: React.ReactNode;
}
const Tooltip: React.FC<ProjectProps> = (props) => {
    return (
        <div className="relative inline-block group">
            <button className="relative px-6 py-3 text-sm font-semibold text-white bg-black rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden">
                <span className="relative flex items-center gap-2">
                    {props.icon}
                    {props.title}
                </span>
            </button>
        </div>
    );
};

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <Image
                    src={nitul}
                    alt="Profile Picture"
                    className="rounded-full h-96 w-96 border-4 border-gray-500"
                />
                <div className="font-bold text-4xl mt-10">
                    <Typewriter
                        words={[
                            "Hi, I'm Nitul Das",
                            "Welcome to My Projectfolio",
                        ]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </div>
                <p className="text-xl mt-5">
                    Best way to learn is by doing. So, I build projects.
                </p>

                <ul className="flex flex-row space-x-8 mt-10">
                    <Link href="https://github.com/nitul8" target="_blank">
                        <FaGithub className="text-2xl hover:scale-110 transition-transform duration-300" />
                    </Link>
                    <Link href="https://leetcode.com/ndas6732" target="_blank">
                        <SiLeetcode className="text-orange-400 text-2xl hover:scale-110 transition-transform duration-300" />
                    </Link>
                    <Link href="mailto:ndas6732@gmail.com" target="_blank">
                        <SiGmail className="text-red-500 text-2xl hover:scale-110 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/nituldas/"
                        target="_blank"
                    >
                        <FaLinkedin className="text-blue-600 text-2xl hover:scale-110 transition-transform duration-300" />
                    </Link>
                    <Link href="https://nituldas.vercel.app/" target="_blank">
                        <FaUserGraduate className="text-green-500 text-2xl hover:scale-110 transition-transform duration-300" />
                    </Link>
                </ul>
            </div>
            <div className="w-4/5 flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                    {ProjectList.map((project) => (
                        <Link href={project.link} key={project.id}>
                            <Tooltip
                                title={project.title}
                                icon={project.icon}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
