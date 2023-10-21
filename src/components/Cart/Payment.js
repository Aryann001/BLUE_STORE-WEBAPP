import React, { Fragment } from "react";
import Stepper from "./Stepper";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { PaymentBill } from "./PaymentBill";

const Payment = ({ ApiKey }) => {
  return (
    <Fragment>
      <Header />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F7FAFC",
          paddingTop: "1.5vmax",
        }}
      >
        <div style={{ width: "90%" }}>
          <Stepper step={2} />
        </div>
      </div>

      <Flex
        minH={"50vh"}
        align={"center"}
        justify={"center"}
        py={12}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"2xl"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Payment
          </Heading>

          <Flex direction="column" align="center" flex="1">
            <PaymentBill ApiKey={ApiKey} />
          </Flex>
        </Stack>
      </Flex>

      <Footer />
    </Fragment>
  );
};

export default Payment;
