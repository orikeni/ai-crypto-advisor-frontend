import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppState } from "../../../Redux/store";
import { userService } from "../../../Services/UserService";


function Header(): JSX.Element {

  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.user);
  
  function handleLogout() {
    userService.logout(); 
    navigate("/login");
  }

  return (
    <header className="w-full bg-sky-700 shadow-md text-white py-4">
      <div className="flex justify-center items-center relative">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          AI Crypto Advisor
        </h1>
        
      <div className="absolute right-6">
        {user ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium text-white transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-sky-300 hover:bg-sky-400 text-black rounded-md text-sm font-medium transition"
          >
            Sign In
          </Link>
        )}
      </div>
      </div>

    </header>
  );
}

export default Header;