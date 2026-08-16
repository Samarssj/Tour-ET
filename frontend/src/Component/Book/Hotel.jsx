import React, { useState } from "react";
import Rooms from "./Rooms";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Info, ChevronDown, ChevronUp } from "lucide-react";

function Hotel({ _id, name, image, description, book, setBook, setRoomSelect }) {
  const [isRoom, setIsRoom] = useState(false);

  return (
    <motion.div
      layout
      className="card h-100 border-0 shadow-sm overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="position-relative" style={{ height: "200px" }}>
        <img
          src={image}
          alt={name}
          className="w-100 h-100 object-fit-cover"
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-to-t from-black to-transparent text-white">
          <h3 className="h5 fw-bold mb-0 text-white">{name}</h3>
        </div>
      </div>
      
      <div className="card-body p-3">
        <p className="text-muted small mb-3">
          {description.slice(0, 100)}...
        </p>
        
        <button
          onClick={() => setIsRoom(!isRoom)}
          className={`btn w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-2 transition-all ${
            isRoom ? 'btn-primary' : 'btn-outline-primary'
          }`}
        >
          {isRoom ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <span className="fw-bold">{isRoom ? 'Hide Rooms' : 'Show Rooms'}</span>
          <Bed size={18} />
        </button>

        <AnimatePresence>
          {isRoom && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 border-top pt-3">
                <Rooms
                  id={_id}
                  name={name}
                  image={image}
                  description={description}
                  isRoom={isRoom}
                  setIsRoom={setIsRoom}
                  book={book}
                  setBook={setBook}
                  setRoomSelect={setRoomSelect}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Hotel;
