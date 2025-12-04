"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { UserFullData } from "@/lib/slices/authSlice";
import { toast } from "sonner"; // if you're using sonner
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { updateAccount } from "@/lib/slices/settingsSlice";

interface PackageItem {
  hours: string;
  price: string;
}

export default function MembershipPasses({
  value,
}: {
  value: UserFullData | null;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [packages, setPackages] = useState<PackageItem[]>(
    value?.libraryData?.plans || [
      { hours: "3", price: "199" },
      { hours: "5", price: "499" },
      { hours: "8+", price: "700" },
    ]
  );

  const [loading, setLoading] = useState(false);

  const addPackage = () => {
    setPackages([...packages, { hours: "", price: "" }]);
  };

  const updateValue = (id: number, field: "hours" | "price", value: string) => {
    setPackages(
      packages.map((p, i) => (i === id ? { ...p, [field]: value } : p))
    );
  };

  const deletePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setPackages(value?.libraryData?.plans || [
      { hours: "1", price: "199" },
     
    ]);
  }, [value]);

  const savePackages = async () => {
    try {
      setLoading(true);

      const payload = packages.map((p) => ({
        hours: (p.hours),
        price: (p.price),
      }));

      const res = await dispatch(
        updateAccount({
          libraryId: value?.libraryData?._id || "",
          data: { plans: payload },
        })
      );

      toast.success("Plans updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 text-black border border-neutral-800 rounded-2xl space-y-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Membership & Passes</h2>
          <p className="text-neutral-400 text-sm">
            Define your hourly pass packages.
          </p>
        </div>
        <div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={savePackages}
          
            isLoading={loading}
          >
           Save
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {packages.map((pkg, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-6">
              <label className="text-sm text-black">Hours</label>
              <Input
                value={pkg.hours}
                type="text"
                onChange={(e) => updateValue(index, "hours", e.target.value)}
                className="bg-transparent border-neutral-700 text-black"
                placeholder="Hours"
              />
            </div>

            <div className="col-span-5">
              <label className="text-sm text-black">Price</label>
              <div className="flex items-center gap-2">
                <span className="text-black">₹</span>
                <Input
                  value={pkg.price}
                  type="number"
                  onChange={(e) => updateValue(index, "price", e.target.value)}
                  className="bg-transparent border-neutral-700 text-black"
                  placeholder="Price"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => deletePackage(index)}
              className="text-red-500 hover:text-red-600 hover:bg-red-900/20 col-span-1"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      <button
        onClick={addPackage}
        className="w-full border border-dashed border-neutral-700 rounded-xl py-3 flex items-center text-black justify-center gap-2 hover:text-white cursor-pointer hover:bg-neutral-900 transition"
      >
        <Plus className="w-5 h-5" />
        Add another package
      </button>
    </Card>
  );
}
