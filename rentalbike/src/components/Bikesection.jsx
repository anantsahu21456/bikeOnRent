import React, { useEffect, useState } from 'react';
import BikeCard from '../components/Bikecard.jsx';
import '../css/Bikesection.css';


const Bikesection = () => {
  const [bikes, setBikes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);

        // Fetch bikes with pagination
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bike/get-all-bike?page=${currentPage}&limit=12`);
        const data = await response.json();

        console.log('Fetched bikes data:', data); // Log the fetched data
        setBikes(data.bikes || []); // Update bikes
        setTotalPages(data.totalPages || 1); // Update total pages
      } catch (error) {
        console.error('Error fetching bikes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, [currentPage]); // Refetch data when currentPage changes

  // Smooth scroll after data fetch and DOM update
  useEffect(() => {
    const bikeDetailsSection = document.getElementById('popularBike');
    if (bikeDetailsSection) {
      setTimeout(() => {
        bikeDetailsSection.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Slight delay to ensure DOM updates
    }
  }, [bikes]); // Trigger smooth scroll when `bikes` change

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bike-section-container">
      <h2 id="popularBike" className="bike-section-heading">Popular Bikes</h2>
      <div className="bike-list">
        {Array.isArray(bikes) && bikes.map((bike) => (
          <BikeCard key={bike._id} {...bike} /> 
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          className="pagination-button" 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className="pagination-button" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Bikesection;
