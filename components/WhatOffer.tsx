"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

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

export default function WhatYouOffer() {
  const [selected, setSelected] = useState<string[]>(["Wi-Fi", "Cafe", "Silent Zone", "Parking"]);

  const toggleSelect = (facility: string) => {
    setSelected((prev) =>
      prev.includes(facility)
        ? prev.filter((item) => item !== facility)
        : [...prev, facility]
    );
  };

  return (
    <Card className="p-6 rounded-2xl border border-gray-300 bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">What You Offer</h2>
      <p className="text-gray-500 text-sm mb-4">
        Select all available facilities.
      </p>

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
