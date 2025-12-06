"use client";
import { formatMongoDate } from "@/common/commonAction";
import { Button } from "@/components/ui/button";
import { addReview, deleteReview, updateReview } from "@/lib/slices/settingsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ReviewComponent = ({ id, reviews, action, setAction }: { id: string; reviews: any[]; action: boolean; setAction: (value: boolean) => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const { review, reviewLoading } = useSelector(
    (state: RootState) => state.settings
  );

  const [form, setForm] = useState({
    text: "",
    rating: 0,
  });

  const openAddModal = () => {
    setForm({ text: "", rating: 0 });
    setEditId(null);
    setModalOpen(true);
  };

  const openEditModal = (review: any) => {
    setForm({
      text: review.reviewText,
      rating: review.rating,
    });
    setEditId(review._id);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    console.log("Form Submitted:", form);

    try {
      if (editId) {
        const payload = {
          reviewId: editId,
          rating: form.rating,
          reviewText: form.text,
        };

        const res = await dispatch(updateReview(payload));
        if (res.meta.requestStatus === "fulfilled") {
            setAction(!action);
          toast.success("Review updated successfully");
          setModalOpen(false);
        }
      } else {
        const payload = {
          rating: form.rating,
          reviewText: form.text,
          libraryId: id,
        };

        const res = await dispatch(addReview(payload));
        if (res.meta.requestStatus === "fulfilled") {
            setAction(!action);
          toast.success("Review added successfully");
          setModalOpen(false);
        }
      }
    } catch (error) {
      toast.error("Error adding review");
    }
  };

  const deleteReviewFun = async (id:string) => {
    try {
        const payload = {
          reviewId: id,
        };

        const res = await dispatch(deleteReview(payload));
        if (res.meta.requestStatus === "fulfilled") {
            setAction(!action);
          toast.success("Review deleted successfully");
          setModalOpen(false);
        }
    } catch (error) {
        toast.error("Error deleting review");
    }
  };

  return (
    <div className="p-6 bg-white border rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews?.length > 0 && reviews?.[0]?.isMyReview ? (
          ""
        ) : (
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Review
          </button>
        )}
      </div>

      {/* Review List */}
      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <img
                  src={review?.userDetails?.avtar}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{review?.userDetails?.name}</h4>
                  <p className="text-sm text-gray-500">
                    {formatMongoDate(review?.createdAt)}
                  </p>
                </div>
              </div>

              {/* RATING */}
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-3 text-gray-700">{review?.reviewText}</p>

            {review?.isMyReview && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => openEditModal(review)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteReviewFun(review._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit Review" : "Add Review"}
            </h3>

            {/* STAR SELECT */}
            <div className="flex mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  onClick={() => setForm({ ...form, rating: i + 1 })}
                  className={`text-2xl cursor-pointer ${
                    i < form.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            {/* Review Text */}
            <textarea
              placeholder="Write your review..."
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg h-24"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 border rounded-lg"
              >
                Cancel
              </button>
              <Button
                onClick={handleSubmit}
                isLoading={reviewLoading}
                className="px-4 py-1 bg-blue-600 text-white rounded-lg"
              >
                {editId ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;
