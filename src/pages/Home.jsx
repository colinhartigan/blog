import { motion } from "motion/react";
import React, { useContext, useState } from "react";
import Markdown from "react-markdown";
import { NavLink } from "react-router";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { PostContext } from "../utils/PostContext";
import { transformUrl } from "../utils/utils";

export default function Home({}) {
    const [hoveredPost, setHoveredPost] = useState(-1);
    const { posts } = useContext(PostContext);

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5 p-5 overflow-hidden'>
            <div className='w-full h-auto flex flex-col justify-start items-center gap-1 mb-5'>
                <p className={`w-auto font-bold text-5xl ${hoveredPost === -1 ? "z-20" : "z-0"}`}>Colin&apos;s blog</p>
            </div>

            {posts?.length > 0 && (
                <div className='w-full max-w-screen-sm h-auto max-h-[60vh] flex flex-col justify-start items-center gap-2 overflow-auto'>
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
                                    className='w-full h-auto flex flex-row items-center justify-center gap-2 z-10 p-2'
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
                                        className='w-full h-auto flex flex-col justify-start items-start'
                                        to={`/post/${entry.id}`}
                                        key={index}
                                    >
                                        <div className='w-full h-auto flex flex-row justify-between items-center gap-3 '>
                                            <p className='text-2xl font-medium'>{entry.title}</p>
                                            <p className='text-sm text-gray-500 font-medium'>{entry.date}</p>
                                        </div>

                                        <p className='text-lg'>
                                            <Markdown
                                                className='prose prose-md prose-neutral mt-2 w-full h-auto'
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw]}
                                                urlTransform={transformUrl}
                                            >
                                                {entry.excerpt}
                                            </Markdown>
                                        </p>
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
