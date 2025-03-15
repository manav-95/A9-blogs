import { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";


const AuthorBlogs = () => {

    const location = useLocation();
    const { id } = useParams<string>();

    const rightSideRef = useRef<HTMLDivElement | null>(null);

    const [authorBlogs, setAuthorBlogs] = useState<any>([]);
    const [isActive, setisActive] = useState('Home')


    useEffect(() => {
        if (rightSideRef.current) {
            rightSideRef.current.scrollTop = 0;
            setisActive("Home");
        }
    }, [location.pathname]);


    const fetchUserBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/blogs/${id}`)
            if (response.status === 200) {
                console.log("Response data Blogs: ", response.data);
                setAuthorBlogs(response.data)
            }
        } catch (error: any) {
            console.log("Error: ", error.message);
            setAuthorBlogs([])
            console.log("changed", authorBlogs);
        }
    }


    useEffect(() => {
        fetchUserBlogs();
    }, [id])


    return (
        <>
            <div ref={rightSideRef} className="w-3/4 h-full overflow-y-auto bg-white">

                <div className="flex justify-start border-b-2 mb-4 sticky top-0 bg-white">
                    <button onClick={() => { setisActive('Home') }} className={`${isActive === 'Home' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}>Home</button>
                    <button onClick={() => { setisActive('About') }} className={`${isActive === 'About' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}>About</button>
                </div>

                {isActive === "Home" && authorBlogs.length > 0 &&
                    <div className='flex flex-col px-4'>
                        {authorBlogs?.map((blog: any) => (
                            <Link to={`http://localhost:5000/blogs/${blog._id}.html`} className='grid grid-cols-12 gap-6 items-start border-b-2 pb-6 mb-6'>

                                <div className='col-span-4 px-0 h-full'>
                                    <img
                                        src={blog.image ? `http://localhost:5000/uploads/${blog.image}` : ''}
                                        alt="Blog Image"
                                        className='aspect-[3/2] h-full w-full object-cover rounded-md' />
                                </div>

                                <div className='col-span-8 h-full'>
                                    <div
                                        key={blog.id}
                                        className='pt-0 h-full flex flex-col justify-between'
                                    >
                                        <div className="flex items-center">
                                            <h1 className='text-2xl font-semibold line-clamp-2'>{blog.title}</h1>
                                        </div>

                                        <div className="h-full flex flex-col justify-between">
                                            <span className='line-clamp-2 text-gray-700 text-lg my-3.5'>Creating a multilingual website with Next.js enhances the user experience and boosts SEO by providing content in native languages. It helps ashdgsa dasdhsagd sadjsadh gaksghd sadkajsgdasd asjdsagd asdkj</span>
                                            <span className='font-medium ml-auto'>
                                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    </div>


                                </div>

                            </Link>
                        ))}
                    </div>
                }

                {isActive === "Home" && authorBlogs.length === 0 &&
                    <div className="flex justify-center items-center mt-10">
                        <span className="text-xl ">This Author Does Not Write Any Blog Yet.</span>
                    </div>
                }






                {isActive === "About" &&
                    < div className="flex justify-center items-center mt-10">
                        <span className="text-xl ">Nothing to display</span>
                    </div>
                }

            </div >
        </>
    )
}

export default AuthorBlogs