import React from "react";
import { motion } from "framer-motion";
import Layout from "@components/layout/Layout";

function Home() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
        exit={{ opacity: 0, x: 100, transition: { duration: 1.5 } }}
        transition={{ duration: 1.5 }}
      >
        <h1>home</h1>
      </motion.div>
    </Layout>
  );
}

export default Home;
