import { FiEdit } from "react-icons/fi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";

import ProfileImage from '/profile-example-2.png'
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const navigate = useNavigate();

    const [isPopoverVisible, setPopoverVisible] = useState(false)

    const popOverRef = useRef<HTMLDivElement>(null);

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

    return (
        <>
            <div className="w-full bg-white fixed top-0 left-0 right-0 z-50 shadow px-8 py-4">
                <div className="flex justify-between items-center">

                    <div>
                        <button onClick={() => { window.location.reload() }} className="text-4xl font-medium uppercase">A<sub>9</sub> Blogs</button>
                    </div>

                    <div className="flex items-center justify-center space-x-8">

                        <button onClick={() => navigate(`/add-blog`)} className="flex items-center space-x-2 text-gray-500 hover:text-black">
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



                        <div ref={popOverRef} className="relative h-12 w-12 flex items-center justify-center">
                            <button onClick={() => setPopoverVisible(!isPopoverVisible)}>
                                <img
                                    src={ProfileImage}
                                    alt="profile image"
                                    className="h-full w-full rounded-md aspect-square object-cover object-top"
                                />
                            </button>
                            {isPopoverVisible &&
                                <div className="absolute min-w-80 -left-64 top-14 bg-white shadow px-4">
                                    <div className="flex items-center justify-start px-4 space-x-3 text-gray-500 hover:text-gray-900">
                                        <FaRegUser className="h-5 w-5" />
                                        <p className="text-lg font-medium py-5">Profile</p>
                                    </div>
                                    <hr className="border" />
                                    <button className="flex flex-col items-start py-4 px-4 group w-full">
                                        <h1 className="flex items-center text-lg font-medium text-gray-500 group-hover:text-gray-900 mb-1.5"><PiSignOut className="h-6 w-6 mr-2" /> Sign Out</h1>
                                        <p className=" text-gray-500">a9*******@gmail.com</p>
                                    </button>
                                </div>
                            }
                        </div>

                    </div>

                </div>
            </div >
        </>
    )
}

export default Navbar