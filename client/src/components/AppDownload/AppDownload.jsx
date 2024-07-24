import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download-box" id="appDownload">
      <div className="heading-box">
        <h2 className="main-heading">For Better Experience </h2>
        <h3 className="sub-heading">Download QuickBite App</h3>
      </div>

      <div className="image-box">
        <img src={assets.play_store} alt="Play store Image" />
        <img src={assets.app_store} alt="App Store Image" />
      </div>
    </div>
  );
};

export default AppDownload;
