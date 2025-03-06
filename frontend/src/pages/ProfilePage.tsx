import { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import BlogImage from '/banner-1.jpg'
import ProfileImage from '/profile-example-2.png'


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { BsThreeDots } from "react-icons/bs";


// Define the Blog type
interface Blog {
    id: string;
    followersCount: string;
    authorName: string;
    profileImage: string;
    createdAt: string;
    image: string;
    authorBioTags: string[];
    heading: string;
    smallDescription: string;
}

// Sample blog data (replace with an API call in real usage)
const blogs: Blog[] = [
    { id: "0", followersCount: '100', authorName: 'Jhon Doe0', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'The MongoDB Mistake That’s Costing Your Startup Millions 🚀', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "1", followersCount: '100', authorName: 'Jhon Doe1', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'Top 10 Best React Libraries You Should Try in 2025', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "2", followersCount: '100', authorName: 'Jhon Doe2', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'React 19: Goodbye to Old Features, Hello to the Future', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "3", followersCount: '100', authorName: 'Jhon Doe3', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'Advanced React Patterns and Best Practices', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "4", followersCount: '100', authorName: 'Jhon Doe4', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'Express.js Secrets That Senior Developers Don’t Share', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "5", followersCount: '100', authorName: 'Jhon Doe5', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'My Favourite Software Architecture Patterns', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "6", followersCount: '100', authorName: 'Jhon Doe6', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: '10 Expert Performance Tips Every Senior JS React Developer Should Know', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },];

const ProfilePage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isActive, setisActive] = useState('Home')

    const rightSideRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (rightSideRef.current) {
            rightSideRef.current.scrollTop = 0;
            setisActive("Home");
        }
    }, [location.pathname]);

    const { authorProfile } = useParams<string>();

    const author = blogs.find((a) => a.authorName === authorProfile);

    if (!author) {
        return <h2 className="text-center text-red-500 text-xl">Author not found</h2>;
    }



    return (
        <>
            <div className="max-w-7xl mx-auto px-0 h-screen">

                <div className="flex justify-center space-x-0 h-full sticky overflow-hidden">

                    {/* Left Section || Profile Section */}
                    <div className="w-1/3 border-r-2 pt-6">

                        <div className="pr-4">

                            <div className="flex items-center justify-start space-x-4">
                                <img
                                    src={author.profileImage}
                                    alt={author.authorName}
                                    className="h-24 w-24 rounded-full"
                                />
                                <div className="">
                                    <h1 className="text-2xl font-medium">{author.authorName}</h1>
                                    <Link to={`/followers/${author.authorName}`} className="text-lg text-gray-600 hover:text-gray-800">{author.followersCount} Followers</Link>
                                </div>
                            </div>



                            <div className="mt-4">
                                {author.authorBioTags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-gray-600 text-base"
                                    >
                                        {tag} {index !== author.authorBioTags.length - 1 && " | "}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-end mt-3">
                                <button className="border border-black py-1 px-4 rounded-sm hover:bg-black hover:text-white transition-all saturate-75">Follow</button>
                            </div>

                        </div>

                        <hr className="my-4 border" />

                        <div className="pr-4">
                            <h1 className="text-2xl font-medium">Following</h1>
                            <div className="flex flex-col  justify-center space-y-4 mt-4">
                                {blogs.slice(0, 5).map((follower) => (
                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/profile/${follower.authorName}`}
                                            key={follower.id}
                                            className="group flex items-center space-x-3 hover:underline w-full"
                                        >
                                            <img
                                                src={follower.profileImage}
                                                alt={'follower Profile Image'}
                                                className="h-8 w-8 rounded bg-gray-200"
                                            />
                                            <h1 className="text-gray-600 group-hover:text-gray-900 text-lg">{follower.authorName}</h1>
                                        </Link>
                                        <button><BsThreeDots className="h-6 w-6 text-gray-500 hover:text-gray-900" /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-6">
                                <button className="text-base text-gray-600 hover:text-gray-900">
                                    see all (59)
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Right Section || Content Section (Blogs, About) */}
                    <div ref={rightSideRef} className="w-3/4  h-full overflow-y-auto bg-white">

                        <div className="flex justify-start border-b-2 mb-4 sticky top-0 bg-white">
                            <button onClick={() => { setisActive('Home') }} className={`${isActive === 'Home' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}>Home</button>
                            <button onClick={() => { setisActive('About') }} className={`${isActive === 'About' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}>About</button>
                        </div>

                        {isActive === "Home" &&
                            // <div className="pb-10 overflow-auto px-4">
                            //     {/* <h1 className="text-4xl font-semibold capitalize py-8">More From {author.authorName}</h1> */}
                            //     <div className="grid grid-cols-2 gap-6">
                            //         {blogs.map((blog) => (
                            //             <Link
                            //                 to={`/blog/${blog?.heading}`}
                            //                 key={blog.id}
                            //                 className="mb-4"
                            //             >

                            //                 <img
                            //                     src={blog.image}
                            //                     alt="blog image"
                            //                     className="aspect-[2.5/1.3] object-cover"
                            //                     onLoad={() => setIsLoading(false)}
                            //                     style={{ display: isLoading ? "none" : "block" }}
                            //                 />

                            //                 {isLoading && <Skeleton className="aspect-[2.5/1.3] object-cover" baseColor="#e0e0e0"
                            //                     highlightColor="#f5f5f5" duration={1.2} enableAnimation={true} />}

                            //                 <div className="mt-6">
                            //                     <Link to={`/profile/${blog.authorName}`} className='flex items-center justify-start space-x-2 mb-4'>
                            //                         <img
                            //                             src={blog.profileImage}
                            //                             alt={blog.authorName}
                            //                             className='h-8 w-8 object-cover rounded-sm aspect-square'
                            //                         />
                            //                         <h1 className='font-medium text-xl'>{blog.authorName}</h1>
                            //                     </Link>
                            //                     <h1 className="mt-3 text-xl font-bold capitalize break-before-avoid-page ">{blog.heading}</h1>
                            //                     <p className="mt-4 font-medium text-pretty line-clamp-2">{blog.smallDescription}</p>
                            //                 </div>

                            //             </Link>
                            //         ))}
                            //     </div>
                            // </div>

                            <div className='flex flex-col px-4'>
                                {blogs.map((blog) => (

                                    <Link to={`/blog/${blog?.heading}`} className='grid grid-cols-12 gap-6 items-start border-b-2 pb-6 mb-6'>

                                        <div className='col-span-4 px-0 h-full'>
                                            <img src={blog.image} alt="Blog Image" className='aspect-[3/2] h-full w-full object-contain' />
                                        </div>

                                        <div className='col-span-8'>
                                            <div
                                                key={blog.id}
                                                className='pt-0'
                                            >
                                                {/* <div className="flex justify-between items-center mb-2">
                                                    <Link to={`/profile/${blog.authorName}`} className='flex items-center w-fit justify-start space-x-2 '>
                                                        <img
                                                            src={blog.profileImage}
                                                            alt={blog.authorName}
                                                            className='h-8 w-8 object-cover rounded-sm aspect-square bg-gray-200'
                                                        />
                                                        <h1 className='font-medium'>{blog.authorName}</h1>
                                                    </Link>
                                                    <span className='font-medium'>{blog.createdAt}</span>
                                                </div> */}
                                                <h1 className='text-2xl font-semibold mb-0'>{blog.heading}</h1>
                                                <span className='line-clamp-2 text-gray-700 text-lg my-3.5'>{blog.smallDescription}</span>
                                                <span className='font-medium flex justify-self-end'>{blog.createdAt}</span>
                                            </div>


                                        </div>


                                    </Link>

                                ))}
                            </div>
                        }

                    </div>

                </div>

            </div >

        </>
    )
}

export default ProfilePage