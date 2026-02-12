import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Matches your requirement
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Matches your backend response keys: access_token, refresh_token
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('token_type', data.token_type);

                console.log('Login successful');
                navigate('/');
            } else {
                // Handles backend error messages (usually in 'detail' field for FastAPI)
                setError(data.detail || 'Invalid email or password');
            }
        } catch (err) {
            setError('Cannot connect to server. Ensure backend is running on port 8000.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_type');
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 relative">
            <button
                onClick={handleLogout}
                className="absolute top-6 right-6 px-4 py-2 bg-neutral-800/50 hover:bg-neutral-800 text-gray-400 hover:text-white rounded-lg text-sm font-medium transition-all border border-white/5 hover:border-white/10"
            >
                Log Out
            </button>
            <div className="max-w-md w-full space-y-8 bg-neutral-900/50 p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
                <div>
                    <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">C</span>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Sign in to your account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg text-center text-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={credentials.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;