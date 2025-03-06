import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
    { id: "3", followersCount: '100', authorName: 'Jhon Doe3', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor", "yoasdsad", "dasadasdaso", "asdads"], heading: 'Advanced React Patterns and Best Practices', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "4", followersCount: '100', authorName: 'Jhon Doe4', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'Express.js Secrets That Senior Developers Don’t Share', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "5", followersCount: '100', authorName: 'Jhon Doe5', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'My Favourite Software Architecture Patterns', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    { id: "6", followersCount: '100', authorName: 'Jhon Doe6', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: '10 Expert Performance Tips Every Senior JS React Developer Should Know', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    // { id: "7", followersCount: '100', authorName: 'Jhon Doe0', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'The MongoDB Mistake That’s Costing Your Startup Millions 🚀', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    // { id: "8", followersCount: '100', authorName: 'Jhon Doe1', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'Top 10 Best React Libraries You Should Try in 2025', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    // { id: "9", followersCount: '100', authorName: 'Jhon Doe2', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'React 19: Goodbye to Old Features, Hello to the Future', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    // { id: "10", followersCount: '100', authorName: 'Jhon Doe3', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'Advanced React Patterns and Best Practices', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    // { id: "11", followersCount: '100', authorName: 'Jhon Doe4', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'Express.js Secrets That Senior Developers Don’t Share', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    // { id: "12", followersCount: '100', authorName: 'Jhon Doe5', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: 'My Favourite Software Architecture Patterns', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
    // { id: "13", followersCount: '100', authorName: 'Jhon Doe6', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, authorBioTags: ["MERN Stack", "Full-Stack Developer", "Blogger", "Open Source Contributor"], heading: '10 Expert Performance Tips Every Senior JS React Developer Should Know', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },

];

const Followers = () => {
    const { type } = useParams();

    const navigate = useNavigate();

    const [isActive, setisActive] = useState(type);

    const rightSideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setisActive(type)
    }, [type]);

    const { authorProfile } = useParams<string>();

    const author = blogs.find((a) => a.authorName === authorProfile);

    if (!author) {
        return <h2 className="text-center text-red-500 text-xl">Author not found</h2>;
    }

    const reversedBlogs = [...blogs].reverse();

    return (
        <>
            {/* Right Section || Content Section (Blogs, About) */}
            <div ref={rightSideRef} className="w-3/4  h-full overflow-y-auto bg-white">

                <div className="flex justify-start border-b-2 mb-4 sticky top-0 bg-white">
                    <button
                        onClick={() => { setisActive('followers'); navigate(`/profile/followers/${author.authorName}`) }}
                        className={`${isActive === 'followers' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}
                    >
                        Followers
                        <span className="ml-1">({author.followersCount})</span>
                    </button>

                    <button
                        onClick={() => { setisActive('followings'); navigate(`/profile/followings/${author.authorName}`) }}
                        className={`${isActive === 'followings' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}
                    >
                        Followings
                        <span className="ml-1">({author.followersCount})</span>
                    </button>
                </div>

                {isActive === "followers" &&
                    <>

                        <div className="px-6">
                            {blogs.map((follower, index) =>
                                <div key={index} className="group flex justify-between items-center space-x-20 border-b-2 pb-4 mt-4">
                                    <Link to={`/profile/${follower.authorName}`} className="flex justify-start items-start space-x-4 w-full">
                                        <img
                                            src={follower.profileImage}
                                            alt="Profile Image"
                                            className="h-14 w-14 rounded bg-gray-100"
                                        />
                                        <div className="flex flex-col items-start justify-center">
                                            <p className="text-lg font-medium">{follower.authorName}</p>
                                            <p className="line-clamp-1">
                                                {follower.authorBioTags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-gray-600 text-sm"
                                                    >
                                                        {tag} {index !== author.authorBioTags.length - 1 && " | "}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    </Link>

                                    <div>
                                        <button className="py-2 px-4 rounded bg-[#4bb543] text-white">Follow</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                }


                {isActive === "followings" &&
                    <>

                        <div className="px-6">
                            {reversedBlogs.map((follower, index) =>
                                <div key={index} className="group flex justify-between items-center space-x-20 border-b-2 pb-4 mt-4">
                                    <Link to={`/profile/${follower.authorName}`} className="flex justify-start items-start space-x-4 w-full">
                                        <img
                                            src={follower.profileImage}
                                            alt="Profile Image"
                                            className="h-14 w-14 rounded bg-gray-100"
                                        />
                                        <div className="flex flex-col items-start justify-center">
                                            <p className="text-lg font-medium">{follower.authorName}</p>
                                            <p className="line-clamp-1">
                                                {follower.authorBioTags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-gray-600 text-sm"
                                                    >
                                                        {tag} {index !== author.authorBioTags.length - 1 && " | "}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    </Link>

                                    <div>
                                        <button className="py-2 px-4 rounded bg-[#4bb543] text-white">Follow</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                }

            </div>

        </>
    )
}

export default Followers