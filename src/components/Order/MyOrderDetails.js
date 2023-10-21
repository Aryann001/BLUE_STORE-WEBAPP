import React, { Fragment, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrderDetails } from "../../actions/orderAction";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import MyOrderDetailsCard from "./MyOrderDetailsCard";
import { MyOrderDetailsUserInfo } from "./MyOrderDetailsUserInfo";
import { MyOrderDetailsBill } from "./MyOrderDetailsBill";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

const MyOrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const { order, loading, error } = useSelector(
    (state) => state.myOrderDetails
  );
  let address;
  let phoneNo;
  let color;

  if (loading === false) {
    address = `${order.shippingInfo.address} ${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.country} ${order.shippingInfo.pincode}`;

    phoneNo = order.shippingInfo.phoneNo;

    color =
      order.orderStatus === "Processing"
        ? "red"
        : "green" && order.orderStatus === "Shipped"
        ? "orange"
        : "green" && order.orderStatus === "Cancelled"
        ? "red"
        : "green";
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrderDetails(orderId));
  }, [dispatch, error, orderId]);

  return (
    <Fragment>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <Box
          maxW={{
            base: "3xl",
            lg: "7xl",
          }}
          mx="auto"
          px={{
            base: "4",
            md: "8",
            lg: "12",
          }}
          py={{
            base: "6",
            md: "8",
            lg: "12",
          }}
        >
          <Stack
            direction={{
              base: "column",
              lg: "row",
            }}
            align={{
              lg: "flex-start",
            }}
            spacing={{
              base: "8",
              md: "16",
            }}
          >
            <Stack
              spacing={{
                base: "8",
                md: "10",
              }}
              flex="2"
            >
              <Heading fontSize="2xl" fontWeight="extrabold">
                {`Order id#${order._id}`}
              </Heading>
              <Heading size="md" color={color} >
                {order.orderStatus}
              </Heading>

              <Stack spacing="6">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <MyOrderDetailsCard key={item._id} {...item} />
                  ))}
              </Stack>
            </Stack>

            <Flex direction="column" align="center" flex="1">
              <MyOrderDetailsUserInfo phoneNo={phoneNo} address={address} />
              <MyOrderDetailsBill
                subTotal={order.itemsPrice}
                shippingTax={order.shippingPrice}
                total={order.totalPrice}
              />
            </Flex>
          </Stack>
        </Box>
      )}

      <Footer />
    </Fragment>
  );
};

export default MyOrderDetails;
