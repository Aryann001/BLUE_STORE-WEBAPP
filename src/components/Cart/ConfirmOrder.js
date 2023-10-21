import React, { Fragment, useEffect } from "react";
import Stepper from "./Stepper";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmOrderCartItem } from "./ConfirmOrderCartItem";
import { ConfirmOrderBill } from "./ConfirmOrderBill";
import { ConfirmOrderUserInfo } from "./ConfirmOrderUserInfo";
import { clearErrors, getRazorpayApiKey } from "../../actions/paymentAction";
import toast from "react-hot-toast";

const ConfirmOrder = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.payment);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      dispatch(getRazorpayApiKey());
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <Fragment>
      <Header />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "1.5vmax",
        }}
      >
        <div style={{ width: "90%" }}>
          <Stepper step={1} />
        </div>
      </div>

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
              {`Order Items (${cartItems.length})`}
            </Heading>

            <Stack spacing="6">
              {cartItems.map((item) => (
                <ConfirmOrderCartItem key={item.product} {...item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <ConfirmOrderUserInfo />
            <ConfirmOrderBill />
          </Flex>
        </Stack>
      </Box>

      <Footer />
    </Fragment>
  );
};

export default ConfirmOrder;
