import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { useMyProvider } from '../contextApi/ContextApi';
import { Alert, Button } from '@mui/material';
import { baseURL } from '../utils/baseURL';

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setLoading: providerLoading } = useMyProvider();

    const resetForm = () => {
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
    }


    const handleRegister = async () => {
        const userInfo = {
            name, email, password, confirmPassword
        }


        try {
            const response = await fetch(`${baseURL}/api/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Login failed!');
            }

            setLoading(false);
            resetForm();

            const { data } = result;
            localStorage.setItem("token", JSON.stringify(data));
            providerLoading(true);

        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }

    }


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) return setError("password not matched.");
        setLoading(true);
        handleRegister();
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">Register</h2>
                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2] outline-none transition-all"
                                placeholder="example@gmail.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2] outline-none transition-all"
                                placeholder="example@gmail.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2] outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2] outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center">
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>

                        <Button
                            variant='contained'
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer">
                            {
                                loading ? "Logging..." : "Sign Up"
                            }
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Have an account?
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
