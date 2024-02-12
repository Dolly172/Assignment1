import React, {useState} from 'react';

function Pagination({setCurrentPage, totalPages}){
    
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pagination = [];
        for (let i = 1; i <= totalPages; i++) {
        pagination.push(
            <button key={i} onClick={() => handlePagination(i)}>
            {i}
            </button>
        );
        }
        return pagination;
    };

    return(
        <div>
        {renderPagination()}
        </div>
    )
}

export default Pagination;