"use client";

import React, { useState } from "react";
import { useJobRentals } from "../../hooks/useJobRentals";
import Pagination from "../../component/Pagination";
import { Table, Column } from "../../component/Table";
import JobForm from "@/app/component/JobForm";

const JobRentalManagement: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    currentData,
    totalPages,
    loading,
    error,
    handleDelete,
    handleComplete,
    handleAdd,
  } = useJobRentals();

  const [showAddModal, setShowAddModal] = useState(false);

  const columns: Column<JobRental>[] = [
    { header: "ID", body: "id" },
    { header: "Job ID", body: "maCongViec" },
    { header: "Renter ID", body: "maNguoiThue" },
    { header: "Rental Date", body: "ngayThue" },
    {
      header: "Completed",
      body: (row) => (
        <span className={row.hoanThanh ? "text-green-600" : "text-red-600"}>
          {row.hoanThanh ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Actions",
      body: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleComplete(row.id)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Complete
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleFormSubmit = async (values: JobFormValues): Promise<void> => {
    handleAdd({
      jobId: Number(values.jobId),
      renterId: Number(values.renterId),
      completed: values.completed,
    });
    setShowAddModal(false);
  };

  return (
    <div className="my-48 container">
      <h1 className="text-2xl font-bold mb-4">Job Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Job
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <Table data={currentData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Add Job Rental</h2>
            <JobForm
              initialValues={{
                jobId: "",
                renterId: "",
                renterDate: "",
                completed: false,
              }}
              onSubmit={handleFormSubmit}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRentalManagement;
