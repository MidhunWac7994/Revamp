import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/components/ui/pagination";

const PaginationComponent = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="mt-10 flex justify-center">
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => prev - 1)}
            />
          </PaginationItem>
        )}

        {[...Array(totalPages).keys()].map((pageIndex) => {
          const page = pageIndex + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => prev + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  </div>
);

export default PaginationComponent;
