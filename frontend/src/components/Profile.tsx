import { Link, useParams } from "react-router-dom";
import BlogImage from '/banner-1.jpg'
import ProfileImage from '/profile-example-2.png'

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


const Profile = () => {


    const { authorProfile } = useParams<string>();

    const author = blogs.find((a) => a.authorName === authorProfile);

    if (!author) {
        return <h2 className="text-center text-red-500 text-xl">Author not found</h2>;
    }

    return (
        <>

            <div className="pr-4">

                <div className="flex items-center justify-start space-x-4">
                    <img
                        src={author.profileImage}
                        alt={author.authorName}
                        className="h-24 w-24 rounded-full"
                    />
                    <div className="">
                        <h1 className="text-2xl font-medium">{author.authorName}</h1>
                        <Link to={`/profile/followers/${author.authorName}`} className="text-lg text-gray-600 hover:text-gray-800">{author.followersCount} Followers</Link>
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
                <Link to={`/profile/followings/${author.authorName}`} className="text-lg text-gray-600 hover:text-gray-800">see all ({author.followersCount})</Link>
                </div>
            </div>

        </>
    )
}

export default Profile