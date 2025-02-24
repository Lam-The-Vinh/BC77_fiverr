"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { logout, setUser } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { SearchBar } from "../../component/SearchBar";

interface NavDesProps {
  isScrolled: boolean;
}

const NavDes: React.FC<NavDesProps> = ({ isScrolled }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        if (parsedUser && !user) {
          dispatch(setUser(parsedUser));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div className="border-b border-gray-200 bg-white w-full">
      <div className="px-6 py-3 text-gray-700 w-full flex justify-between items-center">
        <div className="flex justify-between items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            fiverr<span className="text-green-500">.</span>
          </Link>

          {isScrolled && (
            <div className="hidden lg:block w-full">
              <SearchBar
                placeholder="are you looking for ?"
                onSearch={handleSearch}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center gap-4">
          <Link href="#" className="hover:text-gray-900">
            Explore
          </Link>
          <Link href="#" className="hover:text-gray-900">
            English
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Become a Seller
          </Link>
          {user ? (
            <>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="hover:text-gray-900">
                  Admin
                </Link>
              )}
              <span className="font-semibold text-gray-900">
                Hello, {user.name || "User"}!
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
              <Link href="/auth/login" className="hover:text-gray-900">
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="border border-green-500 text-green-500 px-4 py-1 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>

      {isScrolled && (
        <div className="border-t py-2 flex justify-center gap-6 text-gray-600 text-[10px]">
          {loading ? (
            <p>Loading...</p>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="hover:text-gray-900 text-sm"
              >
                {category.tenLoaiCongViec}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NavDes;
