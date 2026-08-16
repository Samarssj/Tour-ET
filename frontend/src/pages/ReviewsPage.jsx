import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import React from "react";
import Review from "../Component/Review";
import { useAuthContext } from "../customHook/useAuthContext";
import useFetch from "../customHook/useFetch";
import { motion } from "framer-motion";
import { Star, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

const ReviewsPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [numStar, setNumStar] = useState(0);
  const { user } = useAuthContext();
  
  const { data: site } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/package/${id}`
  );

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setStatus({ type: "error", message: "Please login to post a review" });
      return;
    }
    if (numStar === 0) {
      setStatus({ type: "error", message: "Please select a star rating" });
      return;
    }
    if (!comment) {
      setStatus({ type: "error", message: "Please write your review comment" });
      return;
    }
    if (!agree) {
      setStatus({ type: "error", message: "Please certify your review to continue" });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pkg: id,
            text: comment,
            rating: numStar,
          }),
        }
      );
      
      const response1 = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/package/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_rate: numStar,
          }),
        }
      );

      if (response.ok && response1.ok) {
        setStatus({ type: "success", message: "Thank you! Your review has been posted." });
        setTimeout(() => {
          history.goBack();
        }, 2000);
      } else {
        setStatus({ type: "error", message: "Failed to post review. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error. Please try again later." });
    }
  };

  if (!site) {
    return (
      <div className="main-content-wrapper d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="main-content-wrapper py-5">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="row g-5"
        >
          {/* Left Column: Package Info */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg overflow-hidden sticky-top" style={{ top: '100px' }}>
              <img src={site.image[0]} alt={site.name} className="card-img-top object-fit-cover" style={{ height: '300px' }} />
              <div className="card-body p-4">
                <h1 className="h3 fw-bold mb-2">{site.name}</h1>
                <p className="text-muted mb-0">{site.location}</p>
                <div className="mt-4 pt-4 border-top">
                  <h6 className="fw-bold text-uppercase small text-muted mb-3">Recent Reviews</h6>
                  <Review unique={site._id} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Review Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-lg p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-primary text-white p-3 rounded-circle">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h2 className="h4 fw-bold mb-0">Share your experience</h2>
                  <p className="text-muted mb-0">Your feedback helps other travelers</p>
                </div>
              </div>

              {status.message && (
                <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
                  {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handelSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold text-muted small text-uppercase">Rate your experience</label>
                  <div className="d-flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNumStar(star)}
                        className="btn p-0 border-0 bg-transparent"
                      >
                        <Star 
                          size={32} 
                          fill={numStar >= star ? "#ffc107" : "none"} 
                          className={numStar >= star ? "text-warning" : "text-muted opacity-25"}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="reviewArea" className="form-label fw-bold text-muted small text-uppercase">Your Review</label>
                  <textarea
                    id="reviewArea"
                    className="form-control"
                    rows="6"
                    placeholder="Tell us about the highlights, the service, and any tips for future travelers..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <div className="form-check p-3 bg-light rounded-3">
                    <input
                      className="form-check-input ms-0 me-3"
                      type="checkbox"
                      id="agree"
                      checked={agree}
                      onChange={() => setAgree(!agree)}
                    />
                    <label className="form-check-label small fw-medium" htmlFor="agree">
                      I certify that this review is based on my own experience and is my genuine opinion.
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold">
                  Post My Review
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsPage;
