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
  Stack,
  Heading,
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
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../Layout/Loader/Loader";
import { allOrders, clearErrors } from "../../actions/orderAction";
import { AdminOrdersCardItem } from "./AdminOrdersCardItems";

const LinkItems = [
  { name: "Status", icon: FiTrendingUp, href: "/admin/dashboard" },
  { name: "Banner", icon: BannerIcon, href: "/admin/dashboard/banner" },
  { name: "Product", icon: ProductIcon, href: "/admin/dashboard/product" },
  { name: "Orders", icon: OrdersIcon, href: "/admin/dashboard/orders" },
  { name: "Users", icon: UsersIcon, href: "/admin/dashboard/users" },
  { name: "Reviews", icon: ReviewsIcon, href: "/admin/dashboard/reviews" },
];

export default function AdminOrders() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(
    (state) => state.allOrders
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(allOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />

          <Box
            minH={window.innerWidth <= Number(600) ? "40vh" : "100vh"}
            display={"flex"}
            flexDirection={window.innerWidth <= Number(767) ? "column" : "row"}
            bg={"gray.100"}
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

            <Box
              maxW={{
                base: "3xl",
                lg: "7xl",
              }}
              mx="auto"
              px={{
                base: "4",
                md: "8",
                lg: "12",
              }}
              py={{
                base: "6",
                md: "8",
                lg: "12",
              }}
              backgroundColor={"white"}
              width={"100%"}
            >
              <Stack
                direction={{
                  base: "column",
                  lg: "row",
                }}
                align={{
                  lg: "flex-start",
                }}
                spacing={{
                  base: "8",
                  md: "16",
                }}
              >
                <Stack
                  spacing={{
                    base: "8",
                    md: "10",
                  }}
                  flex="2"
                >
                  <Heading fontSize="2xl" fontWeight="extrabold">
                    {`Orders`}
                  </Heading>

                  <Stack spacing="6">
                    {orders &&
                      orders.map((item) => (
                        <AdminOrdersCardItem key={item._id} {...item} />
                      ))}
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Footer />
        </Fragment>
      )}
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
