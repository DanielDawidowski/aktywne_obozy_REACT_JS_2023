import React from "react";
import { motion } from "framer-motion";
import Layout from "@components/layout/Layout";
// import Carousel from "@components/carousel/Carousel";
import Home1 from "@assets/Images/filip-mroz-zK049OFP4uI-unsplash 4.jpg";
import Home2 from "@assets/Images/sporty_zimowe.jpg";
import Home3 from "@assets/Images/tatry.jpg";

import "@pages/home/Home.scss";
import "@components/carousel/Carousel.scss";
import Carousel from "@components/carousel/Carousel";

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
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
        exit={{ opacity: 0, x: 100, transition: { duration: 1.5 } }}
        transition={{ duration: 1.5 }}
        className="home__carousel"
      >
        <Carousel slides={homeSlides} />
      </motion.div>
    </Layout>
  );
};

export default Home;
