import React from "react";
import "./Ethiopia.css";
import oryx from "../../assets/travel.jpg";
import jegol from "../../assets/jegol.jpg";
import eruption from "../../assets/eruption.jpg";
import africa from "../../assets/african-woman.gif";
import { motion } from "framer-motion";

const Ethiopia = () => {
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

          <motion.p className="story-para" variants={fadeInUp}>
            Finally, Ethiopia's warm and welcoming people make it an ideal
            destination for those looking for an immersive cultural experience.
            Visitors to the country can expect to be greeted with hospitality and
            kindness from the locals. Ethiopia is also one of the safest
            destinations in Africa.
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
            Limitless possibilities for outdoor enthusiasts and curious travellers.
          </motion.p>
        </div>

        <motion.div 
          className="experience-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="experience-card" variants={fadeInUp}>
            <img src={jegol} alt="Historical" />
            <div className="experience-overlay">
              <h4>Historical Experience</h4>
              <p>Explore ancient walls and timeless architecture.</p>
            </div>
          </motion.div>

          <motion.div className="experience-card" variants={fadeInUp}>
            <img src={oryx} alt="Natural" />
            <div className="experience-overlay">
              <h4>Natural Experience</h4>
              <p>Witness rare wildlife in their natural habitat.</p>
            </div>
          </motion.div>

          <motion.div className="experience-card" variants={fadeInUp}>
            <img src={eruption} alt="Adventure" />
            <div className="experience-overlay">
              <h4>Pure Adventure</h4>
              <p>Trek through active volcanoes and mountains.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ethiopia;
