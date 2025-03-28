import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ResetPasswordByEmail = () => {

    const navigate = useNavigate();

    const [emailActive, setEmailActive] = useState<boolean>(true)
    const [otpActive, setOtpActive] = useState<boolean>(false)
    const [newPassActive, setNewPassActive] = useState<boolean>(false)

    const [submitting, setSubmitting] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmNewPassword: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmNewPassword: '',
    })

    // Function to validate inputs fields are properly filled or not before submitting form
    const validateForm = () => {
        let isValid = true;
        let newErrors = { email: '', otp: '', newPassword: '', confirmNewPassword: '', }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else {
            setSubmitting(true)
        }


        if (otpActive && !formData.otp.trim()) {
            newErrors.otp = 'Need OTP To Verify';
            isValid = false;
        }

        if (newPassActive && !formData.newPassword.trim()) {
            newErrors.newPassword = 'New Password is required';
            isValid = false;
        }

        if (newPassActive && !formData.confirmNewPassword.trim()) {
            newErrors.confirmNewPassword = 'Confirm Password is required';
            isValid = false;
        }

        if (newPassActive && formData.newPassword.trim() !== formData.confirmNewPassword.trim()) {
            newErrors.confirmNewPassword = 'Password does not Match';
            isValid = false;
        }

        setErrors(newErrors)
        return isValid;
    }

    // Function for show and hide errors and set empty input fields
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [e.target.name]: "", // Remove error for this field
        }));
    }

    // Function to send otp
    const handleSendOTP = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post(`http://localhost:5000/api/users/send-reset-otp`, formData)
                alert('OTP SENT SUCCESSFULLY')
                setSubmitting(false)
                setOtpActive(true)
                setEmailActive(false)
            } catch (error: any) {
                if (error.response && error.response.data) {
                    console.log("Backend Errors: ", error.response.data);
                    setErrors({
                        email: error.response.data.error,
                        otp: '',
                        newPassword: '',
                        confirmNewPassword: '',
                    });
                } else {
                    console.log("Error Sending OTP: ", error.message)
                }
            }
        } else {
            console.log("Not Validate")
        }
    }

    // Function for verifying otp
    const handleVerifyOTP = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post(`http://localhost:5000/api/users/verify-otp`, formData)
                alert('OTP VERIFICATION SUCCESSFULLY')
                setOtpActive(false)
                setNewPassActive(true)
            } catch (error: any) {
                if (error.response && error.response.data) {
                    console.log("Backend Errors: ", error.response.data);
                    setErrors({ otp: error.response.data.message, email: '', newPassword: '', confirmNewPassword: '' });
                } else {
                    console.log("Error Verifying OTP: ", error.message)
                }
            }
        } else {
            console.log("Not Validate")
        }
    }

    // Function to change password
    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post(`http://localhost:5000/api/users/reset-password`, formData)
                alert('PASSWORD CHANGED SUCCESSFULLY')
                navigate(`/`)
                setNewPassActive(false)
            } catch (error: any) {
                if (error.response && error.response.data) {
                    console.log("Backend Errors: ", error.response.data);
                    setErrors({ otp: '', email: '', newPassword: error.response.data.message, confirmNewPassword: error.response.data.message });
                } else {
                    console.log("Error Changing Password: ", error.message)
                }
            }
        } else {
            console.log("Not Validate")
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center w-full min-h-[80vh]">

                {emailActive && (
                    <>
                        <form onSubmit={handleSendOTP} className="bg-white p-6 rounded border flex flex-col w-full max-w-md">
                            <h1 className="text-4xl mb-3 text-center">Verify To Proceed</h1>
                            <input
                                type="email"
                                value={formData.email}
                                name="email"
                                placeholder="Enter Email"
                                onChange={handleChange}
                                className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                            />
                            {errors.email && <p className="text-red-500 text-sm mb-1">{errors.email}</p>}


                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white mt-3 py-2 px-4 rounded"
                            >{submitting ? (
                                <span className={`${submitting === true ? "animate-spin border-4 border-t-transparent border-white rounded-full w-6 h-6 inline-block" : ""}`}></span>
                            ) : (
                                "send OTP"
                            )}

                            </button>
                        </form>
                    </>
                )}

                {otpActive && (
                    <>
                        <form onSubmit={handleVerifyOTP} className="bg-white p-6 rounded border flex flex-col w-full max-w-md">
                            <h1 className="text-4xl mb-3 text-center">Verify OPT</h1>
                            <input
                                type="tel"
                                maxLength={4}
                                value={formData.otp}
                                name="otp"
                                placeholder="Enter OTP"
                                onChange={handleChange}
                                className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                            />
                            {errors.otp && <p className="text-red-500 text-sm mb-1">{errors.otp}</p>}


                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white mt-3 py-2 px-4 rounded"
                            >
                                submit
                            </button>
                        </form>
                    </>
                )}

                {newPassActive && (
                    <form onSubmit={handleResetPassword} className="bg-white p-6 rounded border flex flex-col w-full max-w-md">
                        <h1 className="text-4xl mb-3 text-center">Reset Password</h1>
                        <input
                            type="password"
                            value={formData.newPassword}
                            name="newPassword"
                            placeholder="Enter New Password"
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
                )}

            </div>
        </div>
    )
}

export default ResetPasswordByEmail;