"use client";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 25, 50],
  showItemsPerPage = true,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return (
    <div className='flex flex-col sm:flex-row justify-between items-center px-4 py-3 border-t border-gray-700 gap-4'>
      <div className='text-sm text-gray-400 flex flex-wrap items-center gap-2'>
        <div>
          Showing{" "}
          <span className='font-medium'>
            {totalItems > 0 ? indexOfFirstItem + 1 : 0}
          </span>{" "}
          to{" "}
          <span className='font-medium'>
            {Math.min(indexOfLastItem, totalItems)}
          </span>{" "}
          of <span className='font-medium'>{totalItems}</span> results
        </div>
        {showItemsPerPage && onItemsPerPageChange && (
          <div className='flex items-center gap-2'>
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className='border border-gray-700 rounded p-1 bg-gray-800 text-sm'
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
        )}
      </div>
      <div className='flex items-center space-x-2'>
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-300 hover:bg-gray-700"
          }`}
          aria-label='Previous page'
        >
          <FiChevronLeft className='w-5 h-5' />
        </button>
        {/* Page numbers */}
        <div className='flex items-center space-x-1'>
          {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  currentPage === pageNum
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`p-2 rounded-md ${
            currentPage === totalPages || totalPages === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-300 hover:bg-gray-700"
          }`}
          aria-label='Next page'
        >
          <FiChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
