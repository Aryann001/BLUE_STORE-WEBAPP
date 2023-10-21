import React, { Fragment, useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  Input,
  Image,
} from "@chakra-ui/react";
import { FiTrendingUp } from "react-icons/fi";
import { BiSolidRightArrow as FiMenu } from "react-icons/bi";
import { GiKnightBanner as BannerIcon } from "react-icons/gi";
import { FaLuggageCart as ProductIcon } from "react-icons/fa";
import { MdBorderStyle as OrdersIcon } from "react-icons/md";
import { HiMiniUsers as UsersIcon } from "react-icons/hi2";
import { VscPreview as ReviewsIcon } from "react-icons/vsc";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createBanner } from "../../actions/bannerAction";
import toast from "react-hot-toast";

const LinkItems = [
  { name: "Status", icon: FiTrendingUp, href: "/admin/dashboard" },
  { name: "Banner", icon: BannerIcon, href: "/admin/dashboard/banner" },
  { name: "Product", icon: ProductIcon, href: "/admin/dashboard/product" },
  { name: "Orders", icon: OrdersIcon, href: "/admin/dashboard/orders" },
  { name: "Users", icon: UsersIcon, href: "/admin/dashboard/users" },
  { name: "Reviews", icon: ReviewsIcon, href: "/admin/dashboard/reviews" },
];

export default function BannerCreate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newBanner);

  const [banner, setBanner] = useState([]);
  const [bannerPreview, setBannerPreview] = useState([]);

  const imageDataChange = (e) => {
    const files = Array.from(e.target.files);

    setBanner([]);
    setBannerPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setBannerPreview((old) => [...old, reader.result]);
          setBanner((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const bannerSubmitHandler = (e) => {
    e.preventDefault();

    const bannerData = new FormData();

    banner.forEach((image) => {
      bannerData.append(`images`, image);
    });

    dispatch(createBanner(bannerData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate(`/admin/dashboard/banner`);
      toast.success(`Banner Created Successfully`);
      dispatch({ type: "CREATE_BANNER_RESET" });
    }
  }, [dispatch, navigate, error, success]);

  return (
    <Fragment>
      <Header />

      <Box
        minH="100vh"
        display={"flex"}
        flexDirection={window.innerWidth <= Number(767) ? "column" : "row"}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/* Content */}
        </Box>

        <div className="banner">
          <div
            className="contactContainer bannerContainer"
            style={window.innerWidth <= Number(600) ? { height: "70vh" } : null}
          >
            <h1>Create Banner</h1>
            <form
              encType="multipart/form-data"
              className="contactForm"
              onSubmit={bannerSubmitHandler}
            >
              <div className="inputFileBtn">
                <label
                  htmlFor="inputFile"
                  className="inputFile"
                  style={
                    window.innerWidth <= Number(600) ? { fontSize: "2.2vmax" } : null
                  }
                >
                  Choose Banner Images
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  name="banner"
                  onChange={imageDataChange}
                  id="inputFile"
                  visibility={"hidden"}
                />
              </div>

              <Button
                isDisabled={loading ? true : false}
                colorScheme="blue"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
                width="full"
                id="createProductBtn"
                type="submit"
                padding={window.innerWidth <= Number(600) ? "2vmax 0" : null}
              >
                Create
              </Button>
            </form>
            <div className="preview">
              <Flex
                height={"60%"}
                width={"90%"}
                display={"flex"}
                overflow={"auto"}
              >
                {bannerPreview &&
                  bannerPreview.map((image, index) => (
                    <Image
                      key={index}
                      alt={"Banner Preview Image"}
                      objectFit={"cover"}
                      src={image}
                    />
                  ))}
              </Flex>
            </div>
          </div>
        </div>
      </Box>

      <Footer />
    </Fragment>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="absolute"
      h={"full"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Dashboard
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#1f97d4",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Dashboard
      </Text>
    </Flex>
  );
};
