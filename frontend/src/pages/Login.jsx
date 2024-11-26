import React from 'react';
import { Lock, User } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to NewsDaily</h2>
                <form>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-all"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-gray-800 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
