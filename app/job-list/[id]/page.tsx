"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useJobList } from "../../hooks/useJobList";

const JobListPage: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { jobs, loading, error } = useJobList(id);

  const groupName = jobs.length > 0 ? jobs[0].tenChiTietLoai : `Chi Tiết Loại ${id}`;

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container my-48">
      <h1 className="text-2xl font-bold mb-4">Job List for {groupName}</h1>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <Link
              href={`/job-detail/${job.id}`}
              key={job.id}
              className="border p-4 rounded-lg shadow-md transition hover:shadow-lg"
            >
              <img src={job.congViec?.hinhAnh} className="w-full" />
              <div className="flex gap-2 my-4">
                <div>
                  <img
                    src={job.avatar}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <div>
                  <h2>{job.tenNguoiTao}</h2>
                </div>
              </div>
              <h2 className="text-sm mb-2">{job.congViec?.tenCongViec}</h2>
              <div className="flex items-center mb-3">
                <img src="/icon/star-svgrepo-com.svg" className="w-4" />
                <div className="flex gap-2">
                  <p className="text-sm">{job.congViec?.saoCongViec}</p>
                  <p className="text-sm font-light">
                    ({job.congViec?.danhGia}+)
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Price: </span>
                USD${job.congViec?.giaTien}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobListPage;
