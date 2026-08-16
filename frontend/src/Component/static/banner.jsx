import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = ({ title, text, path, buttonText, img, left }) => {
  return (
    <div className="banner py-5 overflow-hidden">
      <div className="container">
        <div className={`row align-items-center g-5 ${left ? 'flex-row' : 'flex-row-reverse'}`}>
          <motion.div 
            className="col-12 col-md-6"
            initial={{ opacity: 0, x: left ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="position-relative">
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary rounded-4 translate-middle-x translate-middle-y opacity-10" style={{ zIndex: -1, transform: 'translate(-20px, -20px)' }}></div>
              <img 
                className="img-fluid rounded-4 shadow-lg w-100" 
                src={img} 
                alt={title} 
                style={{ objectFit: 'cover', height: '400px' }}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="col-12 col-md-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={`ps-md-${left ? '4' : '0'} pe-md-${left ? '0' : '4'}`}>
              <h3 className="display-5 fw-bold mb-4 text-uppercase tracking-tight">{title}</h3>
              <p className="lead text-secondary mb-5">{text}</p>
              <Link to={path} className="btn btn-primary btn-lg rounded-pill px-5 d-inline-flex align-items-center gap-2">
                {buttonText} <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
