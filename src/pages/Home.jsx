import dayjs from "dayjs";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { mdTableJson, transformUrl } from "../utils/utils";

export default function Home({}) {
    const [posts, setPosts] = useState([]);
    const [hoveredPost, setHoveredPost] = useState(-1);

    useEffect(() => {
        fetchEntries().then((entries) => {
            setPosts(entries);
        });

        async function process(file) {
            return new Promise((resolve) => {
                fetch(file)
                    .then((res) => res.text())
                    .then((text) => {
                        // the first line is the date and the second line is the title
                        const lines = text.split("\n");
                        const metadata = lines.slice(0, 4).join("\n");

                        const json = mdTableJson(metadata);
                        console.log(json);

                        resolve(json);
                    });
            });
        }

        async function fetchEntries() {
            const files = Object.values(import.meta.glob("/content/posts/*.md", { eager: true, import: "default" }));
            let entries = [];
            for (let path of files) {
                await process(path).then((entry) => {
                    // entry.id = path.split("/").pop().split(".")[0];
                    entry.id = encodeURIComponent(entry.title);
                    entries.push(entry);
                });
            }

            // sort entries by date
            entries.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });

            return entries;
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-5 p-5'>
            {/* <div className='w-full h-auto flex flex-col justify-start items-center gap-1'>
                <p className='w-auto font-bold text-5xl'></p>
            </div> */}

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
                                    className='w-auto h-auto flex flex-row items-center justify-center gap-5 z-10'
                                    onMouseEnter={() => setHoveredPost(index)}
                                    onMouseLeave={() => setHoveredPost(-1)}
                                    animate={{
                                        opacity:
                                            (index === hoveredPost && hoveredPost !== -1) || hoveredPost === -1 ? 1 : 0,
                                        color: index === hoveredPost ? "white" : "black",
                                    }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <NavLink
                                        to={`/post/${entry.id}`}
                                        className='w-auto h-auto flex flex-row justify-start items-start gap-3'
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
