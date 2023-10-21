import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const ConfirmOrderUserInfo = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const address = `${shippingInfo.address} ${shippingInfo.city} ${shippingInfo.state} ${shippingInfo.country} ${shippingInfo.pincode}`;

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Billing Address</Heading>

      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Name
          </Text>
          <Text fontSize="l" fontWeight="semibold">
            {user.name}
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Address
          </Text>
          <Text fontSize="l" width={"8vmax"} fontWeight="semibold">
            {address}
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Phone Number
          </Text>
          <Text fontSize="l" fontWeight="semibold">
            {shippingInfo.phoneNo}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};
