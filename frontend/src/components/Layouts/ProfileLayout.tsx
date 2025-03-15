import { Outlet } from "react-router-dom"
import Profile from "../Profile"
import { useState } from "react";

const ProfileLayout = () => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    return (
        <>
            <div className="max-w-7xl mx-auto px-0 h-screen">
                <div className="flex justify-center space-x-0 h-full sticky overflow-hidden">
                    <div className="w-1/3 border-r-2 pt-6">
                        <Profile isFollowing={isFollowing} setIsFollowing={setIsFollowing} />
                    </div>
                    <Outlet context={{ isFollowing, setIsFollowing }} key={isFollowing.toString()} />
                </div>
            </div>
        </>
    )
}

export default ProfileLayout