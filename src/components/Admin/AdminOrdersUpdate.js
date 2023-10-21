import React, { Fragment, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrderDetails } from "../../actions/orderAction";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import { AdminOrdersUpdateCardInfo } from "./AdminOrdersUpdateCardInfo";
import { AdminOrdersUpdateBill } from "./AdminOrdersUpdateBill";
import AdminOrdersUpdateCard from "./AdminOrdersUpdateCard";

const AdminOrdersUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminOrderId } = useParams();

  const { order, loading, error } = useSelector(
    (state) => state.myOrderDetails
  );
  const {
    isUpdated,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.adminOrders);
  let address;
  let phoneNo;
  let color;

  if (loading === false) {
    address = `${order.shippingInfo.address} ${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.country} ${order.shippingInfo.pincode}`;

    phoneNo = order.shippingInfo.phoneNo;

    color =
      order.orderStatus === "Processing"
        ? "red"
        : "green" && order.orderStatus === "Shipped"
        ? "orange"
        : "green" && order.orderStatus === "Cancelled"
        ? "red"
        : "green";
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success(`Order Status Updated Successfully`);
      dispatch({ type: "UPDATE_ORDER_RESET" });
      navigate(`/admin/dashboard/orders`);
    }

    dispatch(myOrderDetails(adminOrderId));
  }, [dispatch, error, adminOrderId, updateError, isUpdated, navigate]);

  return (
    <Fragment>
      <Header />

      {loading ? (
        <Loader />
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
                {`Order id#${order._id}`}
              </Heading>
              <Heading size="md" color={color}>
                {order.orderStatus}
              </Heading>

              <Stack spacing="6">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <AdminOrdersUpdateCard key={item._id} {...item} />
                  ))}
              </Stack>
            </Stack>

            <Flex direction="column" align="center" flex="1">
              <AdminOrdersUpdateCardInfo user={order.user} phoneNo={phoneNo} address={address} />
              <AdminOrdersUpdateBill
                subTotal={order.itemsPrice}
                shippingTax={order.shippingPrice}
                total={order.totalPrice}
                orderStatus={order.orderStatus}
                loading={updateLoading}
                adminOrderId={adminOrderId}
              />
            </Flex>
          </Stack>
        </Box>
      )}

      <Footer />
    </Fragment>
  );
};

export default AdminOrdersUpdate;
