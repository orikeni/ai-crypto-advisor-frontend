import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { UserModel } from "../../../models/UserModel";
import { userService } from "../../../Services/UserService";


export default function RegisterPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>({ id: 0, name: "", email: "", password: "" });
    const [error, setError] = useState<string>("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await userService.register(user);
            navigate("/preferences"); 
        } catch {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-md bg-white border-2 border-gray-400 rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-sky-700">
          Join the Crypto World !
        </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={user.password || ""}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-sky-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}