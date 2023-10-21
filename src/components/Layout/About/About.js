import React, { Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./About.css";

const About = () => {
  return (
    <Fragment>
      <Header />

      <div className="aboutContainer">
        <div>
          <div className="about1 bg1">
            <div className="aboutBox ab1">
              <p>Blue Store</p>
              <h1>World's Best Shopping Store</h1>
            </div>
          </div>
          {/*  */}
          <div className="about2 bg2">
            <div className="aboutBox">
              <p>Quatity</p>
              <h1>
                we Provide World's Best Quality Product Because Quality is Our
                First Priority
              </h1>
            </div>
          </div>
          {/*  */}
          <div className="about2 bg3">
            <div className="aboutBox">
              <p>Service</p>
              <h1>
                Our Service Centers Are Spreaded All Over The World And We Take
                Good Care Of Our Customers
              </h1>
            </div>
          </div>
          {/*  */}
          <div className="about1 bg4">
            <div className="aboutBox">
              <p>Developer</p>
              <h1>
                Hii! I'm Aryan Baghel Currently Pursuing Btech in CSBS in Oriental
                Institute Of Science And Technology Bhopal MP India And I'm a Full
                Stack Development Learner
              </h1>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default About;
