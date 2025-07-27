import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router';
import { PostContext } from '../utils/PostContext';
import { transformUrl } from '../utils/utils';

export default function Home({}) {
    const { posts } = useContext(PostContext);

    useEffect(() => {
        // get the post we should scroll to from the # hash in the URL
        const hash = window.location.hash.slice(3);
        console.log(hash);
        if (hash) {
            const postElement = document.getElementById(hash);
            if (postElement) {
                postElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5 p-5 overflow-hidden box-border'>
            {posts?.length > 0 && (
                <div className='w-full max-w-full h-full max-h-full flex flex-col justify-start items-center gap-5 overflow-x-hidden box-border snap-y snap-mandatory'>
                    {posts.map((entry, index) => {
                        const imageUrl = transformUrl(entry.image);

                        return (
                            <div
                                className='relative min-h-full min-w-full max-w-full max-h-full snap-start snap-always'
                                key={index}
                            >
                                <NavLink
                                    id={entry.id}
                                    className='relative w-full h-full max-w-full max-h-full flex flex-col justify-start items-start z-20'
                                    to={`/post/${entry.id}`}
                                    key={index}
                                >
                                    <div
                                        className='absolute w-full h-full max-w-full max-h-full z-0 '
                                        style={{
                                            backgroundImage: `url('${imageUrl}')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: 'grayscale(1) sepia(.1)',
                                            zIndex: 0,
                                        }}
                                    />
                                    <div
                                        className='relative w-full h-full max-w-full max-h-full flex flex-col justify-start items-start p-5 gap-2 z-20'
                                        style={{
                                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%), linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 20%)`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <h1 className='max-w-full text-6xl font-medium text-white text-shadow-md wrap-break-word '>
                                            {entry.title}
                                        </h1>

                                        <div className='grow' />

                                        <h1 className='max-w-full text-2xl italic font-normal text-shadow-md text-white wrap-break-word '>
                                            {dayjs(entry.date).format('MMMM D, YYYY')}
                                        </h1>
                                    </div>
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
