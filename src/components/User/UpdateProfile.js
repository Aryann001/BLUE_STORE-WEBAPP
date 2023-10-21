import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import bg from "../../assets/loginBg.jpg";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

export default function UserProfileEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    isUpdated,
    error,
  } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const cancelSubmitHandler = (e) => {
    e.preventDefault();

    navigate(`/profile`);
    toast(`No Change Has Been Made`, { icon: "😉" });
  };

  const updateDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    const updateForm = new FormData();

    updateForm.set("name", name);
    updateForm.set("email", email);

    if (avatar !== undefined) {
      updateForm.set("avatar", avatar);
    }

    dispatch(updateProfile(updateForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate(`/profile`);
      toast.success(`Profile Updated Successfully`);
      dispatch({ type: "UPDATE_PROFILE_RESET" });
      dispatch(loadUser());
    }
  }, [dispatch, navigate, error, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {isAuthenticated && (
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
                  Profile Edit
                </Heading>
                <FormControl id="userName">
                  <FormLabel>Profile Pic</FormLabel>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar size="xl" src={avatarPreview}>
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button w="full" padding={0} display={"block"}>
                        <label htmlFor="inputFile" className="inputFile">
                          Change Pic
                        </label>
                        <Input
                          onChange={updateDataChange}
                          type="file"
                          accept="image/*"
                          name="avatar"
                          id="inputFile"
                          visibility={"hidden"}
                        />
                      </Button>
                    </Center>
                  </Stack>
                </FormControl>
                <FormControl id="userName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    name="name"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    name="email"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    type="submit"
                    isDisabled={updateLoading ? true : false}
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
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
