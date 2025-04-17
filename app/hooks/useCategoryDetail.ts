import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchCategoryDetail, resetCategoryDetail } from "../redux/slices/categoryDetailSlice";
import { showError } from "../utils/toastHelper"; // Import toast helper

export const useCategoryDetail = (id: string | number) => {
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

  useEffect(() => {
    if (error) {
      showError(`Error: ${error}`);
    }
  }, [error]);

  return {
    detail,
    loading,
    error,
  };
};
