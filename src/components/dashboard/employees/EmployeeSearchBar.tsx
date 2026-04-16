import { Search, X } from "lucide-react";
import { EmployeeFilters } from "@/types/employee.types";
import { DESIGNATIONS } from "@/constants/employees";

interface EmployeeSearchBarProps {
  filters: EmployeeFilters;
  onSearchNameChange: (value: string) => void;
  onSearchIdChange: (value: string) => void;
  onDesignationChange: (value: string) => void;
}

export function EmployeeSearchBar({
  filters,
  onSearchNameChange,
  onSearchIdChange,
  onDesignationChange,
}: EmployeeSearchBarProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          placeholder="Search employees by name..."
          value={filters.searchName}
          onChange={onSearchNameChange}
        />
        <SearchInput
          placeholder="Search by employee ID..."
          value={filters.searchId}
          onChange={onSearchIdChange}
        />
        <div className="relative sm:w-64">
          <select
            value={filters.selectedDesignation}
            onChange={(e) => onDesignationChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-900 appearance-none cursor-pointer"
          >
            {DESIGNATIONS.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="h-4 w-4 text-slate-400" />
        </button>
      )}
    </div>
  );
}
