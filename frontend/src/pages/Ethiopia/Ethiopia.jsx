import React, { useState } from "react";
import "./Ethiopia.css";
import oryx from "../../assets/travel.jpg";
import jegol from "../../assets/jegol.jpg";
import eruption from "../../assets/eruption.jpg";
import africa from "../../assets/african-woman.gif";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, History, Mountain, Compass } from "lucide-react";

const Ethiopia = () => {
  const [selectedExp, setSelectedExp] = useState(null);

  const experiences = [
    {
      id: 1,
      title: "Historical Experience",
      subtitle: "Explore ancient walls and timeless architecture.",
      img: jegol,
      icon: <History size={32} />,
      content: "Ethiopia's history spans thousands of years, from the ancient Axumite Empire to the medieval castles of Gondar. Explore the 11 rock-hewn churches of Lalibela, a UNESCO World Heritage site carved from solid rock in the 12th century. Walk through the walled city of Harar Jugol, known as the 'City of Saints', and discover the ancient stelae of Axum, massive granite monoliths that date back to the 4th century.",
      highlights: ["Lalibela Rock Churches", "Gondar Castles", "Axum Stelae", "Harar Walled City"]
    },
    {
      id: 2,
      title: "Natural Experience",
      subtitle: "Witness rare wildlife in their natural habitat.",
      img: oryx,
      icon: <Mountain size={32} />,
      content: "From the dramatic Simien Mountains to the Rift Valley lakes, Ethiopia's natural beauty is unparalleled. Witness rare wildlife like the Walia Ibex and Gelada baboons in the 'Roof of Africa'. Explore the Bale Mountains National Park, a haven for endemic species like the Ethiopian Wolf. The Great Rift Valley offers a chain of beautiful lakes, each with its own unique ecosystem and incredible birdlife.",
      highlights: ["Simien Mountains", "Bale Mountains", "Rift Valley Lakes", "Endemic Wildlife"]
    },
    {
      id: 3,
      title: "Pure Adventure",
      subtitle: "Trek through active volcanoes and mountains.",
      img: eruption,
      icon: <Compass size={32} />,
      content: "For the ultimate thrill, venture into the Danakil Depression, one of the lowest and hottest places on Earth. Trek to the Erta Ale active volcano to witness a bubbling lava lake, and explore the surreal, colorful sulfur springs of Dallol. Experience the rugged beauty of the Afar region and the traditional salt caravans that have crossed these plains for centuries.",
      highlights: ["Erta Ale Volcano", "Dallol Sulfur Springs", "Danakil Depression", "Salt Caravans"]
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="ethiopia main-content-wrapper">
      {/* Hero Section */}
      <motion.div 
        className="ethio-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.h1 
            className="ethio-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ETHIOPIA
          </motion.h1>
          <motion.p 
            className="ethio-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Land of Origins
          </motion.p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="content-section">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.p className="story-para" variants={fadeInUp}>
            Ethiopia, a country located in the Horn of Africa, is a unique and
            diverse tourist destination that offers visitors an unparalleled
            experience. The country is known for its ancient history, rich culture,
            and stunning landscapes. Visitors to Ethiopia can explore the rock-hewn
            churches of Lalibela, which are considered one of the greatest
            architectural feats in the world.
          </motion.p>

          <motion.p className="story-para" variants={fadeInUp}>
            Another reason to visit Ethiopia is its rich and vibrant culture.
            Visitors can experience the country's diverse cultural traditions,
            including music, dance, and food. Ethiopian food is renowned for its
            unique flavors, and visitors can sample local delicacies such as injera,
            a sourdough flatbread, and wat, a spicy stew.
          </motion.p>

          <motion.div className="highlight-box" variants={fadeInUp}>
            <img src={africa} alt="Origins" />
            <p className="highlight-text">
              "As you explore Ethiopia, you will be put in touch with your own
              origins for this is the 'cradle of humanity'."
            </p>
          </motion.div>

          <motion.p className="story-para" variants={fadeInUp}>
            Ethiopia is also home to a diverse range of wildlife, which makes it an
            ideal destination for eco-tourism. Visitors can explore the country's
            national parks and conservation areas to witness rare and endangered
            species such as the Ethiopian wolf, the gelada baboon, and the mountain
            nyala.
          </motion.p>
        </motion.div>

        {/* Things To Do */}
        <div className="things-to-do-header">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Things To Do
          </motion.h2>
          <motion.p 
            className="lead text-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Click on the experiences below to discover more about what Ethiopia has to offer.
          </motion.p>
        </div>

        <motion.div 
          className="experience-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {experiences.map((exp) => (
            <motion.div 
              key={exp.id}
              className="experience-card" 
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedExp(exp)}
              style={{ cursor: 'pointer' }}
            >
              <img src={exp.img} alt={exp.title} />
              <div className="experience-overlay">
                <h4>{exp.title}</h4>
                <p>{exp.subtitle}</p>
                <div className="mt-3">
                  <span className="btn btn-sm btn-outline-light rounded-pill px-3">Learn More</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="exp-modal-overlay" onClick={() => setSelectedExp(null)}>
            <motion.div 
              className="exp-modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="exp-modal-close" onClick={() => setSelectedExp(null)}>
                <X size={24} />
              </button>
              
              <div className="row g-0 h-100">
                <div className="col-md-5 d-none d-md-block">
                  <img src={selectedExp.img} alt={selectedExp.title} className="exp-modal-img" />
                </div>
                <div className="col-md-7 p-4 p-md-5 overflow-auto">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="exp-modal-icon text-primary">
                      {selectedExp.icon}
                    </div>
                    <div>
                      <h2 className="fw-bold mb-0">{selectedExp.title}</h2>
                      <p className="text-muted mb-0">{selectedExp.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="exp-modal-text mb-4">
                    {selectedExp.content}
                  </p>
                  
                  <h5 className="fw-bold mb-3">Key Highlights:</h5>
                  <div className="d-flex flex-wrap gap-2 mb-5">
                    {selectedExp.highlights.map((h, i) => (
                      <span key={i} className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                        {h}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    className="btn btn-primary rounded-pill px-5 py-3 w-100"
                    onClick={() => setSelectedExp(null)}
                  >
                    Close Discovery
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Ethiopia;
