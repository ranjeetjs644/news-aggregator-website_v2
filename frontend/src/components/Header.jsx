import React from 'react';
import { Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';


const Header = () => {
    const { isAuthenticated, } = useSelector(state => state.auth);
    const categories = [
        'Home',
        'Politics',
        'Technology',
        'Business',
        'Sports',
        'Entertainment',
        'Health'
    ];

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <h1 className="text-lg md:text-2xl font-bold text-gray-800">NewsDaily</h1>
                    </div>

                    {/* Desktop Category Links */}
                    <div className="hidden md:flex">
                        <nav className="flex items-center space-x-4 text-sm">
                            {categories.map((category, index) => (
                                <>
                                    <Link
                                        key={category}
                                        to={category.toLowerCase() === "home" ? "/" : `/${category.toLowerCase()}`}
                                        className="text-gray-500 hover:text-gray-800 transition-colors duration-200 whitespace-nowrap"
                                    >
                                        {category}
                                    </Link>
                                    {index < categories.length - 1 && (
                                        <span className="text-gray-300">•</span>
                                    )}
                                </>
                            ))}
                        </nav>
                    </div>

                    {/* Search Bar and User Profile */}
                    <div className="flex items-center ml-2 space-x-4 md:space-x-6">
                        <div className="relative flex items-center w-full max-w-xs md:max-w-sm">
                            <Search className="absolute left-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search news..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
                            />
                        </div>

                        <div>
                            {isAuthenticated ? (
                                <Link to="/profile">
                                    <User />
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <User />
                                </Link>
                            )}
                        </div>
                        <div>
                            {
                                isAuthenticated && (
                                    <button
                                        className='cursor-pointer'
                                        onClick={handleLogout}
                                    >
                                        logout
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Mobile Category Links */}
                <div className="md:hidden overflow-x-auto py-3">
                    <nav className="flex items-center space-x-4 text-sm">
                        {categories.map((category, index) => (
                            <>
                                <Link
                                    key={category}
                                    to={category.toLowerCase() === "home" ? "/" : `/${category.toLowerCase()}`}
                                    className="text-gray-500 hover:text-gray-800 transition-colors duration-200 whitespace-nowrap"
                                >
                                    {category}
                                </Link>
                                {index < categories.length - 1 && (
                                    <span className="text-gray-300">•</span>
                                )}
                            </>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
