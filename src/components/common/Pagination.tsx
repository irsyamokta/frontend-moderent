interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
    const lastPage = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-end items-center gap-2 mt-4">
            <button
                className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`text-sm px-3 py-1 border rounded ${currentPage === number ? "bg-primary text-white" : "bg-white"
                        }`}
                >
                    {number}
                </button>
            ))}
            <button
                className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
            >
                Next
            </button>
        </div>
    );
}
