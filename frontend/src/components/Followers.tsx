import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useOutletContext } from "react-router-dom";


type User = {
    _id: String,
    username: String,
    profileImage: String,
    bio: String,
}

type ContextType = {
    isFollowing: boolean;
    setIsFollowing: (value: boolean) => void;
};


const Followers = () => {
    const { isFollowing } = useOutletContext<ContextType>();

    const { type } = useParams();

    const navigate = useNavigate();

    const [isActive, setisActive] = useState(type);

    const [user, setUser] = useState<any>();
    const [followersCount, setFollowersCount] = useState<number>();
    const [followingsCount, setFollowingsCount] = useState<number>();

    const [followersList, setFollowersList] = useState<User[]>([]);
    const [followingsList, setFollowingsList] = useState<User[]>([]);

    const rightSideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setisActive(type)
    }, [type]);

    const { id } = useParams<string>();

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`);
            if (response) {
                setUser(response.data)
                // console.log("Found User: ", response.data)
                setFollowersList(response.data.followers);
                setFollowingsList(response.data.followings);
                setFollowersCount(response.data.followers.length)
                setFollowingsCount(response.data.followings.length)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUser();
    }, [id, isFollowing])


    return (
        <>
            {/* Right Section || Content Section (Blogs, About) */}
            <div ref={rightSideRef} className="w-3/4  h-full overflow-y-auto bg-white">

                <div className="flex justify-start border-b-2 mb-4 sticky top-0 bg-white">
                    <button
                        onClick={() => { setisActive('followers'); navigate(`/profile/followers/${user._id}`) }}
                        className={`${isActive === 'followers' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}
                    >
                        Followers
                        <span className="ml-1">({followersCount})</span>
                    </button>

                    <button
                        onClick={() => { setisActive('followings'); navigate(`/profile/followings/${user._id}`) }}
                        className={`${isActive === 'followings' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}  px-6 py-4 text-base font-medium`}
                    >
                        Followings
                        <span className="ml-1">({followingsCount})</span>
                    </button>
                </div>

                {isActive === "followers" &&
                    <>
                        {
                            followersList.length > 0 ? (
                                <div className="px-6">
                                    {followersList.map((follower, index) =>
                                        <div key={index} className="group flex justify-between items-center space-x-20 border-b-2 pb-4 mt-4">
                                            <Link to={`/profile/${follower._id}`} className="flex justify-start items-center space-x-4 w-9/12">
                                                <img
                                                    src={`http://localhost:5000/uploads/${follower.profileImage}`}
                                                    alt="Profile Image"
                                                    className="h-16 w-16 rounded-full bg-gray-100 object-cover aspect-square border"
                                                />
                                                <div className="flex flex-col items-start justify-center">
                                                    <p className="text-lg font-medium">{follower.username}</p>
                                                    <p className="line-clamp-1 text-gray-600 text-sm">{follower.bio}</p>
                                                </div>
                                            </Link>

                                            <div>
                                                <Link to={`/profile/${follower._id}`} className="py-2 px-4 rounded-sm bg-[#4bb543] text-white">see Profile</Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center mt-10">
                                    <span className="text-xl">This Author has no Followers</span>
                                </div>
                            )
                        }
                    </>
                }



                {isActive === "followings" &&
                    <>
                        {followingsList.length > 0 ? (
                            <div className="px-6">
                                {followingsList.map((follower, index) =>
                                    <div key={index} className="group flex justify-between items-center space-x-20 border-b-2 pb-4 mt-4">
                                        <Link to={`/profile/${follower._id}`} className="flex justify-start items-center space-x-4 w-9/12">
                                            <img
                                                src={`http://localhost:5000/uploads/${follower.profileImage}`}
                                                alt="Profile Image"
                                                className="h-16 w-16 rounded-full bg-gray-100 object-cover aspect-square border"
                                            />
                                            <div className="flex flex-col items-start justify-center">
                                                <p className="text-lg font-medium">{follower.username}</p>
                                                <p className="line-clamp-1 text-gray-600 text-sm">{follower.bio}</p>
                                            </div>
                                        </Link>

                                        <div>
                                            <Link to={`/profile/${follower._id}`} className="py-2 px-4 rounded-sm bg-[#4bb543] text-white">see Profile</Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center mt-10">
                                <span className="text-xl">This Author has no Followings</span>
                            </div>
                        )
                        }
                    </>
                }

            </div >

        </>
    )
}

export default Followers