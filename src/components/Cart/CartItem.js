import { CloseButton, Flex, Link } from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { useDispatch } from "react-redux";
import { addToCart, removeItem } from "../../actions/cartAction";
import toast from "react-hot-toast";

export const CartItem = (props) => {
  const { product, name, description, quantity, image, price, stock } = props;

  const dispatch = useDispatch();

  const increaseQuantity = (e) => {
    e.preventDefault();

    const newQty = quantity + 1;

    if (stock <= quantity) {
      return;
    }

    dispatch(addToCart(product, newQty));
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();

    const newQty = quantity - 1;

    if (quantity <= 1) {
      return;
    }

    dispatch(addToCart(product, newQty));
  };

  const removeItemHandler = (e) => {
    e.preventDefault();
    dispatch(removeItem(product));
    toast.success(`Item has been Removed From Your Cart Successfully`);
  };

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta product={product} name={name} description={description} image={image} />

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
          <button onClick={decreaseQuantity}>-</button>
          <input readOnly type="number" value={quantity} />
          <button onClick={increaseQuantity}>+</button>
        </div>
        <PriceTag price={price * quantity} currency={"INR"} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={removeItemHandler}
        />
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
        <Link fontSize="sm" onClick={removeItemHandler}>
          Delete
        </Link>
        <div className="indeBox">
          <button>-</button>
          <input readOnly type="number" value={quantity} />
          <button>+</button>
        </div>
        <PriceTag price={price * quantity} currency={"INR"} />
      </Flex>
    </Flex>
  );
};
