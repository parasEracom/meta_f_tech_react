import React from 'react';
import { Pagination } from 'react-bootstrap';
import './PaginationControls.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const handlePagination = (page) => {
        onPageChange(page);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Number of pages to show at a time
        const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(
                <Pagination.First key="first" onClick={() => handlePagination(1)} />
            );
            pageNumbers.push(
                <Pagination.Prev key="prev" onClick={handlePrevious} />
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePagination(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(
                <Pagination.Next key="next" onClick={handleNext} />
            );
            pageNumbers.push(
                <Pagination.Last key="last" onClick={() => handlePagination(totalPages)} />
            );
        }

        return pageNumbers;
    };

    return (
        <Pagination className="justify-content-center mt-4">
            <Pagination.Prev onClick={handlePrevious} id='paginationButton'><i><FaAngleLeft /></i></Pagination.Prev>
            {generatePageNumbers()}
            <Pagination.Next onClick={handleNext} id='paginationButton'><i><FaAngleRight /></i></Pagination.Next>
        </Pagination>
    );
};

export default PaginationComponent;
