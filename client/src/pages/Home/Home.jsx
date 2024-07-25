import { useState } from "react";
import "./Home.css";
import Banner from "../../components/Banner/banner";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import FeedBack from "../../components/FeedBack/FeedBack";
import FormBox from "../../components/FormBox/FormBox";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="home" id="home">
      <Banner />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <FeedBack />
      <FormBox />
      <AppDownload />
    </div>
  );
};

export default Home;
