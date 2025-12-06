// components/FacilityGrid.tsx
"use client";

import React, { useMemo, useState } from "react";

type FacilityGridProps = {
  facilities: string[];        
  className?: string;          
  iconSize?: number;          
  limit?: number;             
  showLabels?: boolean;        
};

const IconWrapper = ({ children, size = 20 }: { children: React.ReactNode; size?: number }) => (
  <div
    style={{ width: size + 12, height: size + 12 }}
    className="flex items-center justify-center rounded-lg bg-white/70  p-2 "
  >
    {children}
  </div>
);

/* Inline SVG icons — small, neutral style (no external deps) */
const Icons = {
  wifi: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 8.5a15 15 0 0120 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 11a11 11 0 0114 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 13.5a7 7 0 018 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="17.5" r="1.2" fill="currentColor"/>
    </svg>
  ),
  printing: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9v6h12V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 13H4a1 1 0 00-1 1v3h18v-3a1 1 0 00-1-1h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="3" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  cafe: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 8h14v6a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 9v2a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 3v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  silent: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 8l3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  group: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="16.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M2 20a6 6 0 0110 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 20a6 6 0 0110 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  parking: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2h8a4 4 0 014 4v12a4 4 0 01-4 4H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 8v8a3 3 0 006 0V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  lockers: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="7" height="16" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="14" y="4" width="7" height="16" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="6.5" cy="11" r="0.7" fill="currentColor" />
      <circle cx="17.5" cy="11" r="0.7" fill="currentColor" />
    </svg>
  ),
  accessibility: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="3.5" r="1.7" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M6 21l6-7 6 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 4v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  outdoor: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l3 6h-6l3-6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M5 21s3-9 7-9 7 9 7 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  default: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
};

/* map backend text -> icon key */
const facilityMap: Record<string, keyof typeof Icons> = {
  "wi-fi": "wifi",
  wifi: "wifi",
  "Wi-Fi": "wifi",
  printing: "printing",
  Printing: "printing",
  printer: "printing",
  cafe: "cafe",
  Cafe: "cafe",
  "silent zone": "silent",
  "Silent Zone": "silent",
  "group study rooms": "group",
  "Group Study Rooms": "group",
  parking: "parking",
  Parking: "parking",
  lockers: "lockers",
  Lockers: "lockers",
  "wheelchair accessible": "accessibility",
  "Wheelchair Accessible": "accessibility",
  "outdoor seating": "outdoor",
  "Outdoor Seating": "outdoor",
};

/* Utility to normalize facility strings to match map keys */
const normalize = (s: string) => s.trim();

/* The component */
export default function FacilityGrid({
  facilities,
  className = "",
  iconSize = 18,
  limit = 8,
  showLabels = true,
}: FacilityGridProps) {
  const [expanded, setExpanded] = useState(false);

  const normalized = useMemo(
    () => facilities.map((f) => ({ raw: f, key: normalize(f) })),
    [facilities]
  );

  // show first `limit` unless expanded
  const visible = expanded ? normalized : normalized.slice(0, limit);

  return (
    <div className={`w-full  ${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
        {visible.map((f, idx) => {
          const mappedKey = (facilityMap as any)[f.key] || (facilityMap as any)[f.raw] || "default";
          const Icon = (Icons as any)[mappedKey] || Icons.default;

          return (
            <div
              key={`${f.raw}-${idx}`}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white  border border-border shadow-sm hover:shadow-md transition bg-green-500"
            >
              <IconWrapper size={iconSize}>{Icon(iconSize)}</IconWrapper>
              {showLabels && <div className="text-xs text-center text-foreground/90 truncate max-w-[8rem]">{f.raw}</div>}
            </div>
          );
        })}
      </div>

      {/* show more / less */}
      {facilities.length > limit && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={() => setExpanded((s) => !s)}
            className="text-sm px-3 py-1 rounded-md border border-border bg-background hover:bg-accent transition"
          >
            {expanded ? "Show less" : `Show all (${facilities.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
