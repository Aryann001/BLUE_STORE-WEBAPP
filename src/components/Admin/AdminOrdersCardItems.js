import { Button, CloseButton, Flex, Link, Text } from "@chakra-ui/react";
import { PriceTag } from "../Cart/PriceTag";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AiTwotoneEdit as EditIcon } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import { AdminOrdersCardMeta } from "./AdminOrdersCardMeta";
import { allOrders, clearErrors, deleteOrder } from "../../actions/orderAction";

export const AdminOrdersCardItem = (props) => {
  const { _id, orderItems, totalPrice, orderStatus } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isDeleted } = useSelector(
    (state) => state.adminOrders
  );

  const removeItemHandler = (e) => {
    e.preventDefault();

    dispatch(deleteOrder(_id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(`Order Deleted Successfully`);
      dispatch(allOrders());
      dispatch({ type: "DELETE_ORDER_RESET" });
    }
  }, [dispatch, error, isDeleted, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
          justify="space-between"
          align="center"
        >
          <AdminOrdersCardMeta
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
            <Text
              fontSize={window.innerWidth <= Number(600) ? "2vmax" : "1.5vmax"}
            >
              {`${orderItems.length} ${
                orderItems.length === 1 ? `Item` : `Items`
              }`}
            </Text>
            <PriceTag price={totalPrice} currency={"INR"} />
            <CloseButton
              isDisabled={loading ? true : false}
              onClick={removeItemHandler}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/dashboard/order/update/${_id}`);
              }}
            >
              <EditIcon />
            </Button>
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
            <Link
              fontSize="sm"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/dashboard/order/update/${_id}`);
              }}
            >
              Edit
            </Link>
            <Text
              fontSize={window.innerWidth <= Number(600) ? "2vmax" : "1.5vmax"}
            >
              {`${orderItems.length} ${
                orderItems.length === 1 ? `Item` : `Items`
              }`}
            </Text>
            <PriceTag price={totalPrice} currency={"INR"} />
          </Flex>
        </Flex>
      )}
    </Fragment>
  );
};
