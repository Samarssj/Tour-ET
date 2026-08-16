import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";

function Swipper(props) {
  const listData = props.data;

  return (
    <div className="py-4 overflow-hidden">
      <div 
        className="d-flex gap-4 pb-4 px-2" 
        style={{ 
          overflowX: 'auto', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {listData?.map((indData, idx) => (
          <motion.div
            key={indData._id || idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card {...indData} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const Card = ({
  _id,
  name,
  location,
  pricePerAdult,
  rating,
  to_do_type,
  image,
}) => {
  const stars = Array(Math.round(rating || 0)).fill(0);

  return (
    <div className="card border-0 shadow-sm h-100" style={{ width: "320px", flex: '0 0 auto' }}>
      <Link className="text-decoration-none" to={`/package/${_id}`}>
        <div className="position-relative overflow-hidden" style={{ height: "220px" }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="transition-all duration-500 hover-scale-110"
            src={image && image[0]}
            alt={name}
          />
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge glass text-white rounded-pill px-3 py-2 small fw-bold">
              {to_do_type}
            </span>
          </div>
        </div>
        
        <div className="card-body p-3">
          <div className="d-flex align-items-center gap-1 text-warning mb-2">
            {stars.map((_, index) => (
              <Star key={index} size={14} fill="currentColor" />
            ))}
            <span className="text-muted small ms-1">({rating || 0})</span>
          </div>
          
          <h3 className="h6 fw-bold text-dark mb-2 text-truncate">{name}</h3>
          
          <div className="d-flex align-items-center gap-1 text-muted small mb-3">
            <MapPin size={12} />
            <span>{location}</span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="fw-bold text-primary">{pricePerAdult} <small className="text-muted fw-normal">birr</small></span>
            <span className="btn btn-link btn-sm p-0 text-decoration-none fw-bold">Details →</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Swipper;
