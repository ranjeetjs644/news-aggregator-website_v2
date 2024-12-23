import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

const App = () => {
    return (
        <Provider store={store}>
            <main>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </main>
        </Provider>
    );
};

export default App;
