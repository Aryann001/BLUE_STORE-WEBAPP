import { Button, CloseButton, Flex, Link } from "@chakra-ui/react";
import { PriceTag } from "../Cart/PriceTag";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AdminProductViewCardMeta } from "./AdminProductViewCardMeta";
import { AiTwotoneEdit as EditIcon } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { clearErrors, deleteProduct, getAdminProduct } from "../../actions/productAction";
import { Fragment, useEffect } from "react";
import Loader from "../Layout/Loader/Loader";

export const AdminProductViewCardItem = (props) => {
  const { _id, name, description, ratings, images, price, stock, category } =
    props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isDeleted, message } = useSelector(
    (state) => state.adminProduct
  );

  const removeItemHandler = (e) => {
    e.preventDefault();

    dispatch(deleteProduct(_id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({ type: "DELETE_ADMIN_PRODUCTS_RESET" });
      toast.success(message);
      dispatch(getAdminProduct());
    }
  }, [dispatch, error, isDeleted, message]);

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
          <AdminProductViewCardMeta
            _id={_id}
            name={name}
            description={description}
            ratings={ratings}
            category={category}
            image={images[0]}
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
              <input readOnly type="number" value={stock} />
            </div>
            <PriceTag price={price} currency={"INR"} />
            <CloseButton
              isDisabled={loading ? true : false}
              aria-label={`Delete ${name} from cart`}
              onClick={removeItemHandler}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/dashboard/product/update/${_id}`);
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
                navigate(`/admin/dashboard/product/update/${_id}`);
              }}
            >
              Edit
            </Link>
            <div className="indeBox">
              <input readOnly type="number" value={stock} />
            </div>
            <PriceTag price={price} currency={"INR"} />
          </Flex>
        </Flex>
      )}
    </Fragment>
  );
};
