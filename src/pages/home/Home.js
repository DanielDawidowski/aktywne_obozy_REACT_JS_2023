import React from "react";
import { motion } from "framer-motion";
import Layout from "@components/layout/Layout";
// import Carousel from "@components/carousel/Carousel";
import Home1 from "@assets/Images/filip-mroz-zK049OFP4uI-unsplash 4.jpg";
import Home2 from "@assets/Images/sporty_zimowe.jpg";
import Home3 from "@assets/Images/tatry.jpg";
// import Home4 from "@assets/Images/home_icons.jpg";
import Home5 from "@assets/Images/energylandia.jpg";
import Home6 from "@assets/Images/narty.jpg";

import "@pages/home/Home.scss";

import Carousel from "@components/carousel/Carousel";
import ScrollText from "@components/scroll-text/ScrollText";
import Dots from "@assets/SVG/Dots";
import Divider from "@components/divider/Divider";
import { Link } from "react-router-dom";
import Image from "@components/image/Image";

const homeSlides = [
  {
    id: 0,
    title: "Organizujemy kolonie nad morzem",
    image: Home1
  },
  {
    id: 1,
    title: "Organizujemy zimowe wyjazdy w góry",
    image: Home2
  },
  {
    id: 2,
    title: "Organizujemy letnie wyjazdy w góry",
    image: Home3
  }
];

const Home = () => {
  return (
    <Layout>
      <motion.div className="home">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
          exit={{ opacity: 0, x: 100, transition: { duration: 1.5 } }}
          transition={{ duration: 1.5 }}
          className="home__carousel"
        >
          <Carousel slides={homeSlides} />
        </motion.div>
        <motion.div>
          <motion.div className="home__icons">
            <Link to="/events">
              <h1>Zobacz</h1>
            </Link>
          </motion.div>
        </motion.div>
        <Divider />
        <motion.div className="home__scroll">
          <ScrollText />
        </motion.div>
        <motion.div className="home__events">
          <div className="home__events--item">
            <Image src={Home5} alt="energylandia" />
            <div className="title__dots">
              <Dots color={"#4d908e"} />
              <h2>
                Każdy wyjazd w góry to cały dzień w <span className="text__decoration">Energylandii</span>
              </h2>
            </div>
            <Divider />
          </div>
          <div className="home__events--item">
            <Image src={Home6} alt="gory" />
            <div className="title__dots">
              <Dots color={"#4d908e"} />
              <h2>
                Zima to czas <span className="text__decoration">na ferie</span> w górach
              </h2>
            </div>
            <Divider />
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Home;
