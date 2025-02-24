"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetail, resetJobDetail } from "../../redux/slices/jobDetailSlice";
import { RootState, AppDispatch } from "../../redux/store";
import StarRating from "../../component/StarRating"
import ReviewsSection from "../../component/ReviewsSection";
import CommentsSection from "../../component/CommentsSection";

const JobDetailPage: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const dispatch = useDispatch<AppDispatch>();
  const { detail, loading, error } = useSelector((state: RootState) => state.jobDetail);
  const maCongViec = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchJobDetail(id));
    }
    return () => {
      dispatch(resetJobDetail());
    };
  }, [id, dispatch]);

  if (loading) return <p className="container py-24">Loading job detail...</p>;
  if (error) return <p className="container py-24 text-red-500">Error: {error}</p>;

  if (!detail) return <p>No job detail available</p>;

  const stars = [1, 2, 3, 4, 5];
  const rating = Number(detail?.congViec?.saoCongViec) || 0;

  return (
    <div className="container py-24">
        <nav className="text-sm text-gray-500 mb-4">
        <ol className="list-reset flex">
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Graphics & Design
            </a>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Logo & Brand Identity
            </a>
            <span className="mx-2">/</span>
          </li>
          <li>Logo Design</li>
        </ol>
      </nav>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
        <div className="w-full lg:w-2/3">
          <h1 className="text-2xl font-bold mb-2">
            {detail.congViec.tenCongViec}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={detail.avatar}
              alt={detail.tenNguoiTao}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm">
              <p className="font-bold">{detail.tenNguoiTao}</p>
              <div className="flex gap-2 items-center flex-wrap">
              <p className="text-gray-500">Level 2 Seller | </p>
              <StarRating rating={rating} totalReviews={detail.congViec.danhGia}/>
                <p>| 2 Orders in Queue</p>
                </div>
            </div>
          </div>

          <div className="mb-4">
            <img
              src={detail.congViec.hinhAnh}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="text-gray-700 leading-relaxed">
            <h1 className="font-bold text-2xl py-4">About this job</h1>
            <p className="mb-4">
                {detail.congViec.moTa}
            </p>
          </div>
          <div className="max-w-md py-4">
      <h2 className="text-xl font-semibold mb-4">About The Seller</h2>

      <div className="flex items-center">
        <img
          src={detail.avatar}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />

        <div>
          <p className="font-bold text-gray-800">{detail.tenNguoiTao}</p>
          <p className="text-sm text-gray-500 mb-2">{detail.tenChiTietLoai}</p>

          <StarRating rating={rating} totalReviews={detail.congViec.danhGia}/>
        </div>
      </div>

      <button className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
        Contact Me
      </button>
    </div>
    <div className="container mx-auto p-4">

      <ReviewsSection jobId={id!} />
    </div>
    {maCongViec && <CommentsSection maCongViec={maCongViec} />}
        </div>

        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex border-b border-gray-200">
              <button className="flex-1 py-2 text-center text-gray-700 font-semibold border-b-2 border-green-500">
                Basic
              </button>
              <button className="flex-1 py-2 text-center text-gray-500">
                Standard
              </button>
              <button className="flex-1 py-2 text-center text-gray-500">
                Premium
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <p className="text-gray-600 text-2xl font-bold">Basic</p>
                <p className="text-xl font-bold">USD${detail.congViec.giaTien}</p>
              </div>
              <p className="text-gray-700 mb-4">
                {detail.congViec.moTaNgan}
              </p>

              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li>✔️ Good features</li>
                <li>✔️ Good features</li>
                <li>✔️ Good features</li>
                <li>✔️ Unlimited Revisions</li>
              </ul>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-center font-semibold mb-2">
                Continue USD${detail.congViec.giaTien}
              </button>

              <button className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md text-center text-sm">
                Compare Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
