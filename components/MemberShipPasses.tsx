"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

interface PackageItem {
  id: number;
  hours: string;
  price: string;
}

export default function MembershipPasses() {
  const [packages, setPackages] = useState<PackageItem[]>([
    { id: 1, hours: "3", price: "199" },
    { id: 2, hours: "5", price: "499" },
    { id: 3, hours: "8+", price: "700" },
  ]);

  const addPackage = () => {
    setPackages([...packages, { id: Date.now(), hours: "", price: "" }]);
  };

  const updateValue = (id: number, field: "hours" | "price", value: string) => {
    setPackages(
      packages.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const deletePackage = (id: number) => {
    setPackages(packages.filter((p) => p.id !== id));
  };

  return (
    <Card className="p-6  text-black border border-neutral-800 rounded-2xl space-y-6">
      <div className="flex justify-between ">
        <div >
          <h2 className="text-xl font-semibold">Membership & Passes</h2>
          <p className="text-neutral-400 text-sm">
            Define your hourly pass packages.
          </p>
        </div>
        <div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {packages.map((pkg) => (
          <div key={pkg.id} className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-6">
              <label className="text-sm text-black">Hours</label>
              <Input
                value={pkg.hours}
                type="number"
                onChange={(e) => updateValue(pkg.id, "hours", e.target.value)}
                className="bg-transparent border-neutral-700 text-black"
                placeholder="Hours"
              />
            </div>

            <div className="col-span-5">
              <label className="text-sm text-black">Price</label>
              <div className="flex items-center gap-2">
                <span className="text-black">$</span>
                <Input
                  value={pkg.price}
                  type="number"
                  onChange={(e) => updateValue(pkg.id, "price", e.target.value)}
                  className="bg-transparent border-neutral-700 text-black"
                  placeholder="Price"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => deletePackage(pkg.id)}
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
