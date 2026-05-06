"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FlagIcon } from "@/components/ui/flag-icon";
import type { Country } from "./types";

interface CountrySelectorProps {
  countries: Country[];
  value: string;
  onChange: (code: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMobile: boolean;
  placeholder: string;
  excludeCodes?: string[];
  showPower?: boolean;
  popoverWidthClass?: string;
  selectedSummaryLabel?: string;
}

export function CountrySelector({
  countries,
  value,
  onChange,
  open,
  onOpenChange,
  isMobile,
  placeholder,
  excludeCodes = [],
  showPower = false,
  popoverWidthClass = "w-[350px]",
  selectedSummaryLabel,
}: CountrySelectorProps) {
  const selected = countries.find((c) => c.code === value);
  const filtered = countries.filter((c) => !excludeCodes.includes(c.code));

  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="relative">
          <select
            value={value}
            onChange={(e) => {
              const next = e.target.value;
              if (!excludeCodes.includes(next)) onChange(next);
            }}
            className="w-full h-12 px-3 bg-dark-bg border border-dark-border text-dark-text rounded-md text-base appearance-none focus:outline-none focus:ring-2 focus:ring-flame focus:border-transparent"
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {filtered.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
                {showPower ? ` (Power: ${country.power})` : ""}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronsUpDown className="h-4 w-4 text-dark-muted" />
          </div>
        </div>
        {value && selectedSummaryLabel && selected && (
          <div className="flex items-center space-x-2 text-sm text-dark-text bg-dark-border p-2 rounded">
            <FlagIcon countryCode={value} className="w-5 h-3" />
            <span>
              {selectedSummaryLabel}: {selected.name}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-dark-bg border-dark-border text-dark-text hover:bg-dark-border hover:text-dark-text h-10 text-base px-4"
        >
          {selected ? (
            <div className="flex items-center space-x-2">
              <FlagIcon countryCode={selected.code} className="w-6 h-4" />
              <span>{selected.name}</span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`${popoverWidthClass} p-0 bg-dark-card/95 backdrop-blur-md border-dark-border rounded-xl`}
      >
        <Command className="bg-dark-card">
          <CommandInput
            placeholder="Search countries..."
            className="text-dark-text"
          />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => {
                const disabled = excludeCodes.includes(country.code);
                return (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.code}`}
                    disabled={disabled}
                    onSelect={() => {
                      if (disabled) return;
                      onChange(country.code);
                      onOpenChange(false);
                    }}
                    className={`text-dark-text hover:bg-dark-border ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2 w-full">
                      <FlagIcon
                        countryCode={country.code}
                        className="w-6 h-4"
                      />
                      <span className="flex-1">{country.name}</span>
                      {showPower && (
                        <Badge
                          variant="secondary"
                          className="bg-dark-border text-dark-text"
                        >
                          Power: {country.power}
                        </Badge>
                      )}
                      <Check
                        className={`ml-2 h-4 w-4 ${
                          value === country.code ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
