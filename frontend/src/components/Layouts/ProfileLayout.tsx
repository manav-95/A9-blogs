import { Outlet } from "react-router-dom"
import Profile from "../Profile"

const ProfileLayout = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto px-0 h-screen">
                <div className="flex justify-center space-x-0 h-full sticky overflow-hidden">
                    <div className="w-1/3 border-r-2 pt-6">
                        <Profile />
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ProfileLayout