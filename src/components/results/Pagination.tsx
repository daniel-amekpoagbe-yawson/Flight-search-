import React from 'react';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  isLoading = false,
  hasNextPage = true,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages && hasNextPage;

  return (
    <div className="flex items-center justify-between py-6 px-4 bg-white rounded-lg border border-gray-200 mt-6">
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{startItem}</span> to <span className="font-semibold">{endItem}</span> of{' '}
        <span className="font-semibold">{totalItems}</span> flights
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious || isLoading}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <div className="text-sm font-medium text-gray-700 px-4 py-2 bg-gray-50 rounded">
          Page {currentPage} of {totalPages}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext || isLoading}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
