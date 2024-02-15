import Announcement from "../components/Announcement";
import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../Newsletter";
import Footer from "../components/Footer";
import styles from "./scrollbarStyles.module.css";

const Home = () => {
  return (
    <>
      <style>{`.${styles["::-webkit-scrollbar-track"]}`}</style>
      <style>{`.${styles["::-webkit-scrollbar-thumb"]}`}</style>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      {/* <Tutorial /> */}
      <Footer />
    </>
  );
};

export default Home;
