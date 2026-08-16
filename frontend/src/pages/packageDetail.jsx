import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import useFetch from "../customHook/useFetch.js";
import { useAuthContext } from "../customHook/useAuthContext.js";
import { CartContext } from "../context/cartContex.js";
import Review from "../Component/Review.jsx";
import { motion } from "framer-motion";
import { 
  MapPin, Clock, Users, Calendar, 
  ShoppingCart, CreditCard, Star, 
  ChevronRight, CheckCircle2, AlertCircle,
  Activity
} from "lucide-react";

function PackageDetail() {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useAuthContext();
  const { state, dispatch } = useContext(CartContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [itemAdded, setItemAdded] = useState(false);

  const { data: site } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/package/${id}`
  );

  useEffect(() => {
    if (site && state) {
      const isItemInCart = state.find((idx) => idx.packages === id);
      setItemAdded(!!isItemInCart);
    }
  }, [site, state, id]);

  const addToCart = async () => {
    if (!user) {
      setError("Please login to add items to your cart");
      setTimeout(() => history.push("/login"), 2000);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/wishlist`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.detail._id,
            packages: site._id,
            name: site.name,
            price: site.pricePerAdult,
            photo: site.image[0],
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        dispatch({ type: "ADD", item: result.data });
        setItemAdded(true);
        setSuccess("Package added to cart successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to add to cart. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleBookClick = (e) => {
    if (!user) {
      e.preventDefault();
      setError("Please login to book a tour");
      setTimeout(() => history.push("/login"), 2000);
    }
  };

  if (!site) {
    return (
      <div className="main-content-wrapper d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const descData = site.description?.[0] || {};
  const mainText = descData.main?.[0] || descData.content || "";
  const included = descData.included || [];
  const policy = descData.policy?.[0] || "Standard cancellation policy applies.";
  
  const fallbackImage = "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80";
  const heroImage = site.image && site.image[0] ? site.image[0] : fallbackImage;

  return (
    <div className="main-content-wrapper pb-5">
      {/* Hero Section */}
      <div className="position-relative vh-75 overflow-hidden bg-secondary">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={heroImage} 
          className="w-100 h-100 object-fit-cover"
          style={{ opacity: 0.85 }}
          alt={site.name} 
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-black via-transparent to-transparent d-flex align-items-end">
          <div className="container pb-5">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-primary px-3 py-2 rounded-pill shadow">Featured Tour</span>
                <div className="d-flex align-items-center gap-1 text-warning">
                  <Star size={18} fill="currentColor" />
                  <span className="fw-bold text-white">{site.rating || 4.8}</span>
                </div>
              </div>
              <h1 className="display-3 fw-bold mb-3 text-white text-shadow">{site.name}</h1>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2 text-white">
                  <MapPin size={20} className="text-primary" />
                  <span className="fw-medium">{site.location}</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-white">
                  <Activity size={20} className="text-primary" />
                  <span className="fw-medium">{site.to_do_type || "Adventure"}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mt-n5 position-relative z-index-1">
        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card border-0 shadow-lg p-4 p-md-5"
            >
              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
                  <CheckCircle2 size={20} />
                  <span>{success}</span>
                </div>
              )}

              <div className="mb-5">
                <h2 className="h3 fw-bold mb-4">About this experience</h2>
                <p className="lead text-secondary mb-4">{mainText}</p>
                <div className="row g-4 mt-2">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                      <div className="bg-primary text-white p-2 rounded-3">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="small text-muted">Group Size</div>
                        <div className="fw-bold">Up to 12 people</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                      <div className="bg-primary text-white p-2 rounded-3">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <div className="small text-muted">Availability</div>
                        <div className="fw-bold">All year round</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h2 className="h3 fw-bold mb-4">What's included</h2>
                <div className="row g-3">
                  {included.length > 0 ? included.map((item, i) => (
                    <div key={i} className="col-md-6">
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle2 className="text-primary" size={20} />
                        <span className="text-secondary">{item}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="col-12 text-muted">Information about inclusions will be provided during booking.</div>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <h2 className="h3 fw-bold mb-4">Cancellation Policy</h2>
                <div className="p-4 bg-light rounded-4 text-secondary">
                  {policy}
                </div>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <div className="mt-5">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="h3 fw-bold mb-0">Guest Reviews</h2>
                {user && (
                  <Link to={`/review/${site._id}`} className="btn btn-outline-primary rounded-pill">
                    Write a Review
                  </Link>
                )}
              </div>
              <Review unique={site._id} />
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '100px' }}>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card border-0 shadow-lg overflow-hidden"
              >
                <div className="card-body p-4 p-xl-5">
                  <div className="mb-4">
                    <span className="text-muted small d-block mb-1">Price per adult</span>
                    <div className="d-flex align-items-baseline gap-2">
                      <h3 className="display-6 fw-bold text-primary mb-0">{site.pricePerAdult}</h3>
                      <span className="h5 text-muted mb-0">Birr</span>
                    </div>
                  </div>

                  <div className="d-grid gap-3">
                    <button 
                      onClick={addToCart}
                      disabled={itemAdded}
                      className={`btn ${itemAdded ? 'btn-success' : 'btn-outline-primary'} btn-lg rounded-pill d-flex align-items-center justify-content-center gap-2 py-3`}
                    >
                      {itemAdded ? <CheckCircle2 size={20} /> : <ShoppingCart size={20} />}
                      <span>{itemAdded ? 'In Cart' : 'Add to Cart'}</span>
                    </button>
                    <Link 
                      to={`/book/${site._id}`} 
                      onClick={handleBookClick}
                      className="btn btn-primary btn-lg rounded-pill d-flex align-items-center justify-content-center gap-2 py-3"
                    >
                      <CreditCard size={20} />
                      <span>Book Now</span>
                    </Link>
                  </div>

                  <div className="mt-4 pt-4 border-top">
                    <div className="d-flex align-items-center gap-3 text-secondary small">
                      <CheckCircle2 className="text-success" size={16} />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 text-secondary small mt-2">
                      <CheckCircle2 className="text-success" size={16} />
                      <span>Verified local operators</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="card border-0 shadow-sm mt-4 p-4 bg-light rounded-4">
                <h4 className="h6 fw-bold mb-3">Need Help?</h4>
                <p className="small text-muted mb-0">Our travel experts are available 24/7 to assist you with your booking.</p>
                <a href="tel:+251911223344" className="btn btn-link text-primary p-0 mt-2 fw-bold text-decoration-none">
                  Contact Support <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;
