import { useScroll, useTransform, motion } from "framer-motion";
import "@components/scroll-text/ScrollText.scss";

const ScrollText = () => {
  const { scrollYProgress } = useScroll();
  const forwardX = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);
  return (
    <motion.div className="scroll__text">
      <motion.div className="scroll__text--section">
        <motion.h1 style={{ x: forwardX }} className="scroll__text--title">
          Wakacje ferie wakacje
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default ScrollText;
