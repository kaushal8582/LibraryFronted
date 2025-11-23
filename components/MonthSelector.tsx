import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface MonthPickerProps {
  onChange: (value: string | null) => void;
}

export default function MonthPicker({ onChange }: MonthPickerProps) {
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const months = [
    { value: "01", label: "Jan" },
    { value: "02", label: "Feb" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Apr" },
    { value: "05", label: "May" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Aug" },
    { value: "09", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ] as const;

  const handleMonthChange = (value: string) => {
    if (value === "") {
      setSelectedMonth(null);
      onChange(null);
      return;
    }

    setSelectedMonth(value);
    const backendValue = `${currentYear}-${value}`;
    onChange(backendValue);
  };

  const clearSelection = () => {
    setSelectedMonth(null);
    onChange(null);
  };

  return (
    <div className="relative w-44">
      <select
        value={selectedMonth ?? ""}
        onChange={(e) => handleMonthChange(e.target.value)}
        className="w-full appearance-none border border-input rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring pr-10"
      >
        <option value="">Filter by month</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      {/* Right-side icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        {!selectedMonth ? (
          <ChevronDown size={18} className="text-muted-foreground" />
        ) : (
          <button
            onClick={clearSelection}
            className="pointer-events-auto"
            type="button"
          >
            <X size={18} className="text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}
