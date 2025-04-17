import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchJobDetail, resetJobDetail } from "../redux/slices/jobDetailSlice";
import { showError, showLoading, dismissToast } from "../utils/toastHelper";

export const useJobDetail = (id: string | number | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobDetail, loading, error } = useSelector(
    (state: RootState) => state.jobDetail
  );

  useEffect(() => {
    let toastId: string | number | undefined;

    if (id) {
      toastId = showLoading("Loading job detail...");

      dispatch(fetchJobDetail(id)).then((action) => {
        dismissToast(toastId);

        if (fetchJobDetail.rejected.match(action)) {
          showError("Error loading job");
        }
      });
    }

    return () => {
      dispatch(resetJobDetail());
      dismissToast(toastId);
    };
  }, [id, dispatch]);

  return { jobDetail, loading, error };
};
