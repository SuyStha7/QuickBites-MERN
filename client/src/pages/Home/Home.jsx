import { useState } from "react";
import "./Home.css";
import Banner from "../../components/Banner/banner";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Contact from "../../components/Contact/Contact";
import FeedBack from "../../components/FeedBack/FeedBack";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="home" id="home">
      <Banner />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
      <FeedBack />
      <Contact />
    </div>
  );
};

export default Home;
