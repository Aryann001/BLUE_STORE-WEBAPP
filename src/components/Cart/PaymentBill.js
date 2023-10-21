import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { formatPrice } from "./PriceTag";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../index";
import logo from "../../assets/logo.png";

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const PaymentBill = ({ ApiKey: key }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingTax = subtotal < 100000 ? 50 : 0;

  const total = subtotal + shippingTax;

  const checkoutHandler = async (e) => {
    e.preventDefault();

    const amount = total;

    const config = {
      withCredentials: true,
    };

    const {
      data: { order },
    } = await axios.post(`${server}/checkout`, { amount }, config);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Blue Store",
      image: logo,
      order_id: order.id,
      callback_url: `${server}/paymentverification`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNo,
      },
      notes: {
        address: "Blue Store Corporate Office",
      },
      theme: {
        color: "#1f97d4",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();

    sessionStorage.removeItem("PaymentSuccess");
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Bill</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(subtotal)} />

        <OrderSummaryItem
          label="Shipping + Tax"
          value={formatPrice(shippingTax)}
        />

        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total)}
          </Text>
        </Flex>
      </Stack>
      <Button
        onClick={checkoutHandler}
        colorScheme="blue"
        size="lg"
        fontSize="md"
      >
        Pay {formatPrice(total)}
      </Button>
    </Stack>
  );
};
