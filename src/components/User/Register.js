import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Icon,
  Flex,
  Image,
} from "@chakra-ui/react";
import loginBg from "../../assets/loginBg.jpg";
import "./Register.css";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearErrors, registerUser } from "../../actions/userAction";
import Loader from "../Layout/Loader/Loader";
import { AiOutlineEye as OpenEye } from "react-icons/ai";
import { AiOutlineEyeInvisible as CloseEye } from "react-icons/ai";

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#1f97d4" />
      <circle cx="244" cy="106" r="139" fill="#1f97d4" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#1f97d4" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#1f97d4" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#1f97d4" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#1f97d4" />
    </Icon>
  );
};

export default function JoinOurTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [type, setType] = useState("password");
  const [eye, setEye] = useState(false);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const visible = () => {
    setEye(!eye);

    if (eye === true) {
      setType("text");
    } else {
      setType("password");
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.set("name", name);
    form.set("email", email);
    form.set("password", password);

    if (avatar !== undefined) {
      form.set("avatar", avatar);
    }

    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(`/profile`);
      toast.success(`Account Has Been Created Successfully`);
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Box position={"relative"}>
          <Container
            as={SimpleGrid}
            maxW={"7xl"}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 10, lg: 32 }}
            py={{ base: 10, sm: 20, lg: 32 }}
          >
            <Flex flex={1}>
              <Image alt={"SignUp Image"} objectFit={"cover"} src={loginBg} />
            </Flex>
            <Stack
              bg={"gray.50"}
              rounded={"xl"}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: "lg" }}
            >
              <Stack spacing={4}>
                <Heading
                  color={"gray.800"}
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  WELCOME TO BLUE STORE
                  <Text as={"span"} bgColor={"#1f97d4"} bgClip="text">
                    !
                  </Text>
                </Heading>
              </Stack>
              <Box
                as={"form"}
                onSubmit={submitHandler}
                encType="multipart/form-data"
                mt={10}
              >
                <Stack spacing={4}>
                  <Input
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={registerDataChange}
                    placeholder="Name"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                  <Input
                    name="email"
                    type="text"
                    required
                    value={email}
                    onChange={registerDataChange}
                    placeholder="Email"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                  <div className="passwordBox">
                    <Input
                      name="password"
                      type={type}
                      required
                      value={password}
                      onChange={registerDataChange}
                      placeholder="Password"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                    <span onClick={visible}>
                      {type === "text" ? <OpenEye /> : <CloseEye />}
                    </span>
                  </div>
                  <Button
                    className="inputFileBtn"
                    fontFamily={"heading"}
                    bg={"gray.200"}
                    color={"gray.800"}
                  >
                    <label htmlFor="inputFile" className="inputFile">
                      Choose Profile Image
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      onChange={registerDataChange}
                      id="inputFile"
                      visibility={"hidden"}
                    />
                  </Button>
                  <Text>{`NOTE : Profile Image Should be Smaller than 1MB (Sorry I don't have cloudinary premium for Larger files)`}</Text>
                  {avatarPreview && (
                    <div className="preview">
                      <Flex flex={1}>
                        {avatarPreview && (
                          <Image
                            alt={"SignUp Image"}
                            objectFit={"cover"}
                            src={avatarPreview}
                          />
                        )}
                      </Flex>
                    </div>
                  )}
                </Stack>
                <Button
                  type="submit"
                  isDisabled={loading ? true : false}
                  fontFamily={"heading"}
                  mt={8}
                  w={"full"}
                  bgColor="#1f97d4"
                  color={"white"}
                  transition={"all 0.5s"}
                  _hover={{
                    backgroundColor: "#145e83",
                    boxShadow: "xl",
                  }}
                >
                  Sign Up
                </Button>
              </Box>
              form
            </Stack>
          </Container>
          <Blur
            position={"absolute"}
            top={-10}
            left={-10}
            style={{ filter: "blur(70px)" }}
          />
        </Box>
      )}
    </Fragment>
  );
}
