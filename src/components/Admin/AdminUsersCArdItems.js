import { Button, CloseButton, Flex, Link, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AiTwotoneEdit as EditIcon } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import { AdminUsersCardMeta } from "./AdminUsersCardMeta";
import { allUsers, clearErrors, deleteUser } from "../../actions/userAction";

export const AdminUsersCardItems = (props) => {
  const { _id, avatar, name, email, role } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isDeleted } = useSelector((state) => state.adminUser);

  const removeItemHandler = (e) => {
    e.preventDefault();

    dispatch(deleteUser(_id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted === true) {
      dispatch(allUsers());
      toast.success(`User Deleted Successfully`);
      dispatch({ type: "DELETE_ADMIN_USER_RESET" });
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
          <AdminUsersCardMeta
            _id={_id}
            name={name}
            email={email}
            image={avatar.url}
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
            <Text
              color={
                role === "admin" ? "var(--chakra-colors-yellow-500)" : "#1f97d4"
              }
            >
              {role}
            </Text>
            <CloseButton
              isDisabled={loading ? true : false}
              onClick={removeItemHandler}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/dashboard/user/update/${_id}`);
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
                navigate(`/admin/dashboard/user/update/${_id}`);
              }}
            >
              Edit
            </Link>
            <Text></Text>
            <Text
              color={
                role === "admin" ? "var(--chakra-colors-yellow-500)" : "#1f97d4"
              }
            >
              {role}
            </Text>
          </Flex>
        </Flex>
      )}
    </Fragment>
  );
};
