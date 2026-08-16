import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useAuthContext } from "../../customHook/useAuthContext";
import { motion } from "framer-motion";
import { BedDouble, Users, Check } from "lucide-react";

function Rooms({ id, image, name, isRoom, setIsRoom, description, book, setBook, setRoomSelect }) {
  const [rooms, setRooms] = useState([]);
  const { user } = useAuthContext();

  const fetchRoom = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/hotel/${id}/room?taken=true`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const result = await res.json();
      if (res.ok) {
        setRooms(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    }
  };

  const selectRoom = (roomId) => {
    const selected = rooms.find((room) => room._id === roomId);
    if (selected) {
      setBook({
        ...book,
        hotelId: id,
        roomId: selected._id,
        roomImg: selected.images[0],
        roomPrice: selected.price,
        roomBody: selected.description,
      });
      setRoomSelect(true);
      setIsRoom(false);
    }
  };

  useEffect(() => {
    if (user && user.token) {
      fetchRoom();
    }
  }, [id, user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rooms-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
        padding: "20px"
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card w-100 border-0 shadow-lg"
        style={{ 
          maxWidth: "1100px", 
          maxHeight: "90vh",
          backgroundColor: "var(--bg-color)",
          overflow: "hidden"
        }}
      >
        <div className="card-header border-bottom bg-transparent p-4 d-flex justify-content-between align-items-center">
          <div>
            <h2 className="h4 fw-bold mb-1 text-primary">Select a Room at {name}</h2>
            <p className="text-muted small mb-0">Browse available accommodations</p>
          </div>
          <button 
            onClick={() => setIsRoom(false)}
            className="btn btn-link text-muted p-0 hover-scale-110"
          >
            <ImCancelCircle size={32} />
          </button>
        </div>

        <div className="card-body p-4 overflow-auto">
          <div className="row g-4">
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => {
                const { _id, description, price, images, type, roomNumber } = room;
                const isSelected = book.roomId === _id;
                
                return (
                  <div key={_id} className="col-12 col-md-6 col-lg-4">
                    <motion.div
                      whileHover={{ y: -5 }}
                      onClick={() => selectRoom(_id)}
                      className={`card h-100 cursor-pointer transition-all border-2 ${
                        isSelected ? 'border-primary shadow-lg' : 'border-transparent'
                      }`}
                      style={{ 
                        backgroundColor: "var(--bg-secondary)", 
                        cursor: "pointer",
                        overflow: "hidden"
                      }}
                    >
                      <div className="position-relative">
                        <img
                          src={images[0]}
                          alt={`Room ${roomNumber}`}
                          className="card-img-top object-fit-cover"
                          style={{ height: "200px" }}
                        />
                        {isSelected && (
                          <div className="position-absolute top-0 end-0 m-2 bg-primary text-white p-2 rounded-circle shadow">
                            <Check size={16} strokeWidth={3} />
                          </div>
                        )}
                        <div className="position-absolute bottom-0 start-0 m-2 badge bg-primary">
                          {type}
                        </div>
                      </div>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="h6 fw-bold mb-0">Room #{roomNumber}</h5>
                          <span className="text-primary fw-bold">{price} <small>Birr</small></span>
                        </div>
                        <p className="text-muted small mb-0 line-clamp-2">
                          {description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status"></div>
                <p className="text-muted">Loading available rooms...</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Rooms;
