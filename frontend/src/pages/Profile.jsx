import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // If not authenticated, return null to prevent rendering
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 -mt-10">
            <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Profile</h2>
                {user && (
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Full Name: {user.fullname}</h3>
                        <p className="text-sm text-gray-500">Email: {user.email}</p>
                    </div>
                )}

                {/* Bookmarks Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700">Bookmarks</h3>
                    {user.bookmarks && user.bookmarks.length > 0 ? (
                        <ul className="mt-2 list-disc pl-5">
                            {user.bookmarks.map((bookmark, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    {bookmark}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No bookmarks available.</p>
                    )}
                </div>

                {/* Preferences Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700">Preferences</h3>
                    <div className="mt-2">
                        <p className="text-sm font-medium text-gray-600">Categories:</p>
                        {user.preferences?.categories.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {user.preferences.categories.map((category, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No categories selected.</p>
                        )}
                    </div>
                    <div className="mt-2">
                        <p className="text-sm font-medium text-gray-600">Sources:</p>
                        {user.preferences?.sources.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {user.preferences.sources.map((source, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        {source}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No sources selected.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
