import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import bg from "../../assets/loginBg.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye as OpenEye } from "react-icons/ai";
import { AiOutlineEyeInvisible as CloseEye } from "react-icons/ai";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newType, setNewType] = useState("password");
  const [newEye, setNewEye] = useState(false);
  const [confirmType, setConfirmType] = useState("password");
  const [confirmEye, setConfirmEye] = useState(false);

  const { success, loading, error } = useSelector(
    (state) => state.forgotPassword
  );

  const newVisible = () => {
    setNewEye(!newEye);

    if (newEye === true) {
      setNewType("text");
    } else {
      setNewType("password");
    }
  };

  const confirmVisible = () => {
    setConfirmEye(!confirmEye);

    if (confirmEye === true) {
      setConfirmType("text");
    } else {
      setConfirmType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(resetToken, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate(`/home`);
      toast.success(`Password Reset Successfully`);
    }
  }, [dispatch, error, success, navigate]);

  return (
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
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Reset Password
        </Heading>

        <FormControl id="email">
          <div className="passwordBox">
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              _placeholder={{ color: "gray.500" }}
              type={newType}
              margin={"0.5vmax 0"}
            />
            <span onClick={newVisible}>
              {newType === "text" ? <OpenEye /> : <CloseEye />}
            </span>
          </div>
          <div className="passwordBox">
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              _placeholder={{ color: "gray.500" }}
              type={confirmType}
              margin={"0.5vmax 0"}
            />
            <span onClick={confirmVisible}>
              {confirmType === "text" ? <OpenEye /> : <CloseEye />}
            </span>
          </div>
        </FormControl>
        <Stack spacing={6}>
          <Button
            isDisabled={loading ? true : false}
            type="submit"
            onClick={submitHandler}
            bg={"#1f97d4"}
            color={"white"}
            transition={"all 0.5s"}
            _hover={{
              backgroundColor: "#145e83",
              boxShadow: "xl",
            }}
          >
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
