import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@components/layout/Layout";
import Home1Big from "@assets/Images/narty-big.jpg";
import { homeSlides, homeSlidesBig } from "@service/utils/home-utils.service";
import Carousel from "@components/carousel/Carousel";
import ScrollText from "@components/scroll-text/ScrollText";
// import Dots from "@assets/SVG/Dots";
import Divider from "@components/divider/Divider";
import Image from "@components/image/Image";

import "@pages/home/Home.scss";
import RandomIcons from "@components/randomIcons/RandomIcons";

const Home = () => {
  return (
    <Layout>
      <motion.div className="home">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
          exit={{ opacity: 0, x: 100, transition: { duration: 1.5 } }}
          transition={{ duration: 1.5 }}
          className="home__carousel container"
        >
          <div className="home__carousel--small">
            <Carousel slides={homeSlides} />
          </div>
          <div className="home__carousel--big">
            <Carousel slides={homeSlidesBig} />
          </div>
        </motion.div>
        <motion.div className="home__icons">
          <Link to="/events">
            <h2>Zobacz</h2>
          </Link>
        </motion.div>
        <Divider />
        <motion.div className="home__scroll">
          <ScrollText />
        </motion.div>
        <motion.div className="home__events">
          <div className="home__events--item">
            <div className="home__events--item--image"></div>
            <div className="title__dots">
              {/* <Dots color={"#f7b124"} /> */}
              <h2>
                Każdy wyjazd w góry to cały dzień w <span className="text__decoration">Energylandii</span>
              </h2>
            </div>
            <Divider />
          </div>
          <div className="home__events--item">
            <Image src={Home1Big} alt="gory" />
            <div className="title__dots">
              {/* <Dots color={"#f7b124"} /> */}
              <h2>
                Zima to czas <span className="text__decoration">na ferie</span> w górach
              </h2>
            </div>
            <Divider />
          </div>
        </motion.div>
        <motion.div className="home__bottom container">
          <div className="home__bottom--xsmall">
            <RandomIcons flex num={2} />
          </div>
          <div className="home__bottom--small">
            <RandomIcons flex num={4} />
          </div>
          <div className="home__bottom--medium">
            <RandomIcons flex num={6} />
          </div>
          <div className="home__bottom--large">
            <RandomIcons flex num={8} />
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Home;
