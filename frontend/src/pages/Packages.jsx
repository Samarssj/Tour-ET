import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetch from "../customHook/useFetch";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, MapPin, Star, Calendar, ArrowRight, RefreshCw } from "lucide-react";

const Packages = () => {
  const [datas, setDatas] = useState([]);
  const [dropDown, setDropDown] = useState({ type: "any", price: "any", rate: "any" });
  const [page, setPage] = useState(1);
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/package?page=${page}`,
    page
  );

  useEffect(() => {
    if (data && page === 1) {
      setDatas([...data]);
    } else if (data) {
      setDatas((prev) => [...prev, ...data]);
    }
  }, [data, page]);

  const handleChange = (e) => {
    setDropDown({ ...dropDown, [e.target.name]: e.target.value });
  };

  const handeLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const Find = async () => {
    let type = dropDown.type === "any" ? false : dropDown.type;
    let price = dropDown.price === "any" ? false : dropDown.price;
    let rate = dropDown.rate === "any" ? false : dropDown.rate;

    const queryParams = new URLSearchParams();
    if (type) queryParams.append("type", type);
    if (price) queryParams.append("priceRange", price);
    if (rate) queryParams.append("rating", rate);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/package?${queryParams.toString()}`
    );
    const result = await response.json();
    if (response.ok) {
      setDatas(result.data);
    }
  };

  const resetFilter = () => {
    setDropDown({ type: "any", price: "any", rate: "any" });
    setPage(1);
  };

  return (
    <section className="main-content-wrapper py-5">
      <div className="container">
        <div className="row g-4">
          {/* Filter Sidebar */}
          <motion.aside 
            className="col-12 col-md-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: '100px' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0 d-flex align-items-center gap-2">
                  <Filter size={18} /> Filter
                </h2>
                <button
                  onClick={resetFilter}
                  className="btn btn-link btn-sm text-decoration-none p-0 d-flex align-items-center gap-1"
                >
                  <RefreshCw size={14} /> Reset
                </button>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Category</label>
                <select
                  className="form-select"
                  name="type"
                  onChange={handleChange}
                  value={dropDown.type}
                >
                  <option value="any">All Types</option>
                  <option value="Group">Group</option>
                  <option value="Park">Park</option>
                  <option value="City">City</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Budget</label>
                <select
                  className="form-select"
                  name="price"
                  onChange={handleChange}
                  value={dropDown.price}
                >
                  <option value="any">Any Price</option>
                  <option value="less5000">Under 5,000</option>
                  <option value="5000-10000">5,000 - 10,000</option>
                  <option value="10000-15000">10,000 - 15,000</option>
                  <option value="morethan15000">Above 15,000</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Minimum Rating</label>
                <select
                  className="form-select"
                  name="rate"
                  onChange={handleChange}
                  value={dropDown.rate}
                >
                  <option value="any">Any Rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>

              <button
                className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                onClick={Find}
              >
                <Search size={18} /> Search
              </button>
            </div>
          </motion.aside>

          {/* Package List */}
          <div className="col-12 col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 fw-bold mb-0">Explore Packages</h1>
              <span className="text-muted small">{datas.length} results found</span>
            </div>

            <AnimatePresence mode="popLayout">
              {datas.length === 0 ? (
                <motion.div 
                  className="text-center py-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-light rounded-circle p-4 d-inline-block mb-3">
                    <Search size={48} className="text-muted" />
                  </div>
                  <h3>No packages found</h3>
                  <p className="text-muted">Try adjusting your filters to find more results.</p>
                </motion.div>
              ) : (
                <div className="row g-4">
                  {datas.map((pkg, index) => (
                    <motion.div 
                      key={pkg._id || index}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="col-12"
                    >
                      <div className="card package-item-card border-0 shadow-sm overflow-hidden">
                        <div className="row g-0">
                          <div className="col-md-4 position-relative">
                            <img
                              className="img-fluid h-100 w-100 object-fit-cover"
                              src={pkg.image && pkg.image[0]}
                              alt={pkg.name}
                              style={{ minHeight: '200px' }}
                            />
                            <div className="position-absolute top-0 start-0 m-3">
                              <span className="badge bg-primary rounded-pill px-3 py-2 shadow-sm">
                                {pkg.type}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body p-4 h-100 d-flex flex-column">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h3 className="h5 fw-bold mb-0">{pkg.name}</h3>
                                <div className="d-flex align-items-center gap-1 text-warning">
                                  <Star size={16} fill="currentColor" />
                                  <span className="fw-bold text-dark small">{pkg.rating || 0}</span>
                                </div>
                              </div>
                              
                              <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                                <MapPin size={14} /> {pkg.location}
                              </div>

                              <p className="text-secondary small mb-4 flex-grow-1">
                                {pkg.description && pkg.description[0]?.content?.substring(0, 120)}...
                              </p>

                              <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                                <div>
                                  <span className="text-muted small d-block">Price per adult</span>
                                  <span className="h5 fw-bold text-primary mb-0">{pkg.pricePerAdult} <small className="fw-normal text-muted">birr</small></span>
                                </div>
                                <Link
                                  className="btn btn-outline-primary rounded-pill px-4 d-flex align-items-center gap-2"
                                  to={`/package/${pkg._id}`}
                                >
                                  View Details <ArrowRight size={16} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {datas.length > 0 && datas.length % 10 === 0 && (
              <div className="text-center mt-5">
                <button
                  className="btn btn-outline-primary rounded-pill px-5 py-2"
                  onClick={handeLoadMore}
                >
                  Load More Packages
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
