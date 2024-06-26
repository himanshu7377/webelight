import React from 'react';
import { Box, Button } from '@mui/material';

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalProducts, productsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        sx={{ mx: 1 }}
      >
        Previous
      </Button>
      <div style={{ display: 'flex', alignItems: 'center' , fontWeight: 'bold', fontSize: '20px'}}>

      {`Page ${currentPage} of ${totalPages}`}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        sx={{ mx: 1 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
