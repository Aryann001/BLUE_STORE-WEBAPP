import React, { Fragment, useState } from "react";
import Stepper from "./Stepper";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../../actions/cartAction";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const submitHandler = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error(`Phone Number should be 10 digits Long`);
      return;
    }

    dispatch(
      saveShippingInfo({ address, country, state, city, pincode, phoneNo })
    );
    navigate("/order/confirm");

    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <Header />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F7FAFC",
          paddingTop: "1.5vmax",
        }}
      >
        <div style={{ width: "90%" }}>
          <Stepper step={0} />
        </div>
      </div>

      <Flex
        minH={"50vh"}
        align={"center"}
        justify={"center"}
        py={12}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"2xl"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Shipping Information
          </Heading>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              color={useColorModeValue("gray.800", "gray.200")}
              bg={useColorModeValue("gray.100", "gray.600")}
              border={0}
              _focus={{
                bg: useColorModeValue("gray.200", "gray.800"),
                outline: "none",
              }}
            />

            <FormLabel marginTop={"0.5vmax"}>Country</FormLabel>
            <Select
              placeholder="Select Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              color={useColorModeValue("gray.800", "gray.200")}
              bg={useColorModeValue("gray.100", "gray.600")}
              border={0}
              _focus={{
                bg: useColorModeValue("gray.200", "gray.800"),
                outline: "none",
              }}
            >
              {Country &&
                Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
            </Select>

            {country && (
              <Fragment>
                <FormLabel marginTop={"0.5vmax"}>State</FormLabel>
                <Select
                  placeholder="Select State"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  color={"gray.800"}
                  bg={"gray.100"}
                  border={0}
                  _focus={{
                    bg: "gray.200",
                    outline: "none",
                  }}
                >
                  {State &&
                    State.getStatesOfCountry(country).map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                </Select>
              </Fragment>
            )}

            {state && (
              <Fragment>
                <FormLabel marginTop={"0.5vmax"}>City</FormLabel>
                <Select
                  placeholder="Select City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  color={"gray.800"}
                  bg={"gray.100"}
                  border={0}
                  _focus={{
                    bg: "gray.200",
                    outline: "none",
                  }}
                >
                  {City &&
                    City.getCitiesOfState(country, state).map((city) => (
                      <option key={city.isoCode} value={city.isoCode}>
                        {city.name}
                      </option>
                    ))}
                </Select>
              </Fragment>
            )}

            <FormLabel marginTop={"0.5vmax"}>Pincode</FormLabel>
            <Input
              type="number"
              placeholder="Pincode"
              required
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              color={useColorModeValue("gray.800", "gray.200")}
              bg={useColorModeValue("gray.100", "gray.600")}
              border={0}
              _focus={{
                bg: useColorModeValue("gray.200", "gray.800"),
                outline: "none",
              }}
            />

            <FormLabel marginTop={"0.5vmax"}>Contact Number</FormLabel>
            <Input
              type="number"
              required
              placeholder="Contact Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              color={useColorModeValue("gray.800", "gray.200")}
              bg={useColorModeValue("gray.100", "gray.600")}
              border={0}
              _focus={{
                bg: useColorModeValue("gray.200", "gray.800"),
                outline: "none",
              }}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              isDisabled={city ? false : true}
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
              Continue
            </Button>
          </Stack>
        </Stack>
      </Flex>

      <Footer />
    </Fragment>
  );
};

export default Shipping;
