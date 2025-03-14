import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Icons
import { FiEdit } from "react-icons/fi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";

const Navbar = () => {
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>('');
    const [isPopoverVisible, setPopoverVisible] = useState<boolean>(false)
    const [user, setUser] = useState<any>({});

    const popOverRef = useRef<HTMLDivElement>(null);


    // Close PopOver when Click outside PopOver
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (popOverRef.current && !popOverRef.current.contains(event.target)) {
                setPopoverVisible(false);
            }
        };

        // Attach event listener
        window.addEventListener("click", handleClickOutside);

        return () => {
            // Cleanup event listener
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);


    const fetchLoggedInUser = async (userId: any) => {
        const id = typeof userId === 'object' ? userId._id : userId;
        const token = localStorage.getItem('accessToken');
      //  console.log(userId)
        if (!token) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`);

            if (response.data) {
                setUser(response.data);
                // console.log("User Data: ", response.data);
            }

            // Set profile image if available
            if (response.data.profileImage) {
                setProfileImage(`http://localhost:5000/uploads/${response.data.profileImage}`);
            }

        } catch (error) {

        }
    }

    // Check token and get user on load
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            setLoggedIn(true);

            try {
                const decoded: any = jwtDecode(token);
               // console.log("✅ Decoded Token: ", decoded);

                if (decoded?.id || decoded?._id) {
                    fetchLoggedInUser(decoded?.id || decoded?._id); // Pass directly
                }
                else {
                    console.error("❌ No user ID found in token");
                }
            } catch (error) {
                console.error("❌ Error decoding token:", error);
                setLoggedIn(false); // Reset login state if token is invalid
            }
        } else {
            setLoggedIn(false);
        }
    }, []);


    // If the user is logged then only he can write blogs else it navigate to login
    const handleWrite = () => {
        if (loggedIn) {
            navigate('/add-blog');
        } else {
            navigate('/login');
        }
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId')
        setLoggedIn(false);
        navigate('/login');
    };

    return (
        <>
            <div className="w-full bg-white fixed top-0 left-0 right-0 z-50 shadow px-8 py-4">
                <div className="flex justify-between items-center">

                    <div>
                        <button onClick={() => { window.location.reload() }} className="text-4xl font-medium uppercase">A<sub>9</sub> Blogs</button>
                    </div>

                    <div className="flex items-center justify-center space-x-8">

                        <button
                            onClick={() => navigate(`/`)}
                            className="text-xl text-gray-500"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => navigate(`/blogs`)}
                            className="text-xl text-gray-500"
                        >
                            Blogs
                        </button>

                        <button onClick={handleWrite} className="flex items-center space-x-2 text-gray-500 hover:text-black">
                            <FiEdit className="h-6 w-6" />
                            <span className="text-xl">Write</span>
                        </button>

                        <div className="relative flex items-center bg-gray-100 pl-4 rounded-full">
                            <button>
                                <HiMiniMagnifyingGlass className="h-7 w-7" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search"
                                className=" max-w-60 py-2.5 px-4 bg-inherit rounded-full outline-none placeholder-gray-500 text-lg"
                            />
                        </div>


                        {loggedIn ? (
                            <div ref={popOverRef} className="relative h-12 w-12 flex items-center justify-center">
                                <button onClick={() => setPopoverVisible(!isPopoverVisible)}>
                                    <img
                                        src={profileImage}
                                        alt="profile"
                                        className="h-full w-full border rounded-md aspect-square object-cover object-top"

                                    />
                                </button>
                                {isPopoverVisible &&
                                    <div className="absolute min-w-80 -left-64 top-14 bg-white shadow px-4">
                                        <Link onClick={() => setPopoverVisible(false)} to={`/profile/${user?._id}`} className="w-full flex items-center justify-start px-4 space-x-3 text-gray-500 hover:text-gray-900">
                                            <FaRegUser className="h-5 w-5" />
                                            <span className="text-lg font-medium py-5">Profile</span>
                                        </Link>
                                        <hr className="border" />
                                        <button onClick={() => { handleLogout(); setPopoverVisible(false) }} className="flex flex-col items-start py-4 px-4 group w-full">
                                            <h1 className="flex items-center text-lg font-medium text-gray-500 group-hover:text-gray-900 mb-1.5"><PiSignOut className="h-6 w-6 mr-2" /> Sign Out</h1>
                                            <p className=" text-gray-500">{user?.email}</p>
                                        </button>
                                    </div>
                                }
                            </div>
                        )
                            : (
                                <>
                                    <button onClick={() => { navigate('/login') }} className="flex items-center space-x-2">
                                        <FaRegUser className="h-5 w-5" />
                                        <span className="text-gray-700">SignUp / SignIn</span>
                                    </button>
                                </>
                            )
                        }

                    </div>

                </div>
            </div >
        </>
    )
}

export default Navbar