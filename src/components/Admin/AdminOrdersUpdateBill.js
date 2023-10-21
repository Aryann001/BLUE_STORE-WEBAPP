import {
  Button,
  Flex,
  Heading,
  Select,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { formatPrice } from "../Cart/PriceTag";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../actions/orderAction";

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

export const AdminOrdersUpdateBill = (props) => {
  const { subTotal, shippingTax, total, orderStatus, loading, adminOrderId } =
    props;

  const dispatch = useDispatch();
  const [status, setStatus] = useState(``);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    const statusForm = new FormData();

    statusForm.set(`status`, status);

    dispatch(updateOrder(adminOrderId, statusForm));
  };

  useEffect(() => {
    if (orderStatus !== ``) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Bill</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(subTotal)} />

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

        <Stack spacing={"4"}>
          <form onSubmit={updateSubmitHandler}>
            <div>
              <Select
                placeholder={'Status'}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                color={mode("gray.800", "gray.200")}
                bg={mode("gray.100", "gray.600")}
                border={0}
                marginRight={"0.2vmax"}
                _focus={{
                  bg: mode("gray.200", "gray.800"),
                  outline: "none",
                }}
              >
                {orderStatus === `Order Confirmed` && (
                  <option value={`Shipped`}>Shipped</option>
                )}
                {orderStatus === `Order Confirmed` && (
                  <option value={`Cancelled`}>Cancel</option>
                )}
                {orderStatus === `Shipped` && (
                  <option value={`Out for Delivery`}>Out for Delivery</option>
                )}
                {orderStatus === `Out for Delivery` && (
                  <option value={`Delivered`}>Delivered</option>
                )}
              </Select>
            </div>
            <Button
              isDisabled={loading ? true : false}
              colorScheme="blue"
              bg="blue.400"
              color="white"
              _hover={{
                bg: "blue.500",
              }}
              width="full"
              id="createProductBtn"
              type="submit"
              padding={window.innerWidth <= Number(600) ? "2vmax 0" : "1vmax 0"}
            >
              Update Status
            </Button>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};
