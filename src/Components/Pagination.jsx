import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const Pagination = ({ currentPage, totalPages, handlePrevPage, handleNextPage, handleFirstPage, handleLastPage }) => {
   
  const ScrollToTop = () => {
    const locacion = useLocation();
  
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',});
    }, [locacion]);
  
    return null;
  };

  return (
        <div className='pagination'>
          <ScrollToTop />
          <button className="btn_filter" onClick={handleFirstPage}>First Page</button>
          <button className="btn_filter" onClick={handlePrevPage} disabled={currentPage === 1}>
           {'<<'} Prev
          </button>
          <b> {currentPage} </b>
          <button className="btn_filter" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next {'>>'}
          </button>
          <button className="btn_filter" onClick={handleLastPage}>Last Page</button>
        </div>
      );
    };





export default Pagination;

