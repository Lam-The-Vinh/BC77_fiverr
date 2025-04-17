import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsByJob,
  resetComments,
} from "../redux/slices/commentSlice";
import { RootState, AppDispatch } from "../redux/store";

export const useComments = (maCongViec: string | number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, error } = useSelector(
    (state: RootState) => state.comments
  );

  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("mostRelevant");

  const parseDate = (rawDate: string | number): Date => {
    if (typeof rawDate !== "string") return new Date(rawDate);
    if (rawDate.includes("/")) {
      const [day, month, year] = rawDate.split("/").map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(rawDate);
  };

  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    dispatch(fetchCommentsByJob(maCongViec));
    return () => {
      dispatch(resetComments());
    };
  }, [dispatch, maCongViec]);

  const filteredComments = comments.filter((comment) => {
    const matchSearch =
      comment.tenNguoiBinhLuan
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      comment.noiDung?.toLowerCase().includes(searchText.toLowerCase());
    return matchSearch;
  });

  const sortedComments = [...filteredComments].sort((a, b) => {
    if (sortOption === "newest") {
      return (
        parseDate(b.ngayBinhLuan).getTime() -
        parseDate(a.ngayBinhLuan).getTime()
      );
    } else if (sortOption === "mostRelevant") {
      return b.saoBinhLuan - a.saoBinhLuan;
    }
    return 0;
  });

  return {
    loading,
    error,
    searchText,
    setSearchText,
    sortOption,
    setSortOption,
    sortedComments,
    formatDateToDDMMYYYY,
  };
};
