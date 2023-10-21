import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MyOrderCardMeta } from "./MyOrderCardMeta";
import { PriceTag } from "../Cart/PriceTag";
import { useNavigate } from "react-router-dom";

const MyOrderCard = (props) => {
  const navigate = useNavigate();

  const { _id, orderStatus, orderItems, totalPrice } = props;

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
      onClick={() => navigate(`/order/${_id}`)}
      cursor={"pointer"}
    >
      <MyOrderCardMeta
        _id={_id}
        orderStatus={orderStatus}
        image={orderItems[0].image}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <div className="indeBox">
          <Text
            fontSize={window.innerWidth <= Number(600) ? "2vmax" : "1.5vmax"}
          >
            {`${orderItems.length} ${
              orderItems.length === 1 ? `Item` : `Items`
            }`}
          </Text>
        </div>
        <PriceTag price={totalPrice} currency={"INR"} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <div className="indeBox">
          <Text
            fontSize={window.innerWidth <= Number(600) ? "2vmax" : "1.5vmax"}
          >
            {`${orderItems.length} ${
              orderItems.length === 1 ? `Item` : `Items`
            }`}
          </Text>
        </div>
        <PriceTag price={totalPrice} currency={"INR"} />
      </Flex>
    </Flex>
  );
};

export default MyOrderCard;
