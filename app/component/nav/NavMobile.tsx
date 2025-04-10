"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

const NavMobile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div className="md:hidden bg-white shadow-md">
      <div className="flex flex-col space-y-3 p-4 text-gray-700">
        <Link href="#" className="hover:text-gray-900">Fiverr Pro</Link>
        <Link href="#" className="hover:text-gray-900">Explore</Link>
        <Link href="#" className="hover:text-gray-900">English</Link>
        <Link href="#" className="hover:text-gray-900">Become a Seller</Link>

        {user ? (
            <>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="hover:text-gray-900">
                  Admin
                </Link>
              )}
              <span className="font-semibold text-gray-900">
                Hello, {user.name}!
              </span>
              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-4 py-1 rounded-full hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
          <>
            <Link href="/login" className="hover:text-gray-900">Sign in</Link>
            <Link href="/register" className="border border-green-500 text-green-500 px-4 py-1 rounded hover:bg-green-500 hover:text-white transition">
              Join
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavMobile;
