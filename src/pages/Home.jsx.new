import { useContext } from 'react';
import { PostContext } from '../utils/PostContext';
import { transformUrl } from '../utils/utils';

export default function Home({}) {
    const { posts } = useContext(PostContext);

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5 p-5 overflow-hidden box-border'>
            {posts?.length > 0 && (
                <div className='w-full max-w-(--breakpoint-xl) h-full max-h-full flex flex-col justify-start items-center gap-2 overflow-auto box-border'>
                    {posts.map((entry, index) => {
                        const imageUrl = transformUrl(entry.image);

                        return (
                            <div className=' min-h-full min-w-full' key={index}>
                                <div
                                    className='w-full h-full max-w-full max-h-full flex flex-col justify-start items-start gap-2 p-4'
                                    style={{
                                        backgroundImage: `url('${imageUrl}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        // filter: 'blur(5px) grayscale(1) sepia(0.1)',
                                        zIndex: 0,
                                    }}
                                >
                                    <h1 className='text-6xl font-medium text-white text-shadow-lg break-words'>
                                        {entry.title}
                                    </h1>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
