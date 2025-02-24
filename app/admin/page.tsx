"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="container flex justify-around flex-col items-center lg:flex-row my-24">
      <Link
        href="/admin/users"
        className="border p-4 rounded-lg shadow-md transition hover:shadow-lg"
      >
        <div>
          <img
            src="/img/user-management.png"
            alt="user"
            className="w-[350px] h-[350px] object-contain p-4"
          />
          <h1 className="text-xl mt-5 mb-5 text-center">User Management</h1>
        </div>
      </Link>
      <Link
        href="/admin/jobs"
        className="border p-4 rounded-lg shadow-md transition hover:shadow-lg"
      >
        <div>
          <img
            src="/img/job-management.png"
            alt="job-management"
            className="w-[350px] h-[350px] object-contain p-4 rounded-5xl"
          />
          <h1 className="text-xl mt-5 mb-5 text-center">Job Management</h1>
        </div>
      </Link>
    </div>
  );
}
