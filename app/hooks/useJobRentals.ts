
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobRentals,
  deleteJobRental,
  completeJobRental,
  addJobRental,
} from "../redux/slices/jobsSlice";
import { AppDispatch, RootState } from "../redux/store";
import { showSuccess, showError, showLoading, dismissToast } from "../utils/toastHelper";

export const useJobRentals = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.jobs);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / pageSize);

  useEffect(() => {
    dispatch(fetchJobRentals());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteJobRental(id));
    showSuccess("Job deleted successfully!");
  };

  const handleComplete = (rentalId: number) => {
    dispatch(completeJobRental(rentalId));
    showSuccess("Job completed successfully!");
  };

  const handleAdd = (jobDetails: { jobId: number; renterId: number; completed: boolean }) => {
    dispatch(
      addJobRental({
        maCongViec: jobDetails.jobId,
        maNguoiThue: jobDetails.renterId,
        ngayThue: new Date().toISOString(),
        hoanThanh: jobDetails.completed,
      })
    );
    showSuccess("Job added successfully!");
  };

  return {
    currentPage,
    setCurrentPage,
    currentData,
    totalPages,
    loading,
    error,
    handleDelete,
    handleComplete,
    handleAdd,
  };
};
