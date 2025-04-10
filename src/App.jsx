import { Navigate, Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
    return (
        <>
            <div className='min-w-screen min-h-screen h-screen w-screen max-h-screen flex flex-col justify-start items-center gap-5 bg-stone-50'>
                <div className=' w-full h-full flex flex-col justify-start items-center overflow-auto'>
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
                </div>
            </div>
        </>
    );
}

export default App;
