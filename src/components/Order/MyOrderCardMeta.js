import {
  Box,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const MyOrderCardMeta = (props) => {
  const { image, orderStatus, _id } = props;

  const color =
    orderStatus === "Processing"
      ? "red"
      : "green" && orderStatus === "Shipped"
      ? "orange"
      : "green" && orderStatus === "Cancelled"
      ? "red"
      : "green";

  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        onClick={() => navigate(`/order/${_id}`)}
        cursor={"pointer"}
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image}
        alt={_id}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text
            onClick={() => navigate(`/order/${_id}`)}
            fontWeight="medium"
            cursor={"pointer"}
          >
            {_id}
          </Text>
          <Text
            cursor={"default"}
            color={color}
            fontSize="sm"
          >
            {orderStatus}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
