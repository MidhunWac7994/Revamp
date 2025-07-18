import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

const Paginations = ({ pageCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const previousDisabled = currentPage === 1;
  const nextDisabled = currentPage === pageCount;
  const getPaginationCount = () => {
    const paginationCount = [];
    let pretrailing = false;
    let posttrailing = false;

    if (pageCount < 6) {
      for (let i = 1; i <= pageCount; i++) {
        paginationCount.push(i);
      }
      return { paginationCount, pretrailing, posttrailing };
    } else {
      if (currentPage - 2 > 1) {
        for (let i = currentPage; i >= currentPage - 2; i--) {
          paginationCount.push(i);
        }
        pretrailing = true;
      } else {
        for (let i = currentPage; i >= 1; i--) {
          paginationCount.push(i);
        }
      }
      if (pageCount - currentPage > 2) {
        for (let i = currentPage + 1; i <= currentPage + 2; i++) {
          paginationCount.push(i);
        }
        posttrailing = true;
      } else {
        for (let i = currentPage + 1; i <= pageCount; i++) {
          paginationCount.push(i);
        }
      }
      paginationCount.sort((a, b) => a - b);
      return { paginationCount, pretrailing, posttrailing };
    }
  };
  const { paginationCount, pretrailing, posttrailing } = getPaginationCount();

  const handlePrevious = (e) => {
    handleGoToPage(currentPage - 1);
  };
  const handleNext = () => {
    handleGoToPage(currentPage + 1);
  };
  const handleGoToPage = (page) => {
    if (currentPage !== page) {
      const updatedParams = new URLSearchParams(searchParams.toString());
      updatedParams.set("page", page);
      setSearchParams(updatedParams);
    }
  };
  return (
    <div className="my-20">
      <Pagination>
        <PaginationContent>
          {!previousDisabled && (
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevious} />
            </PaginationItem>
          )}

          {pretrailing && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {paginationCount.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href=""
                onClick={() => handleGoToPage(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {posttrailing && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {!nextDisabled && (
            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
