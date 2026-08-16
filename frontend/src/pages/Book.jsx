import React, { useState, useEffect } from "react";
import { FaUserCircle, FaPhone, FaCalendarAlt, FaCalculator, FaCheckCircle, FaTimes } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { useAuthContext } from "../customHook/useAuthContext.js";
import Hotel from "../Component/Book/Hotel.jsx";
import useFetch from "../customHook/useFetch.js";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CreditCard, Wallet, CheckCircle2 } from "lucide-react";

function Book() {
  const history = useHistory();
  const { id } = useParams();
  const [book, setBook] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    payment: "",
    date: ""
  });
  const [numTour, setNumTour] = useState(1);
  const [roomSelect, setRoomSelect] = useState(false);
  const [totalPrice, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useAuthContext();

  const { data: hotels } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/package/${id}/hotel`
  );
  const { data: pkg } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/package/${id}`
  );

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please login to continue");
      return;
    }

    if (!book.firstName || !book.phone || !book.payment || !book.date) {
      setError("Please fill in your name, travel date, phone number, and select a payment method");
      return;
    }

    if (!/^\d{10}$/.test(book.phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!roomSelect) {
      setError("Please select a hotel room first");
      return;
    }

    const { hotelId, roomId, payment, firstName, lastName, phone, date } = book;
    const body = {
      hotel: hotelId,
      room: roomId,
      payment,
      package: pkg._id,
      name: pkg.name,
      numberOfPeople: numTour,
      price: totalPrice,
      firstName,
      lastName,
      phone,
      date
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/booking`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const result = await response.json();
        setError(result.msg || "Booking failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const calPrice = async () => {
    if (!user) {
      setError("Please login to calculate price");
      return;
    }

    if (!book.firstName || !book.phone) {
      setError("Please provide your name and phone number before calculating the price.");
      return;
    }

    if (!/^\d{10}$/.test(book.phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    setError("");
    const body = {
      pricePerAdult: pkg.pricePerAdult,
      noOfPeople: parseInt(numTour),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/booking/price`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setTotal(result.data.totalPrice);
      } else {
        setError("Failed to calculate price. Please check your inputs.");
      }
    } catch (err) {
      setError("Network error during price calculation.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  if (!pkg) {
    return <div className="main-content-wrapper text-center py-5"><h3>Loading package...</h3></div>;
  }

  return (
    <div className="main-content-wrapper py-5">
      <div className="container-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card border-0 shadow-lg p-4 p-md-5"
        >
          <div className="mb-5 border-bottom pb-4">
            <h1 className="display-6 fw-bold text-primary mb-2">Booking Your Adventure</h1>
            <p className="lead text-secondary">{pkg.location} / {pkg.name}</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="alert alert-danger d-flex align-items-center gap-2"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSumbit}>
            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase text-muted">Travel Date</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent"><FaCalendarAlt /></span>
                  <input 
                    type="date" 
                    name="date" 
                    className="form-control" 
                    value={book.date}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase text-muted">Number of Travelers</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent"><FaUserCircle /></span>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    className="form-control"
                    value={numTour}
                    onChange={(e) => setNumTour(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={book.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Last Name (Optional)"
                  name="lastName"
                  value={book.lastName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-transparent"><FaPhone /></span>
                  <input
                    type="tel"
                    placeholder="Phone Number (10 digits)"
                    name="phone"
                    value={book.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setBook({ ...book, phone: val });
                    }}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-secondary-subtle p-4 rounded-4 mb-5 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary text-white p-3 rounded-circle">
                  <FaCalculator size={24} />
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-0">Price Calculator</h3>
                  <p className="text-muted small mb-0">Get the total cost for your group</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4">
                <button type="button" className="btn btn-outline-primary rounded-pill px-4" onClick={calPrice}>
                  Calculate Total
                </button>
                <div className="text-end">
                  <span className="text-muted small d-block">Estimated Total</span>
                  <span className="h4 fw-bold text-primary mb-0">{totalPrice} <small className="fw-normal text-muted">Birr</small></span>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="h5 fw-bold mb-4 d-flex align-items-center gap-2">
                <CreditCard size={20} /> Select Payment Method
              </h3>
              <div className="row g-3">
                {[
                  { id: 'teleBirr', name: 'telebirr', logo: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/nMksZFddCJRXCnpz.jpg' },
                  { id: 'CBEBirr', name: 'CBEbirr', logo: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/LBUVpRLDfrTaIJTx.jpg' },
                  { id: 'e_birr', name: 'e birr', logo: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/BFUyQSwbHUBUayqj.jpg' }
                ].map((method) => (
                  <div key={method.id} className="col-4 col-md-2">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      id={method.id}
                      className="btn-check"
                      onChange={handleChange}
                      checked={book.payment === method.id}
                    />
                    <label className="btn btn-outline-light border w-100 p-3 rounded-4 d-flex flex-column align-items-center gap-2" htmlFor={method.id}>
                      <img src={method.logo} alt={method.name} className="img-fluid rounded" style={{ height: '40px', objectFit: 'contain' }} />
                      <span className="small fw-bold text-dark">{method.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h3 className="h5 fw-bold mb-4 d-flex align-items-center gap-2">
                <Wallet size={20} /> Choose Your Accommodation
              </h3>
              <div className="row g-4">
                {!roomSelect ? (
                  hotels && hotels.length > 0 ? (
                    hotels.map((hotel, idx) => (
                      <div className="col-12 col-md-6 col-lg-4" key={idx}>
                        <Hotel {...hotel} book={book} setBook={setBook} setRoomSelect={setRoomSelect} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <div className="bg-light p-4 rounded-4">
                        <p className="text-muted mb-0">No hotels currently available for this location. Please try again later.</p>
                      </div>
                    </div>
                  )
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="col-12 col-md-6"
                  >
                    <div className="card border-primary bg-primary-subtle p-3 rounded-4">
                      <div className="d-flex align-items-center gap-3">
                        <img src={book.roomImg} alt="Room" className="rounded-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        <div className="flex-grow-1">
                          <h4 className="h6 fw-bold mb-1">{book.roomBody}</h4>
                          <p className="text-primary fw-bold mb-2">{book.roomPrice} Birr</p>
                          <button type="button" className="btn btn-sm btn-outline-primary rounded-pill" onClick={() => setRoomSelect(false)}>
                            Change Room
                          </button>
                        </div>
                        <FaCheckCircle className="text-primary" size={24} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="text-center pt-4">
              <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 py-3">
                Confirm Reservation Now
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px'
          }}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card border-0 shadow-2xl p-4 p-md-5 text-center"
              style={{ maxWidth: '500px', backgroundColor: 'var(--bg-color)' }}
            >
              <button 
                onClick={() => history.push('/')}
                className="btn btn-link text-muted position-absolute top-0 end-0 m-3 p-0"
              >
                <FaTimes size={24} />
              </button>
              
              <div className="bg-success-subtle text-success p-4 rounded-circle d-inline-block mb-4">
                <CheckCircle2 size={64} />
              </div>
              
              <h2 className="h3 fw-bold mb-2">Booking Confirmed!</h2>
              <p className="text-muted mb-5">Your adventure is officially reserved. Get ready for an unforgettable journey!</p>
              
              <div className="bg-light p-4 rounded-4 text-start mb-4">
                <div className="row g-3">
                  <div className="col-6">
                    <span className="text-muted small d-block">Traveler Name</span>
                    <span className="fw-bold">{book.firstName} {book.lastName}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted small d-block">Phone Number</span>
                    <span className="fw-bold">{book.phone}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted small d-block">Travel Date</span>
                    <span className="fw-bold">{book.date}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted small d-block">Group Size</span>
                    <span className="fw-bold">{numTour} Person(s)</span>
                  </div>
                  <div className="col-12 border-top pt-2 mt-2">
                    <span className="text-muted small d-block">Accommodation</span>
                    <span className="fw-bold text-primary">{book.roomBody}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => history.push('/')}
                className="btn btn-primary w-100 rounded-pill py-3 fw-bold"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Book;
