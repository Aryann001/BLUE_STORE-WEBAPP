import { CloseButton, Flex, Link, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Fragment, useEffect } from "react";
import { AdminReviewsViewCardMeta } from "./AdminReviewsViewCardMeta";
import {
  allReviews,
  clearErrors,
  deleteReviews,
  singleUserDetail,
} from "../../actions/userAction";

export const AdminReviewsViewCardItem = (props) => {
  const { _id, name, user, rating, comment, search } = props;

  const dispatch = useDispatch();

  const { loading, error, isDeleted } = useSelector(
    (state) => state.deleteReviews
  );
  const { user: userforImg } = useSelector((state) => state.singleUserDetail);

  const removeItemHandler = (e) => {
    e.preventDefault();

    dispatch(deleteReviews(search, _id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(`Review Deleted Successfully`);
      dispatch(allReviews(search));
      dispatch({ type: "DELETE_REVIEWS_RESET" });
    }

    dispatch(singleUserDetail(user));
  }, [dispatch, error, isDeleted, user, search]);

  return (
    <Fragment>
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        justify="space-between"
        align="center"
      >
        <AdminReviewsViewCardMeta
          _id={_id}
          name={name}
          comment={comment}
          rating={rating}
          image={userforImg.avatar && userforImg.avatar.url}
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
          <Text></Text>
          <CloseButton
            isDisabled={loading ? true : false}
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
          <Text></Text>
          <Link fontSize="sm" onClick={removeItemHandler}>
            Delete
          </Link>
        </Flex>
      </Flex>
    </Fragment>
  );
};
