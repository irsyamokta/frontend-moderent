interface Option {
    value: string;
    label: string;
}

interface SearchFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;

    filterValue: string;
    onFilterChange: (value: string) => void;
    filterLabel?: string;
    filterOptions: Option[];
}

export default function SearchFilter({
    searchTerm,
    onSearchChange,
    searchPlaceholder = "Cari...",
    filterValue,
    onFilterChange,
    filterLabel = "Filter",
    filterOptions,
}: SearchFilterProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-52"
            />

            <div className="relative inline-block w-full">
                <select
                    value={filterValue}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none"
                    aria-label={filterLabel}
                >
                    {filterOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* Custom Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
