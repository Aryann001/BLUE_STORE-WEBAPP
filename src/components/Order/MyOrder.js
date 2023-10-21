import React, { Fragment, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { Box, Heading, Link, Stack } from "@chakra-ui/react";
import MyOrderCard from "./MyOrderCard";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../Layout/Loader/Loader";
import { TbMoodEmpty as EmptyOrder } from "react-icons/tb";

const MyOrder = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

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
                {`My Orders`}
              </Heading>

              {orders ? (
                <Stack spacing="6">
                  {orders &&
                    orders.map((item) => (
                      <MyOrderCard key={item._id} {...item} />
                    ))}
                </Stack>
              ) : (
                <div className="emptyCart">
                  <EmptyOrder />

                  <h2>No Order Placed Yet!</h2>
                  <Link href="/products" _hover={{ border: "none" }}>
                    View Products
                  </Link>
                </div>
              )}
            </Stack>
          </Stack>
        </Box>
      )}

      <Footer />
    </Fragment>
  );
};

export default MyOrder;
