
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobList } from "../redux/slices/jobListSlice";
import { AppDispatch, RootState } from "../redux/store";
import { showLoading, showError, dismissToast } from "../utils/toastHelper";

export const useJobList = (id: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobList);

  useEffect(() => {
    let toastId: string | number;

    if (id) {
      toastId = showLoading("Loading job list...");

      dispatch(fetchJobList(id)).then((action) => {
        dismissToast(toastId);

        if (action.meta.requestStatus === "rejected") {
          showError("Error loading job list");
        }
      });
    }

    return () => {
      dismissToast(toastId);
    };
  }, [id, dispatch]);

  return { jobs, loading, error };
};
