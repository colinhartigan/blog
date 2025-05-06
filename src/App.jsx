import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Navigate, Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Post from "./pages/Post";
import { PostProvider } from "./utils/PostContext";

dayjs.extend(relativeTime);
dayjs.extend(duration);

function App() {
    return (
        <>
            <PostProvider>
                <div className='min-w-screen h-auto w-screen flex flex-col justify-start items-center gap-5 bg-stone-50'>
                    <Routes>
                        <Route index element={<Navigate to='/post' />} />
                        <Route path='post'>
                            <Route index element={<Home />} />
                            <Route
                                path=':postId'
                                element={
                                    <>
                                        <Nav />
                                        <Post />
                                    </>
                                }
                            />
                        </Route>
                    </Routes>
                    {/* </div> */}
                </div>
            </PostProvider>
        </>
    );
}

export default App;
