import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        'fullname': "",
        'email': "",
        'password': ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make sure formData contains the required fields
            const response = await axios.post(
                'wregister',
                formData, // Pass formData as the body
                { headers: { 'Content-Type': 'application/json' } } // Set headers
            );
            const { accessToken, refreshToken } = response.data.data;

            // Store tokens in cookies
            document.cookie = `accessToken=${accessToken}; path=/`;
            document.cookie = `refreshToken=${refreshToken}; path=/`;

            // Redirect to profile page
            navigate('/profile');
        } catch (error) {
            console.error("Error registering user:", error.response?.data || error.message);
        }
    };


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 -mt-10">
            <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <footer className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-gray-800 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Register;
