"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../component/Pagination";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  fetchJobRentals,
  deleteJobRental,
  completeJobRental,
  addJobRental,
  JobRental,
} from "../../redux/slices/jobsSlice";
import { Table, Column } from "../../component/Table";
import JobForm, { JobFormValues } from "../../component/JobForm";

const JobRentalManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    dispatch(fetchJobRentals());
  }, [dispatch]);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / pageSize);

  const handleDelete = (id: number) => {
    dispatch(deleteJobRental(id));
  };

  const handleComplete = (rentalId: number) => {
    dispatch(completeJobRental(rentalId));
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleFormSubmit = (values: JobFormValues) => {
    dispatch(
      addJobRental({
        maCongViec: Number(values.jobId),
        maNguoiThue: Number(values.renterId),
        ngayThue: new Date().toISOString(),
        hoanThanh: values.completed,
      })
    );
    setShowAddModal(false);
  };

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

  return (
    <div className="my-48 container">
      <h1 className="text-2xl font-bold mb-4">Job Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
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
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRentalManagement;
