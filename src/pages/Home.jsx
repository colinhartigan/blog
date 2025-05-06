import dayjs from "dayjs";
import { motion } from "motion/react";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { PostContext } from "../utils/PostContext";
import { transformUrl } from "../utils/utils";

export default function Home({}) {
    const [hoveredPost, setHoveredPost] = useState(-1);
    const { posts } = useContext(PostContext);

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5 p-5'>
            <div className='w-full h-auto flex flex-col justify-start items-center gap-1 mb-5'>
                <p className={`w-auto font-bold text-5xl ${hoveredPost === -1 ? "z-20" : "z-0"}`}>Colin&apos;s blog</p>
            </div>

            {posts?.length > 0 && (
                <div className='w-auto max-w-screen-sm h-auto flex flex-col justify-start items-center gap-1 overflow-hidden'>
                    {posts.map((entry, index) => {
                        const imageUrl = transformUrl(entry.image);

                        return (
                            <React.Fragment key={index}>
                                <motion.div
                                    animate={{ opacity: index === hoveredPost ? 1 : 0 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.1 }}
                                    className='w-full h-full absolute top-0 left-0'
                                    style={{
                                        backgroundImage: `url('${imageUrl}')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        filter: "blur(10px) grayscale(1) sepia(0.2)",
                                        zIndex: 0,
                                    }}
                                />
                                <motion.div
                                    key={index}
                                    className='w-full h-auto flex flex-row items-center justify-center gap-5 z-10'
                                    onMouseEnter={() => setHoveredPost(index)}
                                    onMouseLeave={() => setHoveredPost(-1)}
                                    animate={{
                                        opacity:
                                            (index === hoveredPost && hoveredPost !== -1) || hoveredPost === -1 ? 1 : 0,
                                        backgroundColor: index === hoveredPost ? "white" : "transparent",
                                    }}
                                    transition={{ duration: 0.05 }}
                                >
                                    <NavLink
                                        to={`/post/${entry.id}`}
                                        className='w-full h-auto flex flex-row justify-start items-start gap-3'
                                        key={index}
                                    >
                                        <p className='font-bold'>{dayjs(entry.date).format("MM/DD/YY")}</p>
                                        <p className='underline'>{entry.title}</p>
                                    </NavLink>
                                </motion.div>
                            </React.Fragment>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
