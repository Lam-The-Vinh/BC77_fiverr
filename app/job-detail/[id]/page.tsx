"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import StarRating from "../../component/StarRating";
import ReviewsSection from "../../component/ReviewsSection";
import CommentsSection from "../../component/CommentsSection";
import PurchaseModal from "../../component/PurchaseModal";
import { useJobDetail } from "../../hooks/useJobDetail";
import { showSuccess } from "../../utils/toastHelper";
import { useRequireAuth } from "../../hooks/useRequireAuth";

const JobDetailPage: React.FC = () => {
  const params = useParams();
  const requireLogin = useRequireAuth();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { jobDetail, loading, error } = useJobDetail(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maCongViec = Array.isArray(params.id) ? params.id[0] : params.id;
  const handlePurchase = () => {
    showSuccess("Purchase successful!");
  };

  if (loading) return <p className="text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;
  if (!jobDetail) return <p>No job detail available</p>;

  const rating = Number(jobDetail?.congViec?.saoCongViec) || 0;

  return (
    <div className="container my-48">
      <nav className="text-sm text-gray-500 mb-4">
        <ol className=" flex">
          <li>
            <p>
              {jobDetail.tenLoaiCongViec}
              <span className="mx-2">/</span>
            </p>
          </li>
          <li>
            <p>
              {jobDetail.tenNhomChiTietLoai}
              <span className="mx-2">/</span>
            </p>
          </li>
          <li>
            {" "}
            <p>{jobDetail.tenChiTietLoai}</p>
          </li>
        </ol>
      </nav>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
        <div className="w-full lg:w-2/3">
          <h1 className="text-2xl font-bold mb-2">
            {jobDetail.congViec.tenCongViec}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={jobDetail.avatar}
              alt={jobDetail.tenNguoiTao}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm">
              <p className="font-bold">{jobDetail.tenNguoiTao}</p>
              <div className="flex gap-2 items-center flex-wrap">
                <p className="text-gray-500">Level 2 Seller | </p>
                <StarRating
                  rating={rating}
                  totalReviews={jobDetail.congViec.danhGia}
                />
                <p>| 2 Orders in Queue</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <img
              src={jobDetail.congViec.hinhAnh}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="text-gray-700 leading-relaxed">
            <h1 className="font-bold text-2xl py-4">About this job</h1>
            <p className="mb-4">{jobDetail.congViec.moTa}</p>
          </div>
          <div className="max-w-md py-4">
            <h2 className="text-xl font-semibold mb-4">About The Seller</h2>

            <div className="flex items-center">
              <img
                src={jobDetail.avatar}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />

              <div>
                <p className="font-bold text-gray-800">
                  {jobDetail.tenNguoiTao}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {jobDetail.tenChiTietLoai}
                </p>

                <StarRating
                  rating={rating}
                  totalReviews={jobDetail.congViec.danhGia}
                />
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
                <p className="text-xl font-bold">
                  USD${jobDetail.congViec.giaTien}
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                {jobDetail.congViec.moTaNgan}
              </p>

              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li className="flex items-center">
                  <img src="/icon/tick.svg" className="w-5" alt="tick" /> Good
                  features
                </li>
                <li className="flex items-center">
                  <img src="/icon/tick.svg" className="w-5" alt="tick" /> Good
                  features
                </li>
                <li className="flex items-center">
                  <img src="/icon/tick.svg" className="w-5" alt="tick" /> Good
                  features
                </li>
                <li className="flex items-center">
                  <img src="/icon/tick.svg" className="w-5" alt="tick" />{" "}
                  Unlimited Revisions
                </li>
              </ul>

              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-center font-semibold mb-2"
                onClick={() => {
                  const isAuthenticated = requireLogin();
                  if (!isAuthenticated) return;
                  setIsModalOpen(true);
                }}
              >
                Continue USD${jobDetail.congViec.giaTien}
              </button>

              <button className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md text-center text-sm">
                Compare Packages
              </button>
            </div>
          </div>
        </div>
      </div>
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handlePurchase}
        price={jobDetail.congViec.giaTien}
      />
    </div>
  );
};

export default JobDetailPage;
