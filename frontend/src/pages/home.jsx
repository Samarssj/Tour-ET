import React, { useState, useEffect } from "react";
import Swipper from "../Component/static/Swipper";
import Banner from "../Component/static/banner";
import { Link } from "react-router-dom";
import useFetch from "../customHook/useFetch";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Star, X, MapPin, Info, Globe } from "lucide-react";

const Home = () => {
  const [selectedExplore, setSelectedExplore] = useState(null);
  const [s_name, setName] = useState("");
  const [cityList, setCityList] = useState([]);

  const banner2Info = {
    left: false,
    buttonText: "Explore more",
    path: "/",
    title: "More about ethiopia",
    img: "https://destinationreporterindia.com/wp-content/uploads/2019/04/DR-WEB-Ethiopia.jpg",
    text: "Ethiopia is home to the lowest place on the African continent, the Danakil Depression. The depression is at the junction of three tectonic plates in the Horn of Africa, and sits at approximately 125 metres below sea level. At 200 kilometres long by 50 metres wide, this relatively small desert is also home to roughly 25% of Africa’s volcanoes!",
  };
  
  const banner1Info = {
    left: true,
    buttonText: "Explore more",
    path: "/",
    title: "Visit Ethiopia Now",
    img: "https://www.begatoursethiopia.com/images/collage.jpg",
    text: "Ethiopia is home to the lowest place on the African continent, the Danakil Depression. The depression is at the junction of three tectonic plates in the Horn of Africa, and sits at approximately 125 metres below sea level. At 200 kilometres long by 50 metres wide, this relatively small desert is also home to roughly 25% of Africa’s volcanoes!",
  };

  const exploreCards = [
    {
      title: "Rock Lalibela",
      img: "https://images.unsplash.com/flagged/photo-1572644973628-e9be84915d59?auto=format&fit=crop&w=800&q=80",
      text: "Lalibela is a UNESCO World Heritage site located in the northern region of Ethiopia, known for its exceptional rock-cut churches carved out of solid basaltic rock.",
      content: "Lalibela is famous for its 11 monolithic churches, carved from solid rock in the 12th century. It remains a major place of pilgrimage for Ethiopian Orthodox Christians. The churches are not built with stone or brick, but rather excavated from the ground, creating a subterranean world of spiritual wonder. Each church is unique in design and interconnected by a network of tunnels and trenches.",
      highlights: ["Bet Giyorgis (St. George)", "Rock-cut architecture", "Ancient Tunnels", "Religious Festivals"]
    },
    {
      title: "Rift Valley",
      img: "https://images.unsplash.com/photo-1580320209809-a0c51e645872?auto=format&fit=crop&w=800&q=80",
      text: "The Ethiopian Rift Valley is a section of the larger East Valley that runs through Ethiopia, and is a wonder with a diverse people and cultural attractions.",
      content: "The Great Rift Valley in Ethiopia is a stunning geological feature visible from space. It is home to a chain of beautiful lakes including Langano, Ziway, and Abaya. The region is a haven for birdwatchers and nature enthusiasts, offering hot springs, national parks, and a chance to meet diverse ethnic groups like the Dorze and Konso. The valley's volcanic history has created a landscape of dramatic cliffs and fertile plains.",
      highlights: ["Lake Langano", "Birdwatching", "Hot Springs", "Cultural Diversity"]
    },
    {
      title: "Ancient Axum",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/07/1c/01/getlstd-property-photo.jpg?w=800&h=800&s=1",
      text: "Axum is its remarkable stelae. These stelae are a testament to the engineering and artistic skill of the Aksumites and are considered one of the greatest archaeological wonders.",
      content: "Axum was the center of the powerful Aksumite Empire, one of the four great powers of the ancient world. The city is famous for its towering granite stelae, some reaching over 30 meters in height. It is also the legendary home of the Queen of Sheba and the final resting place of the Ark of the Covenant, kept in the Chapel of the Tablet at St. Mary of Zion Church. Axum represents the very dawn of Ethiopian civilization.",
      highlights: ["Great Stelae Field", "Ark of the Covenant", "Queen of Sheba's Palace", "Ancient Inscriptions"]
    }
  ];

  const { data: recentpkg } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/package`);
  const { data: popularPkg } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/package?sort=rating`);

  const { data: searchData } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/package?location=${s_name}`,
    s_name
  );

  useEffect(() => {
    if (s_name && searchData) {
      if (searchData.length > 0) {
        setCityList(searchData);
      } else {
        setCityList([{ name: "No City Package Was Found", location: "No results" }]);
      }
    } else {
      setCityList([]);
    }
  }, [searchData, s_name]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="main-content-wrapper"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Search Section */}
      <div className="hero-section position-relative py-5 overflow-hidden" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container text-center z-index-1">
          <motion.h1 
            className="display-3 fw-bold mb-4"
            variants={itemVariants}
          >
            Discover the Heart of <span className="text-primary">Ethiopia</span>
          </motion.h1>
          <motion.p 
            className="lead mb-5 text-secondary mx-auto" 
            style={{ maxWidth: '600px' }}
            variants={itemVariants}
          >
            From ancient wonders to breathtaking landscapes, start your journey in the cradle of mankind.
          </motion.p>
          
          <motion.div 
            className="search-container mx-auto position-relative" 
            style={{ maxWidth: '600px' }}
            variants={itemVariants}
          >
            <div className="input-group input-group-lg shadow-lg rounded-pill overflow-hidden bg-white border">
              <span className="input-group-text bg-transparent border-0 ps-4">
                <Search className="text-primary" size={24} />
              </span>
              <input
                type="text"
                className="form-control border-0 shadow-none py-4 fs-5"
                placeholder="Where would you like to go?"
                value={s_name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {cityList.length > 0 && (
              <motion.div 
                className="search-results glass position-absolute w-100 mt-2 rounded-4 shadow-xl overflow-hidden z-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {cityList.map((city, index) => (
                  <Link
                    key={index}
                    className="text-decoration-none d-block p-3 border-bottom hover-bg-light transition-colors"
                    to={city._id ? `/package/${city._id}` : "#"}
                  >
                    <div className="d-flex align-items-center gap-3 text-start">
                      <Compass size={18} className="text-primary" />
                      <div>
                        <div className="fw-bold text-dark">{city.location}</div>
                        <div className="small text-muted">{city.name}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Recent Packages */}
      <section className="py-5 bg-secondary-subtle">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="display-6 fw-bold mb-0">Recent Packages</h2>
              <p className="text-muted mb-0">Newly added destinations just for you</p>
            </div>
            <Link to="/package" className="btn btn-outline-primary rounded-pill">View All</Link>
          </div>
          <motion.div className="site container-fluid p-0" variants={itemVariants}>
            <Swipper data={recentpkg} />
          </motion.div>
        </div>
      </section>

      <Banner {...banner2Info} />

      {/* Top Rated Packages */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="display-6 fw-bold mb-0">Top Rated Experiences</h2>
              <p className="text-muted mb-0">Hand-picked adventures highly recommended by travelers</p>
            </div>
            <div className="d-flex gap-2">
              <Star className="text-warning fill-warning" />
              <span className="fw-bold">Popular Choice</span>
            </div>
          </div>
          <motion.div className="site" variants={itemVariants}>
            <Swipper data={popularPkg} />
          </motion.div>
        </div>
      </section>

      <Banner {...banner1Info} />

      {/* Explore More Cards */}
      <section className="explore py-5 bg-secondary-subtle">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold">More to Explore</h2>
            <div className="mx-auto bg-primary rounded-pill mt-2" style={{ width: '60px', height: '4px' }}></div>
          </div>
          
          <div className="row g-4">
            {exploreCards.map((card, idx) => (
              <motion.div 
                key={idx} 
                className="col-12 col-md-4"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div 
                  className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedExplore(card)}
                >
                  <div className="overflow-hidden" style={{ height: '250px' }}>
                    <img src={card.img} className="card-img-top h-100 w-100 object-fit-cover" alt={card.title} />
                  </div>
                  <div className="card-body p-4">
                    <h3 className="h4 mb-3">{card.title}</h3>
                    <p className="card-text text-secondary">{card.text}</p>
                    <button className="btn btn-link text-primary p-0 fw-bold text-decoration-none mt-2">Explore Now →</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Detail Modal */}
      <AnimatePresence>
        {selectedExplore && (
          <div className="exp-modal-overlay" onClick={() => setSelectedExplore(null)}>
            <motion.div 
              className="exp-modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="exp-modal-close" onClick={() => setSelectedExplore(null)}>
                <X size={24} />
              </button>
              
              <div className="row g-0 h-100">
                <div className="col-md-5 d-none d-md-block">
                  <img src={selectedExplore.img} alt={selectedExplore.title} className="exp-modal-img" />
                </div>
                <div className="col-md-7 p-4 p-md-5 overflow-auto">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="exp-modal-icon text-primary">
                      <Globe size={32} />
                    </div>
                    <div>
                      <h2 className="fw-bold mb-0">{selectedExplore.title}</h2>
                      <p className="text-muted mb-0">Cultural Discovery</p>
                    </div>
                  </div>
                  
                  <p className="exp-modal-text mb-4">
                    {selectedExplore.content}
                  </p>
                  
                  <h5 className="fw-bold mb-3">What to see:</h5>
                  <div className="d-flex flex-wrap gap-2 mb-5">
                    {selectedExplore.highlights.map((h, i) => (
                      <span key={i} className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                        {h}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    className="btn btn-primary rounded-pill px-5 py-3 w-100"
                    onClick={() => setSelectedExplore(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
