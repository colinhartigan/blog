import { NavLink, useParams } from 'react-router';

export default function Nav({}) {
    const postId = useParams().postId;

    return (
        <div className='w-full h-auto flex flex-row justify-center items-center gap-5 p-4 sticky top-0 bg-stone-50'>
            <NavLink to={`/#${postId}`} className='underline text-center'>
                Colin&apos;s Blog
            </NavLink>
        </div>
    );
}
