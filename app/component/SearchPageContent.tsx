"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSearchResults, clearSearch } from "../redux/slices/searchSlice";
import Link from "next/link";

const SearchPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query));
    }
    return () => {
      dispatch(clearSearch());
    };
  }, [query, dispatch]);

  return (
    <div className="container py-24">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((job: any) => (
          <Link
            href={`/job-detail/${job.id}`}
            key={job.id}
            className="border p-4 rounded-lg shadow-md transition hover:shadow-lg"
          >
            <img src={job.congViec?.hinhAnh} alt="Job Image" />
            <div className="flex gap-2 my-4">
              <div>
                <img
                  src={job.avatar}
                  className="w-full h-full object-contain rounded-md"
                  alt="Avatar"
                />
              </div>
              <div>
                <h2>{job.tenNguoiTao}</h2>
              </div>
            </div>
            <h2 className="text-sm mb-2">{job.congViec?.tenCongViec}</h2>
            <div className="flex items-center mb-3">
              <img
                src="/icon/star-svgrepo-com.svg"
                className="w-4"
                alt="Star"
              />
              <div className="flex gap-2">
                <p className="text-sm">{job.congViec?.saoCongViec}</p>
                <p className="text-sm font-light">({job.congViec?.danhGia}+)</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Price: </span>
              USD${job.congViec?.giaTien}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPageContent;
