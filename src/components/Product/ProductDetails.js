import { Fragment, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import ImageSlider from "./ImageSlider";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  productDetail,
  clearErrors,
  newReview,
  filteredProduct,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import { Rating } from "@material-ui/lab";
import { addToCart } from "../../actions/cartAction";
import "./Product.css";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import ProductCard from "../Home/ProductCard";

export default function Simple() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const { products } = useSelector((state) => state.filteredProducts);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [seeAll, setSeeAll] = useState(false);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    setQuantity(quantity - 1);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart(productId, quantity));
    toast.success(`Product Added To Your Cart`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();

    const submitReviewForm = new FormData();

    submitReviewForm.set(`rating`, rating);
    submitReviewForm.set(`comment`, comment);
    submitReviewForm.set(`productID`, productId);

    dispatch(newReview(submitReviewForm));

    onClose();
  };

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success(`Review Added SuccessFully`);
      dispatch({ type: "NEW_REVIEW_RESET" });
    }

    if (product.category !== "") {
      dispatch(filteredProduct("", [0, 20000], 0, 1, product.category));
    }

    dispatch(productDetail(productId));
  }, [dispatch, error, productId, reviewError, success, product.category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />

          <Container maxW={"7xl"}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <Flex>
                <ImageSlider images={product.images} />
              </Flex>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  >
                    {product.name}
                  </Heading>
                  <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
                    {`₹${product.price} INR`}
                  </Text>

                  <div className="ratingDiv">
                    <Rating {...options} />
                    <span className="productCardSpan">
                      ({product.numOfReviews} Reviews)
                    </span>
                  </div>

                  <Text
                    color={product.stock < 1 ? `red` : "green"}
                    fontWeight={300}
                    fontSize={"2xl"}
                  >
                    {product.stock < 1 ? `Out Of Stock` : "InStock"}
                  </Text>
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={<StackDivider borderColor={"gray.200"} />}
                >
                  <VStack spacing={{ base: 4, sm: 6 }}>
                    <Text
                      color={"gray.500"}
                      fontSize={"2xl"}
                      fontWeight={"300"}
                    >
                      Description
                    </Text>
                    <Text fontSize={"lg"}>{product.description}</Text>
                  </VStack>
                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={"yellow.500"}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Product Details
                    </Text>

                    <List spacing={2}>
                      {product.productDetails &&
                        product.productDetails.map((detail) => (
                          <ListItem>
                            <Text as={"span"} fontWeight={"bold"}>
                              {`${detail.heading}:`}
                            </Text>{" "}
                            {detail.detail}
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                </Stack>

                <div className="indeBox">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>

                <Button
                  onClick={addToCartHandler}
                  isDisabled={product.stock < 1 ? true : false}
                  rounded={"none"}
                  w={"full"}
                  mt={8}
                  size={"lg"}
                  py={"7"}
                  bg={"#1f97d4"}
                  color={"white"}
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                  }}
                >
                  Add to cart
                </Button>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <MdLocalShipping />
                  <Text>2-3 business days delivery</Text>
                </Stack>
              </Stack>
            </SimpleGrid>

            <div className="customerReviews">
              <div>
                <div className="crSection1">
                  <div className="crSection-1-1">
                    <h1>Customer reviews</h1>
                  </div>
                  {/*  */}
                  <div className="crSection-1-2">
                    <div>
                      <h1>{product.ratings && product.ratings.toFixed(1)}</h1>
                    </div>
                    {/*  */}
                    <div>
                      <Rating {...options} />
                      <div>{`Based on ${product.numOfReviews} reviews`}</div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="crSection-1-3">
                    <div>
                      <Button
                        height={"full"}
                        width="full"
                        value={seeAll}
                        onClick={() => setSeeAll(!seeAll)}
                      >
                        See all reviews
                      </Button>
                    </div>
                    {/*  */}
                    <div>
                      <Button
                        onClick={onOpen}
                        colorScheme="blue"
                        bg={"#1f97d4"}
                        color="white"
                        _hover={{
                          bg: "blue.500",
                        }}
                        height={"full"}
                        width="full"
                        type="submit"
                      >
                        Write a review
                      </Button>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div
                  className="crSection2"
                  style={seeAll ? { overflow: "auto" } : { overflow: "hidden" }}
                >
                  <div style={seeAll ? { overflow: "auto" } : { overflow: "hidden" }} >
                    {product.reviews && product.reviews.length >= 1 ? (
                      product.reviews.map((review) => (
                        <div key={review._id} className="reviewContainer">
                          <ReviewCard review={review} />
                        </div>
                      ))
                    ) : (
                      <h2 className="noReviews">No Reviews Yet</h2>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {products && (
              <div className="suggestion">
                <Heading>For You</Heading>

                <div className="productCardContainer forYou">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
              </div>
            )}
          </Container>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Add Review
                </AlertDialogHeader>

                <AlertDialogBody display={"flex"} flexDirection={"column"}>
                  <Rating
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    backgroundColor="#1f97d4"
                    color={"white"}
                    onClick={submitReviewHandler}
                    ml={3}
                  >
                    Submit
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
}
