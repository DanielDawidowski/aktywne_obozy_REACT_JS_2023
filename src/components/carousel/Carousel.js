import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import "@components/carousel/Carousel.scss";

const carouselVariants = {
  initial: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
      // scale: 0.5,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
    // scale: 1,
    // transition: 'ease-in',
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      // scale: 0.5,
      // transition: 'ease-in',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    };
  }
};

const Carousel = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextStep();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextStep]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function nextStep() {
    setDirection(1);
    if (index === slides.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  }

  function prevStep() {
    setDirection(-1);
    if (index === 0) {
      setIndex(slides.length - 1);
      return;
    }
    setIndex(index - 1);
  }

  return (
    <motion.div className="carousel">
      <motion.div className="carousel__inner">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div className="carousel__inner--title">
            <motion.h3 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}>
              {slides[index].title}
            </motion.h3>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div className="carousel__inner--slider">
            <motion.img
              whileTap={{ cursor: "grabbing" }}
              variants={carouselVariants}
              animate="animate"
              initial="initial"
              exit="exit"
              src={slides[index].image}
              alt="slides"
              className="carousel__slide"
              key={slides[index].id}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 800, bounceDamping: 10 }}
              onDragEnd={(e, { offset, velocity }) => {
                // console.log("velocity", velocity);
                if (offset.x > 10) {
                  nextStep();
                } else if (offset.x < -10) {
                  prevStep();
                }
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

Carousel.propTypes = {
  slides: PropTypes.array
};

export default Carousel;
