import React, { Fragment, useEffect } from "react";
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
import { clearErrors, deleteBanner } from "../../actions/bannerAction";
import toast from "react-hot-toast";

const LinkItems = [
  { name: "Status", icon: FiTrendingUp, href: "/admin/dashboard" },
  { name: "Banner", icon: BannerIcon, href: "/admin/dashboard/banner" },
  { name: "Product", icon: ProductIcon, href: "/admin/dashboard/product" },
  { name: "Orders", icon: OrdersIcon, href: "/admin/dashboard/orders" },
  { name: "Users", icon: UsersIcon, href: "/admin/dashboard/users" },
  { name: "Reviews", icon: ReviewsIcon, href: "/admin/dashboard/reviews" },
];

export default function Banner() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isDeleted, message } = useSelector(
    (state) => state.newBanner
  );

  const deleteBannerHandler = (e) => {
    e.preventDefault();

    dispatch(deleteBanner());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast(message, { icon: "🗑️💀" });
      dispatch({ type: "DELETE_BANNER_RESET" });
    }
  }, [dispatch, error, isDeleted, message]);

  return (
    <Fragment>
      <Header />

      <Box
        minH={window.innerWidth <= Number(600) ? "40vh" : "100vh"}
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
          <div className="contactContainer">
            <h1>Banner</h1>
            <div className="BBtnDiv">
              <Button
                backgroundColor={"#1f97d4"}
                color={"white"}
                transition={"all 0.5s"}
                _hover={{ backgroundColor: "#145e83" }}
                variant={"solid"}
                width={"50%"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/dashboard/banner/create`);
                }}
              >
                Create Banner
              </Button>
            </div>
            <div className="BBtnDiv">
              <Button
                backgroundColor={"#1f97d4"}
                color={"white"}
                transition={"all 0.5s"}
                _hover={{ backgroundColor: "#145e83" }}
                variant={"solid"}
                width={"50%"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/dashboard/banner/update`);
                }}
              >
                Edit Banner
              </Button>
            </div>
            <div className="BBtnDiv">
              <Button
                isDisabled={loading ? true : false}
                backgroundColor={"#1f97d4"}
                color={"white"}
                transition={"all 0.5s"}
                _hover={{ backgroundColor: "#145e83" }}
                variant={"solid"}
                width={"50%"}
                onClick={deleteBannerHandler}
              >
                Delete Banner
              </Button>
              
              <Text color={"red"}>
              <Text color={"black"}>Note:</Text>
                We recommend you to not delete or create banner, If you want to
                change the images of Home Banner just use "Update Banner"
              </Text>
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
