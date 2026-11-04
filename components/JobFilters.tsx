"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { JobFacets } from "@/lib/api";

const fields: { key: "location" | "role" | "type" | "industry"; label: string; facetKey: keyof JobFacets }[] = [
  { key: "location", label: "Location", facetKey: "locations" },
  { key: "role", label: "Department", facetKey: "roles" },
  { key: "type", label: "Employment type", facetKey: "types" },
  { key: "industry", label: "Industry", facetKey: "industries" },
];

export default function JobFilters({ facets }: { facets: JobFacets }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  useEffect(() => {
    if ((searchParams.get("q") ?? "") === search.trim()) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParam("q", search.trim()), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasActive = fields.some((f) => searchParams.get(f.key)) || !!searchParams.get("q");

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-lg">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-pewter"
        >
          <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search roles, e.g. Bangalore finance"
          aria-label="Search roles"
          className="w-full rounded-pill border border-moss bg-white py-3 pl-12 pr-5 text-[16px] text-charcoal outline-none focus:border-forest focus:ring-2 focus:ring-forest/15"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {fields.map((field) => {
          const options = facets[field.facetKey];
          if (options.length === 0) return null;
          const value = searchParams.get(field.key) ?? "";
          return (
            <select
              key={field.key}
              aria-label={field.label}
              value={value}
              onChange={(e) => updateParam(field.key, e.target.value)}
              className={`cursor-pointer appearance-none rounded-pill border px-5 py-2.5 pr-10 text-[14px] outline-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22 viewBox=%220 0 10 10%22><path d=%22M2 4l3 3 3-3%22 fill=%22none%22 stroke=%22%23353535%22 stroke-width=%221.3%22/></svg>')] bg-[length:10px] bg-[right_16px_center] bg-no-repeat ${
                value ? "border-forest bg-sage text-forest" : "border-graphite/40 bg-white text-charcoal"
              }`}
            >
              <option value="">{field.label}</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          );
        })}
        {hasActive && (
          <button
            onClick={() => {
              setSearch("");
              router.push(pathname, { scroll: false });
            }}
            className="text-[14px] font-medium text-forest underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
