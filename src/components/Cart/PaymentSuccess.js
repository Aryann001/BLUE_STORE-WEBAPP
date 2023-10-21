import { Box, Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import React, { Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiCheckCircle as Success } from "react-icons/fi";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createOrder } from "../../actions/orderAction";
import toast from "react-hot-toast";
import { clearCart } from "../../actions/cartAction";
import useRunOnce from "./useRunOnce";

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const orderInfo = JSON.parse(sessionStorage.getItem(`orderInfo`));

  const searchQuery = useSearchParams()[0];
  const referance = searchQuery.get("referance");

  const orderData = {
    shippingInfo,
    orderItems: cartItems,
    paymentInfo: {
      id: referance,
      status: "succeeded",
    },
    itemsPrice: orderInfo.subtotal,
    taxPrice: 0,
    shippingPrice: orderInfo.shippingTax,
    totalPrice: orderInfo.total,
  };

  useRunOnce({
    fn: () => {
      dispatch(createOrder(orderData));
    },
    sessionKey: "PaymentSuccess",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }

    if (referance) {
      localStorage.removeItem(`cartItems`);
      dispatch(clearCart());
    }
  }, [dispatch, error, referance]);

  return (
    <Fragment>
      <Header />

      <Box>
        <VStack h={"100vh"} justifyContent={"center"}>
          <Center color={"green"} fontSize={"5vmax"}>
            <Success />
          </Center>
          <Heading textTransform={"uppercase"}>Order Successfull</Heading>
          <Text>{`Referance No. ${referance}`}</Text>
          <Link
            className="viewOrders"
            href="/orders"
            _hover={{ border: "none" }}
          >
            View Orders
          </Link>
        </VStack>
      </Box>

      <Footer />
    </Fragment>
  );
};

export default PaymentSuccess;
