import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Markdown from "react-markdown";
import { NavLink, useParams } from "react-router";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { PostContext } from "../utils/PostContext";
import { transformUrl } from "../utils/utils";

export default function Post({}) {
    const { posts } = useContext(PostContext);
    const postId = useParams().postId;

    const [content, setContent] = useState("");
    const [date, setDate] = useState("4/18/2004");

    const [nextPost, setNextPost] = useState(null);
    const [prevPost, setPrevPost] = useState(null);

    useEffect(() => {
        const currentIndex = posts.findIndex((entry) => entry.title === postId);
        if (currentIndex !== -1) {
            setNextPost(posts[currentIndex - 1] || null);
            setPrevPost(posts[currentIndex + 1] || null);
        }
    }, [postId, posts]);

    useEffect(() => {
        const post = posts.find((entry) => entry.title === postId);
        setContent(post?.content || "");
        setDate(post?.date || "4/18/2004");
        window.scrollTo(0, 0);
    }, [postId, posts]);

    return (
        <div className='w-full h-auto flex flex-col items-center justify-start'>
            {/* post content */}
            <div className='max-w-screen-md w-full h-full flex flex-col items-center justify-start px-3 mb-16'>
                <p className='w-full text-left font-normal text-xl italic'>{dayjs(date).format("MMMM D, YYYY")}</p>
                {/* <div className='w-1/3 h-[1px] bg-stone-200 rounded-full' /> */}
                <Markdown
                    className='prose prose-md prose-neutral mt-2 w-full h-auto max-w-none'
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    urlTransform={transformUrl}
                >
                    {content}
                </Markdown>
            </div>

            {/* footer */}
            <div className='w-full max-w-screen-md min-w-screen-md h-auto flex flex-row items-center justify-between gap-5 mb-10 px-3'>
                <NavLink className=' flex flex-row items-center justify-start gap-2' to={`/post/${prevPost?.title}`}>
                    {prevPost && (
                        <>
                            <MdKeyboardArrowLeft size={24} />
                            <div className='flex flex-col items-start justify-start'>
                                <p className='text-md'>{prevPost?.title}</p>
                                <p className='text-xs italic'>
                                    {dayjs.duration(-dayjs(date).diff(prevPost?.date)).humanize()} prior
                                </p>
                            </div>
                        </>
                    )}
                </NavLink>

                {/* <p className='text-sm font-normal italic'>Thank you for reading my blog</p> */}

                <NavLink
                    className='cursor-pointer flex flex-row items-center justify-start gap-2'
                    to={`/post/${nextPost?.title}`}
                >
                    {nextPost && (
                        <>
                            <div className='flex flex-col items-end justify-start'>
                                <p className='text-md'>{nextPost?.title}</p>
                                <p className='text-xs italic'>
                                    {dayjs.duration(-dayjs(date).diff(nextPost?.date)).humanize()} after
                                </p>
                            </div>
                            <MdKeyboardArrowRight size={24} />
                        </>
                    )}
                </NavLink>
            </div>
        </div>
    );
}
