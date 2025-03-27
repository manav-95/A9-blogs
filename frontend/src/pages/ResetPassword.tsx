import axios from "axios"
import { useState } from "react"


const ResetPassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })

    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [e.target.name]: "", // Remove error for this field
        }));
    }

    const validateForm = () => {
        let isValid = true;
        let newErrors = { oldPassword: '', newPassword: '', confirmNewPassword: '' }

        if (!formData.oldPassword.trim()) {
            newErrors.oldPassword = 'Old Password is required';
            isValid = false;
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'New Password is required';
            isValid = false;
        }

        if (formData.newPassword.trim() !== formData.confirmNewPassword.trim()) {
            newErrors.confirmNewPassword = 'Password does not matched';
            isValid = false;
        }

        if (!formData.confirmNewPassword.trim()) {
            newErrors.confirmNewPassword = 'Confirm Password is required';
            isValid = false;
        }

        setErrors(newErrors)
        return isValid;
    }

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken') || '';
        if (validateForm()) {
            const finalData = {
                token,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            };

            console.log("Final Data: ", finalData)
            try {
                 await axios.post(`http://localhost:5000/api/users/reset-password`, finalData);

            } catch (error: any) {
                console.log("Error Reseting Password: ", error.message)
            }
        } else {
            console.log("Not Validate")
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center w-full min-h-[80vh]">
                <form onSubmit={handleResetPassword} className="bg-white p-6 rounded border flex flex-col w-full max-w-md">
                    <h1 className="text-4xl mb-3 text-center">Welcome Back</h1>
                    <input
                        type="password"
                        value={formData.oldPassword}
                        name="oldPassword"
                        placeholder="Enter Old Password"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    {errors.oldPassword && <p className="text-red-500 text-sm mb-1">{errors.oldPassword}</p>}

                    <input
                        type="password"
                        value={formData.newPassword}
                        name="newPassword"
                        placeholder="Set New Password"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    {errors.newPassword && <p className="text-red-500 text-sm mb-1">{errors.newPassword}</p>}

                    <input
                        type="password"
                        value={formData.confirmNewPassword}
                        name="confirmNewPassword"
                        placeholder="Confirm New Password"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    {errors.confirmNewPassword && <p className="text-red-500 text-sm mb-1">{errors.confirmNewPassword}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white mt-3 py-2 px-4 rounded"
                    >
                        Reset Password
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword