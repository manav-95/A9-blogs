import { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import BlogImage from '/banner-1.jpg'
import ProfileImage from '/profile-example-2.png'


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


const AuthorBlogs = () => {
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
            <div ref={rightSideRef} className="w-3/4  h-full overflow-y-auto bg-white">

                <div className="flex justify-start border-b-2 mb-4 sticky top-0 bg-white">
                    <button onClick={() => { setisActive('Home') }} className={`${isActive === 'Home' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}>Home</button>
                    <button onClick={() => { setisActive('About') }} className={`${isActive === 'About' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}>About</button>
                </div>

                {isActive === "Home" &&
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
        </>
    )
}

export default AuthorBlogs