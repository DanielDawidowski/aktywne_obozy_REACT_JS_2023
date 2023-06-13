import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "@components/image/Image.scss";

const Image = ({ src, alt }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <motion.div className={`${pulsing ? "pulse" : ""} loadable`}>
      <motion.img
        initial={{ height: "50%", opacity: 0 }}
        // style={{ height: imageLoading ? "6rem" : "auto" }}
        animate={{
          height: imageLoading ? "100%" : "auto",
          opacity: imageLoading ? 0 : 1
        }}
        transition={({ height: { delay: 0, duration: 0.4 } }, { opacity: { delay: 0.5, duration: 0.4 } })}
        onLoad={imageLoaded}
        src={src}
        alt={alt}
        loading="lazy"
      />
    </motion.div>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

export default Image;
