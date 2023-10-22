import React, { Fragment, useEffect, useState } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { BsSearch as SearchIcon } from "react-icons/bs";
import { TbPigMoney as sliderIcon } from "react-icons/tb";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Box,
} from "@chakra-ui/react";
import { Rating } from "@material-ui/lab";
import Pagination from "react-js-pagination";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, filteredProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../Layout/Loader/Loader";
import { useLocation } from "react-router-dom";
import {AiFillCaretDown as Down} from "react-icons/ai"
import {BiSolidUpArrow as Up} from "react-icons/bi"

const categories = [
  "Laptop",
  "Mobile",
  "Camera",
  "Kid's Toy",
  "Men Wears",
  "Women Wears",
  "Footwears",
];

const Product = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 20000]);
  const [ratings, setRatings] = useState(0);
  const [selected, setSelected] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = new URLSearchParams(location.search);
  const homeCategory = searchParams.get("category");

  const {
    products,
    productCount,
    filteredProductCount,
    resultPerPage,
    loading,
    error,
  } = useSelector((state) => state.filteredProducts);

  const selectHandler = (i) => {
    setSelected(i);
  };

  const searchSubitHandler = (e) => {
    e.preventDefault();
  };

  const setCurrentPageNo = (e) => {
    window.scrollTo(0, 0);
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (location.search !== "") {
      setCategory(homeCategory);
      setSelected(homeCategory);
      dispatch(filteredProduct(keyword, price, ratings, currentPage, category));
    } else {
      dispatch(filteredProduct(keyword, price, ratings, currentPage, category));
    }

  }, [dispatch, error, keyword, price, ratings, currentPage, category, homeCategory, location]);

  return (
    <Fragment>
      <Header />

      <div className="container">
        <div className="productContainer">
          <div>
            <div className="search">
              <h2>Search</h2>
              <form onSubmit={searchSubitHandler}>
                <input
                  type="text"
                  placeholder="Search.."
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">
                  <SearchIcon />
                </button>
              </form>
            </div>
            {/*  */}
            {window.innerWidth <= Number(600) ? (
              <div>
                <button
                  className="filterBtn"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span>Filters</span> {showFilters ? <Up /> : <Down />}
                </button>
                {showFilters ? (
                  <div className="filterDivForMobile">
                    <div
                      style={
                        showFilters
                          ? {
                              animationName: "dropDown",
                              animationDuration: "2s",
                              backgroundColor: "white",
                              height: "48vh",
                              borderBottom: "1px solid black"
                            }
                          : { animationName: "dropUp", animationDuration: "2s" }
                      }
                      className="expandable"
                    >
                      <div className="categories">
                        <h2>Categories</h2>
                        <ul>
                          <li onClick={() => setCategory("")}>
                            <div>
                              <input
                                type="checkbox"
                                id="All"
                                name="All"
                                value={``}
                                checked={selected === "All"}
                                onChange={() => selectHandler("All")}
                              />
                              <label
                                htmlFor="All"
                                style={
                                  selected === "All"
                                    ? { color: "#1f97d4" }
                                    : null
                                }
                              >
                                All
                              </label>
                            </div>
                          </li>
                          {categories &&
                            categories.map((category) => (
                              <li
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                <div>
                                  <input
                                    type="checkbox"
                                    id={category}
                                    name={category}
                                    value={category}
                                    checked={selected === category}
                                    onChange={() => selectHandler(category)}
                                  />
                                  <label
                                    htmlFor={category}
                                    style={
                                      selected === category
                                        ? { color: "#1f97d4" }
                                        : null
                                    }
                                  >
                                    {category}
                                  </label>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                      {/*  */}
                      <div className="priceSlider">
                        <h2>Price</h2>
                        <div className="slider">
                          <RangeSlider
                            value={price}
                            onChange={(newPrice) => setPrice(newPrice)}
                            aria-labelledby="range-slider"
                            min={0}
                            max={20000}
                            step={1000}
                          >
                            <RangeSliderMark
                              value={price[0]}
                              alignItems={`center`}
                              mt="-10"
                              ml="-5"
                            >
                              ₹{price[0]}
                            </RangeSliderMark>
                            <RangeSliderMark
                              value={price[1]}
                              alignItems={`center`}
                              mt="-10"
                              ml="-5"
                            >
                              ₹{price[1]}
                            </RangeSliderMark>
                            <RangeSliderTrack bg="black.100">
                              <RangeSliderFilledTrack bg="#1f97d4" />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0}>
                              <Box color="#1f97d4" as={sliderIcon} />
                            </RangeSliderThumb>
                            <RangeSliderThumb boxSize={6} index={1}>
                              <Box color="#1f97d4" as={sliderIcon} />
                            </RangeSliderThumb>
                          </RangeSlider>
                        </div>
                      </div>
                      {/*  */}
                      <div className="rating">
                        <h2>Customer Rating</h2>
                        <div>
                          <Rating
                            name="Rating"
                            size="large"
                            value={ratings}
                            onChange={(e, newRating) => {
                              if (newRating === null) {
                                setRatings(0);
                              } else {
                                setRatings(newRating);
                              }
                            }}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                pointerEvents: "auto",
                                width: "1.7vmax",
                                "@media(max-width: 600px)": {
                                  width: "3.3vmax",
                                },
                              },
                            }}
                            precision={0.5}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="filterDivForMobile">
                <div className="expandable">
                  <div className="categories">
                    <h2>Categories</h2>
                    <ul>
                      <li onClick={() => setCategory("")}>
                        <div>
                          <input
                            type="checkbox"
                            id="All"
                            name="All"
                            value={``}
                            checked={selected === "All"}
                            onChange={() => selectHandler("All")}
                          />
                          <label
                            htmlFor="All"
                            style={
                              selected === "All" ? { color: "#1f97d4" } : null
                            }
                          >
                            All
                          </label>
                        </div>
                      </li>
                      {categories &&
                        categories.map((category) => (
                          <li
                            key={category}
                            onClick={() => setCategory(category)}
                          >
                            <div>
                              <input
                                type="checkbox"
                                id={category}
                                name={category}
                                value={category}
                                checked={selected === category}
                                onChange={() => selectHandler(category)}
                              />
                              <label
                                htmlFor={category}
                                style={
                                  selected === category
                                    ? { color: "#1f97d4" }
                                    : null
                                }
                              >
                                {category}
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/*  */}
                  <div className="priceSlider">
                    <h2>Price</h2>
                    <div className="slider">
                      <RangeSlider
                        value={price}
                        onChange={(newPrice) => setPrice(newPrice)}
                        aria-labelledby="range-slider"
                        min={0}
                        max={20000}
                        step={1000}
                      >
                        <RangeSliderMark
                          value={price[0]}
                          alignItems={`center`}
                          mt="-10"
                          ml="-5"
                        >
                          ₹{price[0]}
                        </RangeSliderMark>
                        <RangeSliderMark
                          value={price[1]}
                          alignItems={`center`}
                          mt="-10"
                          ml="-5"
                        >
                          ₹{price[1]}
                        </RangeSliderMark>
                        <RangeSliderTrack bg="black.100">
                          <RangeSliderFilledTrack bg="#1f97d4" />
                        </RangeSliderTrack>
                        <RangeSliderThumb boxSize={6} index={0}>
                          <Box color="#1f97d4" as={sliderIcon} />
                        </RangeSliderThumb>
                        <RangeSliderThumb boxSize={6} index={1}>
                          <Box color="#1f97d4" as={sliderIcon} />
                        </RangeSliderThumb>
                      </RangeSlider>
                    </div>
                  </div>
                  {/*  */}
                  <div className="rating">
                    <h2>Customer Rating</h2>
                    <div>
                      <Rating
                        name="Rating"
                        size="large"
                        value={ratings}
                        onChange={(e, newRating) => {
                          if (newRating === null) {
                            setRatings(0);
                          } else {
                            setRatings(newRating);
                          }
                        }}
                        sx={{
                          "& .MuiSvgIcon-root": {
                            pointerEvents: "auto",
                            width: "1.7vmax",
                            "@media(max-width: 600px)": { width: "3.3vmax" },
                          },
                        }}
                        precision={0.5}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*  */}
          <div>
            <h1>Products</h1>
            <div>
              <div className="productCardContainer productCardContainerBorder">
                {loading ? (
                  <Loader />
                ) : (
                  <Fragment>
                    {products && loading===false && products.length > 0 ? (
                      products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))
                    ) : (
                      <h2 className="productCardContainerHeading">
                        Products Not Found
                      </h2>
                    )}
                  </Fragment>
                )}
              </div>
              {/*  */}
              {resultPerPage < filteredProductCount && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productCount}
                    onChange={setCurrentPageNo}
                    nextPageText=">"
                    prevPageText="<"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Product;
