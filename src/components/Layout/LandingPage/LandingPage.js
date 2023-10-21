import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import videoBg from "../../../assets/videoBg.mp4";
import MetaTag from "../MetaTag"

const LandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <Fragment>
      <MetaTag title={`WELCOME TO BLUE STORE`}/>

      <div className="landingPageContainer">
        <div className="overlay"></div>

        <video ref={videoRef} autoPlay loop id="videoBg">
          <source src={videoBg} type="video/mp4" />
        </video>

        <div className="content">
          <h1>Welcome To Blue Store</h1>
          <p>
            Make sure to allow cookie otherwise this site won't work properly
          </p>

          <button onClick={() => navigate(`/home`)} className="landingPageBtn">
            Home
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
