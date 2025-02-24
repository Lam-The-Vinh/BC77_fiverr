"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByJob, resetComments } from "../redux/slices/commentSlice";
import { RootState, AppDispatch } from "../redux/store";
import StarRating from "./StarRating";

interface CommentsSectionProps {
  maCongViec: string | number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ maCongViec }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchCommentsByJob(maCongViec));
    return () => {
      dispatch(resetComments());
    };
  }, [dispatch, maCongViec]);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  let filteredComments = comments.filter((c) => {
    const matchSearch =
    (c.tenNguoiBinhLuan || "").toLowerCase().includes(searchText.toLowerCase()) ||
    (c.noiDung || "").toLowerCase().includes(searchText.toLowerCase());
    return matchSearch
  });

  return (
    <div>
    <h1 className="font-bold text-2xl">Filter</h1>
      <div className="flex gap-2 py-4">
        <input
          type="text"
          placeholder="Search comments"
          className="border rounded px-3 py-2 flex-1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="border p-2 rounded bg-gray-100 hover:bg-gray-200">
          🔍
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <span>Sort By</span>
          <select
            className="border rounded px-2 py-1"
          >
            <option value="mostRelevant">Most relevant</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>

      {filteredComments.map((comment) => (
        <div key={comment.id} className="border rounded p-4 mb-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={comment.avatar}
              alt={comment.tenNguoiBinhLuan}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-semibold">{comment.tenNguoiBinhLuan}</span>
          </div>

          <div className="flex items-center gap-2">
            <StarRating rating={comment.saoBinhLuan} />
            <span className="text-sm text-gray-600">
              {comment.saoBinhLuan} Stars
            </span>
          </div>
          <p className="mt-2 text-gray-700">{comment.noiDung}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
            <span>
              {comment.ngayBinhLuan}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <span>Helpful?</span>
            <button className="hover:underline">Yes</button>
            <button className="hover:underline">No</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
