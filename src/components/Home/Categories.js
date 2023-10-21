import React from "react";
import { Link } from "react-router-dom";
import laptopPNG from "../../assets/Categories/laptop.png";
import mobilePNG from "../../assets/Categories/mobile-app.png";
import cameraPNG from "../../assets/Categories/camera.png";
import kidsPNG from "../../assets/Categories/toys.png";
import manPNG from "../../assets/Categories/man.png";
import womenPNG from "../../assets/Categories/sport-clothes.png";
import footPNG from "../../assets/Categories/sneakers.png";

const Categories = () => {
  

  return (
    <div className="categoryContainer">
      <div>
        <Link to={`/products?category=Laptop`}>
          <img src={laptopPNG} alt="Laptop" />
          <p>Laptops</p>
        </Link>
      </div>
      <div>
        <Link to={`/products?category=Mobile`}>
          <img src={mobilePNG} alt="Mobile" />
          <p>Mobiles</p>
        </Link>
      </div>
      <div>
        <Link to={`/products?category=Camera`}>
          <img src={cameraPNG} alt="Camera" />
          <p>Cameras</p>
        </Link>
      </div>
      <div>
        <Link  to={`/products?category=Men Wears`}>
          <img src={manPNG} alt="Man's Wear" />
          <p>Man's Wear</p>
        </Link>
      </div>
      <div>
        <Link to={`/products?category=Women Wears`}>
          <img src={womenPNG} alt="Women's Wear" />
          <p>Women's Wear</p>
        </Link>
      </div>
      <div>
        <Link to={`/products?category=Footwears`}>
          <img src={footPNG} alt="Footwears" />
          <p>Footwears</p>
        </Link>
      </div>
      <div>
        <Link to={`/products?category=Kid's Toy`}>
          <img src={kidsPNG} alt="toys" />
          <p>Toys</p>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
