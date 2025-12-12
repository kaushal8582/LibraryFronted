import { JSX, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import toast from "react-hot-toast";
import { updateAccount } from "@/lib/slices/settingsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { UserFullData } from "@/lib/slices/authSlice";

const daysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function HoursSettings({ id,value }: { id: string; value : UserFullData | null }): JSX.Element {
  const [loader, setLoader] = useState(false);
  const [openFrom, setOpenFrom] = useState(value?.libraryData?.openingHours || "09:00 AM");
  const [openUntil, setOpenUntil] = useState(value?.libraryData?.closingHours || "05:00 PM");
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDays, setSelectedDays] = useState<string[]>(value?.libraryData?.openForDays || [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  useEffect(() => {
    setOpenFrom(value?.libraryData?.openingHours || "09:00 AM");
    setOpenUntil(value?.libraryData?.closingHours || "05:00 PM");
    setSelectedDays(value?.libraryData?.openForDays || [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]);
  }, [value]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handelSubmit = async () => {
    try {
      const payload = {
        openingHours: openFrom,
        closingHours: openUntil,
        openForDays: selectedDays,
      };

      setLoader(true);
 
      const res:any = await dispatch(
        updateAccount({
          libraryId: id,
          data: payload,
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Hours updated successfully!");
      } else {
        toast.error("Failed to update hours");
      }
    } catch ( error) {
      setLoader(false);
      toast.error("Error setting hours");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 border border-gray-300 rounded-xl sm:rounded-2xl">
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    <h2 className="text-lg sm:text-xl font-semibold">Set Your Hours</h2>
    <div className="w-full sm:w-auto">
      <Button
        isLoading={loader}
        onClick={handelSubmit}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
      >
        Save Hours
      </Button>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
    <div>
      <label className="text-sm">Open From</label>
      <input
        value={openFrom}
        type="time"
        onChange={(e) => setOpenFrom(e.target.value)}
        className="w-full mt-1 sm:mt-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#2a2a2a] focus:ring-2 focus:ring-blue-600 outline-none"
      />
    </div>

    <div>
      <label className="text-sm">Open Until</label>
      <input
        value={openUntil}
        type="time"
        onChange={(e) => setOpenUntil(e.target.value)}
        className="w-full mt-1 sm:mt-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#2a2a2a] focus:ring-2 focus:ring-blue-600 outline-none"
      />
    </div>
  </div>

  <div>
    <p className="text-sm mb-2 sm:mb-3">
      Apply these hours to the following days:
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {daysList.map((day) => {
        const active = selectedDays.includes(day);
        return (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`flex items-center justify-start gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border transition
              ${active ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
          >
            <span
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border
                ${active ? "bg-blue-600 border-blue-600" : "border-gray-500"}`}
            >
              {active && <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />}
            </span>
            <span className="text-xs sm:text-sm">{day}</span>
          </button>
        );
      })}
    </div>
  </div>
</Card>
  );
}

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
