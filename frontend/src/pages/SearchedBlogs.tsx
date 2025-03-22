import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type User = {
    _id: String,
    username: String,
    profileImage: String,
    followers: [],

}

type Blog = {
    _id: String,
    title: String,
    createdAt: Date,
    image: String,
    userId: User,
    content: any,

}

const SearchedBlogs = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    const [results, setResults] = useState<Blog[]>([]);

    const removeHtmlTags = (html: string) => html.replace(/<[^>]+>/g, "");

    const fetchSearchResults = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/blogs/search?query=${searchQuery}`);
            console.log("Data: ", data)
            setResults(data);
        } catch (error) {
            console.error("Search Error: ", error)
        }
    };


    useEffect(() => {
        fetchSearchResults();
    }, [searchQuery]);



    return (
        <div className="max-w-5xl mx-auto px-4 ">
            <div className="text-6xl font-medium flex items-start space-x-2.5 py-16">
                <h1 className=" text-[#242424] opacity-[0.6] text-nowrap">Results for</h1>
                <span className="text-black opacity-[1]">{searchQuery}</span>
            </div>
            <hr />

            {results.length !== 0 ? (
                <div>
                    {results.map((blog, index) => (
                        <a target='_blank' href={`http://localhost:5000/blogs/${blog._id}.html`}>
                            <div className='grid grid-cols-12 gap-2 items-start border-b py-6'>
                                <div key={index} className='col-span-8 '>
                                    <Link to={`/profile/${blog?.userId?._id}`}>
                                        <div className='flex items-center justify-start space-x-3 mb-3'>
                                            <img
                                                src={`http://localhost:5000/uploads/${blog?.userId?.profileImage}`}
                                                alt={'author profile'}
                                                className='h-10 w-10 object-cover rounded-xs aspect-square border'
                                            />
                                            <div className='flex flex-col'>
                                                <h1 className='text-xl -mb-1'>{blog?.userId?.username}</h1>
                                                <p>{blog?.userId?.followers.length} Followers</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='flex flex-col justify-between max-h-48 mt-2'>
                                        <h1 className='text-3xl font-semibold mb-2 line-clamp-2'>{blog.title}</h1>
                                        {blog.content && (
                                            <span className='line-clamp-2 text-base font-medium leading-7 text-[#242424] opacity-[0.6] text-[17px] mb-2'>
                                                {removeHtmlTags(blog?.content)}
                                            </span>
                                        )}

                                        <span className='text-[15px] font-medium'><span className='mr-1 text-[#242424] opacity-[0.6]'>Plublished on </span>
                                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "2-digit",
                                                year: "numeric"
                                            })}</span>
                                    </div>
                                </div>


                                <div className='col-span-4 p-10'>
                                    <img
                                        src={`http://localhost:5000/uploads/${blog.image}`}
                                        alt="Blog Image"
                                        className='aspect-[3/2] object-cover rounded-xs bg-gray-50' />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <>
                    <div className="flex justify-center items-center py-10">
                        <h1 className="text-3xl">No BLogs Are Found 😔</h1>
                    </div>
                    <div className="text-xl flex flex-col justify-start items-start space-y-2">
                        <span>Double-check your spelling.</span>
                        <span>Try using different keywords.</span>
                        <span>Try more general terms.</span>
                        <span>Refine your search for better results.</span>
                    </div>
                </>
            )
            }
        </div>
    );
};

export default SearchedBlogs;
