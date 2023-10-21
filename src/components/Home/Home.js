import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Banner from "./Banner";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Services from "./Services";
import Trusted from "./Trusted";
import MetaTag from "../Layout/MetaTag";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, featuredProduct } from "../../actions/productAction";
import { clearErrors as clearbannerErrors } from "../../actions/bannerAction";
import toast from "react-hot-toast";
import Loader from "../Layout/Loader/Loader";
import { getBanner } from "../../actions/bannerAction";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.featuredProducts
  );
  const { images, loading: imagesLoading, error: imagesError } = useSelector((state) => state.banner);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (imagesError) {
      toast.error(error);
      dispatch(clearbannerErrors());
    }

    dispatch(featuredProduct());
    dispatch(getBanner());
  }, [dispatch, error, imagesError]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaTag title={`BLUE STORE`} />
          <Header />

          {imagesLoading === false && !imagesError ? <Banner images={images.images} /> : null}

          <h2 className="homeHeading">Categories</h2>

          <div className="productCardContainer">
            <Categories />
          </div>

          <h2 className="homeHeading" id="featured">
            Featured Products
          </h2>

          <div className="productCardContainer">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="service" id="termsofservice">
            <Services />
          </div>

          <div className="trusted" id="partners">
            <Trusted />
          </div>

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
