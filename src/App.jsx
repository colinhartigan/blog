import { Navigate, Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
    return (
        <>
            <div className='min-w-screen min-h-screen h-screen w-screen bg-zinc-50 flex flex-col justify-start items-center gap-5'>
                <div className=' w-full h-auto flex flex-col justify-center items-center overflow-hidden'>
                    <Nav />

                    <Routes>
                        <Route index element={<Navigate to='/post' />} />
                        <Route path='post'>
                            <Route index element={<Home />} />
                            <Route path=':postId' element={<Post />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
