import { Link, useParams } from "react-router-dom";

// import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";

type User = {
    _id: String,
    username: String,
    profileImage: String,
    followers : [],
}

type ProfileProps = {
    isFollowing: boolean;
    setIsFollowing: (value: boolean) => void;
};


const Profile = ({ isFollowing, setIsFollowing }: ProfileProps) => {

    const [author, setAuthor] = useState<any>({});
    const [profileImage, setProfileImage] = useState<any>();
    // const [isFollowing, setIsFollowing] = useState<boolean>();
    const [followersCount, setFollowersCount] = useState<number>();
    const [followingList, setFollowingList] = useState<User[]>([]);


    const { id } = useParams<string>();
    const currentUserId = localStorage.getItem("userId");

    const fetchUser = async () => {
        if (!id) return;
        try {
            const user = await axios.get(`http://localhost:5000/api/users/${id}`)
            if (user) {
                //  console.log("Found User: ", user)
                setAuthor(user.data);
                setFollowingList(user.data.followings)
                setFollowersCount(user.data.followers.length)
                setProfileImage(user.data.profileImage ? `http://localhost:5000/uploads/${user.data.profileImage}` : null);
            } else {
                console.log("User not found")
            }
        } catch (error: any) {
            console.log("Error: ", error.message)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [id])

    const checkFollowingStatus = async () => {
        if (!currentUserId || !id) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${currentUserId}`);
            if (response) {
                //console.log("check following status response :", response.data);
                const isCurrentlyFollowing = response.data.followings.some(
                    (user: any) => user._id === id
                );

                setIsFollowing(isCurrentlyFollowing);
                console.log("isCurrentlyFollowing: ", isCurrentlyFollowing)
            }

        } catch (error) {
            console.error('Error checking follow status:', error);
        }
    };

    // ✅ Check Following Status
    useEffect(() => {
        checkFollowingStatus();
    }, [id, currentUserId]);


    // Follow User
    const handleFollow = async () => {
        if (!currentUserId) return;
        try {
            const { data } = await axios.put(`http://localhost:5000/api/users/follow/${id}`, {
                userId: currentUserId,
            });
            console.log("followed: ", data);

            setIsFollowing(true);
            await checkFollowingStatus();
            await fetchUser();


        } catch (error) {
            console.error('Error following user:', error);
        }
    }

    // Unfollow User
    const handleUnFollow = async () => {
        if (!currentUserId) return;
        try {
            const { data } = await axios.put(`http://localhost:5000/api/users/unfollow/${id}`, {
                userId: currentUserId,
            });
            console.log(data.message);

            setIsFollowing(false);
            await checkFollowingStatus();
            await fetchUser();


        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    }


    if (!author) {
        return <h2 className="text-center text-red-500 text-xl">Author not found</h2>;
    }

    return (
        <>

            <div className="pr-4">

                <div className="flex items-center justify-start space-x-4">
                    <img
                        src={profileImage}
                        alt={author.username}
                        className="h-24 w-24 rounded-full aspect-square object-cover border"
                    />
                    <div className="">
                        <h1 className="text-2xl font-medium">{author.username}</h1>
                        <Link to={`/profile/followers/${author._id}`} className="text-lg text-gray-600 hover:text-gray-800">{followersCount} Followers</Link>
                    </div>
                </div>


                <div className="mt-4">
                    <span className="text-gray-500 text-base font-medium">{author.bio}</span>
                </div>

                {id !== currentUserId && (
                    <div className="flex justify-end mt-3">
                        <button
                            onClick={() => {
                                if (isFollowing === true) {
                                    handleUnFollow();
                                } else {
                                    handleFollow()
                                }
                            }}
                            className="border border-black py-1 px-4 rounded-sm hover:bg-black hover:text-white transition-all saturate-75"
                        >
                            {isFollowing === true ? 'unFollow' : 'Follow'}
                        </button>
                    </div>
                )}

            </div>

            <hr className="my-4 border" />

            {followingList?.length > 0 ? (
                <div className="pr-4">
                    <h1 className="text-2xl font-medium">Following</h1>
                    <div className="flex flex-col  justify-center space-y-1.5 mt-4">
                        {followingList.slice(0, 5).map((followingUser) => (
                            <div className="flex justify-between items-center">
                                <Link to={`/profile/${followingUser?._id}`}>
                                    <div
                                        className="group flex items-center space-x-3 w-full"
                                    >
                                        <img
                                            src={`http://localhost:5000/uploads/${followingUser.profileImage}`}
                                            alt={'follower Profile Image'}
                                            className="h-12 w-12 rounded-xs object-cover aspect-square border border-gray-400 shadow"
                                        />
                                        <div className="flex flex-col justify-between">
                                        <h1 className="text-lg group-hover:underline">{followingUser.username}</h1>
                                        <span className="text-[#242424] opacity-[0.6] text-sm">{followingUser.followers.length} Followers</span>
                                        </div>
                                    </div>
                                </Link>
                                {/* <button><BsThreeDots className="h-6 w-6 text-gray-500 hover:text-gray-900" /></button> */}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6">
                        <Link to={`/profile/followings/${author._id}`} className="text-lg text-gray-600 hover:text-gray-800">see all ({followingList.length})</Link>
                    </div>

                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <h1>The Author Not followed any other Author</h1>
                </div>
                )
            }

        </>
    )
}

export default Profile