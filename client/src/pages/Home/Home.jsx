import { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Contact from "../../components/Contact/Contact";
import FeedBack from "../../components/FeedBack/FeedBack";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="home" id="home">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
      <FeedBack />
      <Contact />
    </div>
  );
};

export default Home;
