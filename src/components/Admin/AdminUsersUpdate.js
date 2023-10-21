import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  Select,
} from "@chakra-ui/react";
import bg from "../../assets/loginBg.jpg";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearErrors,
  singleUserDetail,
  updateUser,
} from "../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

export default function AdminUsersUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateUserId } = useParams();

  const { user, loading, error } = useSelector(
    (state) => state.singleUserDetail
  );
  const {
    isUpdated,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.adminUser);

  const [role, setRole] = useState(``);

  const cancelSubmitHandler = (e) => {
    e.preventDefault();

    navigate(`/admin/dashboard/users`);
    toast(`No Change Has Been Made`, { icon: "😉" });
  };

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    const updateForm = new FormData();

    updateForm.set("role", role);

    dispatch(updateUser(updateUserId, updateForm));
  };

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
      navigate(`/admin/dashboard/users`);
      toast.success(`User Role Updated Successfully`);
      dispatch({ type: "UPDATE_ADMIN_USER_RESET" });
    }

    dispatch(singleUserDetail(updateUserId));
  }, [dispatch, error, updateUserId, updateError, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            backgroundImage={bg}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            zIndex={-5}
          >
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={"white"}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile
              </Heading>
              <FormControl id="userName">
                <FormLabel>Profile Pic</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" src={user.avatar && user.avatar.url} />
                  </Center>
                </Stack>
              </FormControl>
              <FormControl id="userName">
                <FormLabel>Name</FormLabel>
                <Input
                  value={user.name}
                  placeholder="Name"
                  name="name"
                  readOnly
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  value={user.email}
                  placeholder="Email"
                  name="email"
                  readOnly
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                />
              </FormControl>
              <FormControl id="currentRole">
                <FormLabel>Current Role</FormLabel>
                <Input
                  value={user.role}
                  placeholder="Current Role"
                  name="currentRole"
                  readOnly
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder={"Select Role"}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  color={"gray.800"}
                  bg={"gray.100"}
                  border={0}
                  marginRight={"0.2vmax"}
                  _focus={{
                    bg: "gray.200",
                    outline: "none",
                  }}
                >
                  {user.role === `admin` && (
                    <option value={`user`}>User</option>
                  )}
                  {user.role === `user` && (
                    <option value={`admin`}>Admin</option>
                  )}
                </Select>
              </FormControl>

              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  isDisabled={updateLoading ? true : false}
                  type="submit"
                  onClick={cancelSubmitHandler}
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  isDisabled={updateLoading ? true : false}
                  type="submit"
                  onClick={updateSubmitHandler}
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Update
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Fragment>
      )}
    </Fragment>
  );
}
