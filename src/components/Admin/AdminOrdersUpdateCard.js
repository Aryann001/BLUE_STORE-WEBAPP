import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { PriceTag } from "../Cart/PriceTag";
import { AdminOrdersUpdateCardMeta } from "./AdminOrdersUpdateCardMeta";

const AdminOrdersUpdateCard = (props) => {
    const { _id, name, quantity, image, price } = props;

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <AdminOrdersUpdateCardMeta
        _id={_id}
        name={name}
        image={image}
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
            {quantity}
          </Text>
        </div>
        <PriceTag price={price} currency={"INR"} />
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
            fontSize={window.innerWidth <= Number(600) ? "1.5vmax" : "1vmax"}
          >
            {quantity}
          </Text>
        </div>
        <PriceTag price={price} currency={"INR"} />
      </Flex>
    </Flex>
  );
};

export default AdminOrdersUpdateCard;
