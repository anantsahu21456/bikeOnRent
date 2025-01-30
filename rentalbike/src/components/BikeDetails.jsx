import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/BikeDetails.css';


const BikeDetails = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', review: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  //& Fetch bike details
  useEffect(() => {
    const fetchBikeDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bike/bike/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bike details');
        }
        const data = await response.json();
        setBike(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBikeDetails();
  }, [id]);

  //& Smooth scroll to bike details section
  useEffect(() => {
    const timer = setTimeout(() => {
      const bikeDetailsSection = document.getElementById('bikeDetails');
      if (bikeDetailsSection) {
        bikeDetailsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  //& Fetch reviews for the bike
  useEffect(() => {
    const fetchBikeReviews = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/review/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization token
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        console.log('Reviews Data:', data); // Check if reviews are present in the response
        setReviews(data.reviews || []); // Ensure reviews are set correctly
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };
    

    fetchBikeReviews();
  }, [id]);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  //& Handle form submission for adding a review
  const handleAddReview = async (e) => {
    const token = localStorage.getItem('authToken');
console.log('Token from localStorage:', token);

    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          rating: newReview.rating,
          review: newReview.review,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      const data = await response.json();
      setReviews((prevReviews) => [data.newReview, ...prevReviews]); // Add the new review to the list
      setNewReview({ rating: '', review: '' }); // Reset form fields
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!bike) return <p>No bike found!</p>;

  return (
    <div id='bikeDetails' className="bike-details-container">
      {/* Bike Details Section */}
      <div className="bike-details-top">
        <div className="bike-image">
          <img src={bike.bikeImage} alt={bike.bikeName} />
        </div>
        <div className="bike-info">
          <h2>{bike.bikeName} ({bike.bikeModel})</h2>
          <p><strong>Fuel Type:</strong> {bike.fuelType}</p>
          <p><strong>Average Mileage:</strong> {bike.mileage} km/lt</p>
          <p><strong>Bike Colors:</strong> {bike.bikeColor}</p>
          <p><strong>Bike Number:</strong> {bike.bikeNumber}</p>
          <p><strong>Description:</strong> {bike.bikeDescription}</p>
          <p><strong>Location:</strong> {bike.bikeLocation}</p>
          <p><strong>Rent Per Day:</strong> Rs {bike.rentPerDay}</p>
          <button className="payment-button">Make Payment</button>
        </div>
      </div>
  
      {/* Add Review Section */}
      <div className="add-review-section">
        <h3>Add a Review</h3>
        <form onSubmit={handleAddReview} className="add-review-form">
          <div className="form-group">
            <label htmlFor="rating">Rating (1-5):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={newReview.review}
              onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-review-button">Submit Review</button>
        </form>
      </div>
  
      {/* Reviews Section */}
      <div className="reviews-section">
        {/* <h3>Read Reviews</h3> */}
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews available for this bike.</p>
        ) : (
          paginatedReviews.map((review) => (
            <div key={review._id} className="review-card">
            
              <div className="review-user">
                <img
                  src={review.userId?.avatar || '/default-avatar.png'}
                  alt={review.userId?.name || 'User'}
                  className="review-avatar"
                />
              </div>
              <div id="reviewinfo">
                <p className="review-user-name">{review.userId?.firstName || 'Anonymous'}</p>
                <p className="review-rating">
                  <strong>Rating:</strong> {review.rating}/5
                </p>
                <p className="review-content">{review.review}</p>
              </div>
            </div>
          
          ))
        )}
        {reviews.length > reviewsPerPage && (
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNextPage} disabled={currentPage * reviewsPerPage >= reviews.length}>Next</button>
          </div>
        )}
      </div>
    </div>
  );  
};

export default BikeDetails;
