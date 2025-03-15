import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {

    const [image, setImage] = useState<any>(null);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
    })

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
    })

    const validateForm = () => {
        let valid = true;
        let newErrors = { username: '', email: '', password: '', confirmPassword: '', bio: '' }

        // Check if fields are empty
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm Password is required';
            valid = false;
        }
        if (!formData.bio.trim()) {
            newErrors.bio = 'Bio is required';
            valid = false;
        }

        // Email Validation
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        // Password validation (minimum 8 characters)
        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
            valid = false;
        }

        // Confirm Password Check
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleFileChange = (e: any) => {
        if (e.target.files.length > 0) {
            const file: File = e.target.files[0];
            console.log("type of file", typeof file)
            setImage(file);
        }
    }

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        const role = 'user';
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post("http://localhost:5000/api/users/register", {
                role: role,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                image: image,
                bio: formData.bio
            },
                {
                    headers: { "Content-Type": "multipart/form-data", }
                }
            );

            console.log("Response: ", response.data);

            // Reset form & errors on success
            setFormData({ username: '', email: '', password: '', confirmPassword: '', bio: '' });
            setErrors({ username: '', email: '', password: '', confirmPassword: '', bio: '' });

            navigate('/login');

        } catch (error: any) {
            console.error("Full Error: ", error);
            console.error("Error Response: ", error.response);
            setErrors({ ...errors, email: error.response?.data?.message || "Something went wrong" });
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center w-full min-h-[80vh]">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded border flex flex-col w-full max-w-xl">
                    <h1 className="text-4xl mb-3 text-center">Welcome User</h1>
                    <input
                        type="text"
                        value={formData.username}
                        name="username"
                        placeholder="Enter Username"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    {errors.username && <p className="text-red-500 text-sm mb-1">{errors.username}</p>}
                    <input
                        type="text"
                        value={formData.bio}
                        name="bio"
                        placeholder="Enter bio [ max 100 letters ]"
                        maxLength={100}
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    {errors.bio && <p className="text-red-500 text-sm mb-1">{errors.bio}</p>}

                    <input
                        type="text"
                        value={formData.email}
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    {errors.email && <p className="text-red-500 text-sm mb-1">{errors.email}</p>}
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        placeholder="choose Image"
                        onChange={handleFileChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    <input
                        type="text"
                        value={formData.password}
                        name="password"
                        placeholder="Set Password"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    {errors.password && <p className="text-red-500 text-sm mb-1">{errors.password}</p>}
                    <input
                        type="text"
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"

                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mb-1">{errors.confirmPassword}</p>}
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white mt-3 py-2 px-4 rounded"
                    >
                        Sign up
                    </button>
                    <Link to={'/login'} className="mt-3 text-center hover:text-blue-500 transition-colors">
                        Already have an account? Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Registration;
