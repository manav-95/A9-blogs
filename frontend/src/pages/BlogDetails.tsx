import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlogImage from '/banner-1.jpg'
import ProfileImage from '/profile-example-2.png'


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// Define the Blog type
interface Blog {
    id: string;
    authorName: string;
    profileImage: string;
    createdAt: string;
    image: string;
    heading: string;
    smallDescription: string;
}

// Sample blog data (replace with an API call in real usage)
const blogs: Blog[] = [
    { id: "0", authorName: 'Jhon Doe0', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'The MongoDB Mistake That’s Costing Your Startup Millions 🚀', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "1", authorName: 'Jhon Doe1', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'Top 10 Best React Libraries You Should Try in 2025', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "2", authorName: 'Jhon Doe2', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'React 19: Goodbye to Old Features, Hello to the Future', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "3", authorName: 'Jhon Doe3', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'Advanced React Patterns and Best Practices', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "4", authorName: 'Jhon Doe4', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'Express.js Secrets That Senior Developers Don’t Share', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "5", authorName: 'Jhon Doe5', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'My Favourite Software Architecture Patterns', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "6", authorName: 'Jhon Doe6', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: '10 Expert Performance Tips Every Senior JS React Developer Should Know', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },

];



const BlogDetails = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { blogId } = useParams<string>();

    const blog = blogs.find((b) => b.heading === blogId);

    if (!blog) {
        return <h2 className="text-center text-red-500 text-xl">Blog not found</h2>;
    }


    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-10">

                <h1 className="text-6xl capitalize font-semibold text-pretty text-center">{blog.heading}</h1>
                <p className="my-5 text-lg font-medium text-center text-gray-700 ">{blog.smallDescription}</p>
                <div className="flex justify-between items-center mb-2">
                    <Link to={`/profile/${blog.authorName}`} className='group flex items-center justify-start space-x-2'>
                        <img
                            src={blog.profileImage}
                            alt={blog.authorName}
                            className='h-9 w-9 object-cover rounded-sm aspect-square bg-gray-100'
                        />
                        <h1 className='font-medium text-lg text-gray-600 group-hover:text-gray-900 group-hover:underline'>{blog.authorName}</h1>
                    </Link>
                    <p className="text-lg font-medium text-gray-600 flex justify-self-end">{blog.createdAt}</p>
                </div>
                <img
                    src={blog.image}
                    alt="blog image"
                    className="aspect-[3/2] object-cover mb-10"
                    onLoad={() => setIsLoading(false)}
                    style={{ display: isLoading ? "none" : "block" }}
                />

                {isLoading && <Skeleton className="aspect-[3/2] mb-10" baseColor="#e0e0e0"
                    highlightColor="#f5f5f5" duration={1.2} enableAnimation={true} />}

            </div >

            <div className="w-full bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 pb-10">
                    <h1 className="text-4xl font-medium capitalize py-10">More From {blog.authorName}</h1>
                    <div className="grid grid-cols-2 gap-12">
                        {blogs.slice(0, 4).map((blog) => (
                            <Link
                                to={`/blog/${blog?.heading}`}
                                key={blog.id}
                                className=""
                            >

                                <img
                                    src={blog.image}
                                    alt="blog image"
                                    className="aspect-[2.5/1.3] object-cover"
                                    onLoad={() => setIsLoading(false)}
                                    style={{ display: isLoading ? "none" : "block" }}
                                />

                                {isLoading && <Skeleton className="aspect-[2.5/1.3] object-cover" baseColor="#e0e0e0"
                                    highlightColor="#f5f5f5" duration={1.2} enableAnimation={true} />}

                                <div className="mt-6">
                                    <Link to={`/profile/${blog.authorName}`} className='flex items-center justify-start space-x-2 mb-4'>
                                        <img
                                            src={blog.profileImage}
                                            alt={blog.authorName}
                                            className='h-8 w-8 object-cover rounded-sm aspect-square'
                                        />
                                        <h1 className='font-medium text-xl'>{blog.authorName}</h1>
                                    </Link>
                                    <h1 className="mt-3 text-xl font-bold capitalize break-before-avoid-page ">{blog.heading}</h1>
                                    <p className="mt-4 font-medium text-pretty line-clamp-2">{blog.smallDescription}</p>
                                </div>

                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetails;
