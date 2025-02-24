"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { RootState, AppDispatch } from "../redux/store";
import Link from "next/link";

const Categories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="container flex flex-wrap justify-center gap-4 py-4 bg-gray-100 rounded-lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        categories.map((category) => (
          <Link
            href={`/category/${category.id}`}
            key={category.id}
            className="p-4 bg-white rounded-xl shadow-md transition hover:shadow-lg flex items-center justify-center text-gray-800 text-sm font-medium"
            >
              {category.tenLoaiCongViec}
            </Link>
        ))
      )}
    </div>
  );
};

export default Categories;
