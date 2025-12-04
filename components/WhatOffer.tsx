"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { UserFullData } from "@/lib/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { updateAccount } from "@/lib/slices/settingsSlice";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const FACILITIES = [
  "Wi-Fi",
  "Printing",
  "Cafe",
  "Silent Zone",
  "Group Study Rooms",
  "Parking",
  "Lockers",
  "Wheelchair Accessible",
  "Outdoor Seating",
];

export default function WhatYouOffer({
  value,
}: {
  value: UserFullData | null;
}) {
  const [selected, setSelected] = useState<string[]>([
    "Wi-Fi",
    "Cafe",
    "Silent Zone",
    "Parking",
  ]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const toggleSelect = (facility: string) => {
    setSelected((prev) =>
      prev.includes(facility)
        ? prev.filter((item) => item !== facility)
        : [...prev, facility]
    );
  };

  useEffect(() => {
    setSelected(value?.libraryData?.facilities || []);
  }, [value]);

  const handleSubmit = async () => {
    try {
      const payload = {
        facilities: selected,
      };

      setLoader(true);

      const res: any = await dispatch(
        updateAccount({
          libraryId: value?.libraryData?._id || "",
          data: payload,
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Facilities updated successfully!");
      } else {
        toast.error("Failed to update facilities");
      }
    } catch (error) {
      setLoader(false);
      toast.error("Error updating facilities");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Card className="p-6 rounded-2xl border border-gray-300 bg-white shadow-sm">
      <div className="flex  justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            What You Offer
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Select all available facilities.
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            isLoading={loader}
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {FACILITIES.map((item) => {
          const isActive = selected.includes(item);

          return (
            <button
              key={item}
              onClick={() => toggleSelect(item)}
              className={`
                px-4 py-2 rounded-lg border text-sm transition
                ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
