import { createContext, useEffect, useState } from "react";
import { mdTableJson } from "../utils/utils";

const PostContext = createContext();

function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);

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

                        let json = mdTableJson(metadata);
                        console.log(json);

                        json.content = lines.slice(4).join("\n");

                        // extract the first 40 characters after the 5th line
                        json.excerpt = lines.slice(5).join("\n").split(" ").slice(0, 30).join(" ");
                        json.excerpt += json.excerpt.length > 30 ? "..." : "";

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

            console.log(entries);

            return entries;
        }
    }, []);

    return <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>;
}

export { PostContext, PostProvider };
