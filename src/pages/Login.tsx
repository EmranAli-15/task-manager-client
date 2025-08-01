import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { useMyProvider } from "../contextApi/ContextApi";
import { Alert, Button } from "@mui/material";
import { baseURL } from "../utils/baseURL";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { setLoading: providerLoading } = useMyProvider();



    const handleLogin = async () => {
        const data = {
            email, password
        };
        setError("");

        try {
            const response = await fetch(`${baseURL}/api/loginUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Login failed!');
            }

            setLoading(false);
            setEmail("");
            setPassword("");


            const { token } = result.data;
            localStorage.setItem("token", JSON.stringify(token));
            providerLoading(true);

        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    }


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        handleLogin();


        // fetch('http://localhost:5000/api/loginUser', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => {
        //         if (!res.ok) {
        //             return res.json()
        //                 .then(err => {
        //                     throw new Error(err.message || 'Something went wrong!');
        //                 });
        //         }
        //         return res.json();
        //     })
        //     .then(result => {
        //         setLoading(false);
        //         console.log(result)
        //     })
        //     .catch(error => {
        //         setLoading(false);
        //         console.log(error.message)
        //     })
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">Sign In</h2>
                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2] outline-none transition-all"
                                placeholder="your@gmail.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2] outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center">
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer">
                            {
                                loading ? "Logging..." : "Sign In"
                            }
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
