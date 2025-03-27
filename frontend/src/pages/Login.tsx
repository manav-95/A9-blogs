import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = ({ setLoggedIn }: { setLoggedIn: (state: boolean) => void }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const validateForm = () => {
        let valid = true;
        let newErrors = { email: '', password: '' };

        // Check if fields are empty
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        // Email Validation
        if (formData.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        // Password validation (minimum 8 characters)
        if (formData.password && formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email: formData.email,
                password: formData.password,
            }, {
                withCredentials: true,
            });

            localStorage.setItem("accessToken", response.data.user.token);
            localStorage.setItem("userId", response.data.user._id)
            console.log("Login Successful");
            console.log("Access Token: ", response.data.user);
            setLoggedIn(true);

            // Reset form & errors on success
            setFormData({ email: '', password: '' });
            setErrors({ email: '', password: '' });

            navigate('/');

        } catch (error: any) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: error.response?.data?.message || "Something went wrong",
            }));
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center w-full min-h-[80vh]">
                <form onSubmit={handleLogin} className="bg-white p-6 rounded border flex flex-col w-full max-w-md">
                    <h1 className="text-4xl mb-3 text-center">Welcome Back</h1>
                    <input
                        type="email"
                        value={formData.email}
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-1">{errors.email}</p>}

                    <input
                        type="password"
                        value={formData.password}
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        className="w-full bg-gray-100 mb-1 mt-3 py-2 px-4 rounded"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-1">{errors.password}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white mt-3 py-2 px-4 rounded"
                    >
                        Sign in
                    </button>
                    <Link to={'/register'} className="mt-3 text-center hover:text-blue-500 transition-colors">
                        Don't have an account? Register
                    </Link>
                    <Link to={'/reset-password'} className="mt-3 text-center hover:text-blue-500 transition-colors">
                        Forgot password?
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
