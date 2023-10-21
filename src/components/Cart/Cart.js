import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import { Fragment } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useSelector } from "react-redux";
import { MdOutlineRemoveShoppingCart as EmptyCart } from "react-icons/md";
import "./Cart.css";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <Header />

      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <EmptyCart />

          <h2>No Item in Your Cart</h2>
          <Link href="/products" _hover={{ border: "none" }}>
            View Products
          </Link>
        </div>
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
                {`Shopping Cart (${cartItems.length} items)`}
              </Heading>

              <Stack spacing="6">
                {cartItems.map((item) => (
                  <CartItem key={item.product} {...item} />
                ))}
              </Stack>
            </Stack>

            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary />
              <HStack mt="6" fontWeight="semibold">
                <p>or</p>
                <Link href="/products" color={mode("blue.500", "blue.200")}>
                  Continue shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}

      <Footer />
    </Fragment>
  );
};

export default Cart;
