import { Flex, Link } from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";

export const ConfirmOrderCartItem = (props) => {
  const { product, name, description, quantity, image, price } = props;

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        product={product}
        name={name}
        description={description}
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
          <input readOnly type="number" value={quantity} />
        </div>
        <PriceTag price={price * quantity} currency={"INR"} />
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
        <Link fontSize="sm"></Link>
        <div className="indeBox">
          <input readOnly type="number" value={quantity} />
        </div>
        <PriceTag price={price * quantity} currency={"INR"} />
      </Flex>
    </Flex>
  );
};
