"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCategoryDetail, resetCategoryDetail } from "../../redux/slices/categoryDetailSlice";
import Link from "next/link";

const CategoryDetailPage: React.FC = () => {
  const params = useParams(); 
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const dispatch = useDispatch<AppDispatch>();
  const { detail, loading, error } = useSelector((state: RootState) => state.categoryDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryDetail(id));
    }
    return () => {
      dispatch(resetCategoryDetail());
    };
  }, [id, dispatch]);

  if (loading) return <div className="container py-4">Loading...</div>;
  if (error) return <div className="container py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container py-24">
      {detail && Array.isArray(detail.dsNhomChiTietLoai) ? (
        <div className="bg-white py-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">{detail.tenLoaiCongViec}</h1>

          <div className="grid grid-cols-2 gap-4">
            {detail.dsNhomChiTietLoai.map((nhom) => (
              <div key={nhom.id} className="border p-4 rounded-lg shadow">
                <img
                  src={nhom.hinhAnh}
                  alt={nhom.tenNhom}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h2 className="text-xl font-semibold">{nhom.tenNhom}</h2>

                {Array.isArray(nhom.dsChiTietLoai) && nhom.dsChiTietLoai.length > 0 && (
                  <ul className="mt-2 list-disc list-inside">
                    {nhom.dsChiTietLoai.map((chiTiet) => (
                      <li key={chiTiet.id} className="ml-4">
                        <Link href={`/job-list/${chiTiet.id}`} className="hover:text-gray-500 text-sm">{chiTiet.tenChiTiet}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
};

export default CategoryDetailPage;
