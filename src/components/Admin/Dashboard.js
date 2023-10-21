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
import "./Dashboard.css";
import { Doughnut, Line } from "react-chartjs-2";
import { allUsers } from "../../actions/userAction";
import { getAdminProduct } from "../../actions/productAction";
import { allOrders } from "../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Status", icon: FiTrendingUp, href: "/admin/dashboard" },
  { name: "Banner", icon: BannerIcon, href: "/admin/dashboard/banner" },
  { name: "Product", icon: ProductIcon, href: "/admin/dashboard/product" },
  { name: "Orders", icon: OrdersIcon, href: "/admin/dashboard/orders" },
  { name: "Users", icon: UsersIcon, href: "/admin/dashboard/users" },
  { name: "Reviews", icon: ReviewsIcon, href: "/admin/dashboard/reviews" },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.getAdminProduct);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  let totalAmount = 0;

  products &&
    products.forEach((i) => {
      if (i.stock === 0) {
        outOfStock += 1;
      }
    });

  orders &&
    orders.forEach((o) => {
      totalAmount += o.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["red"],
        hoverBackgroundColor: ["yellow"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["red", "blue"],
        hoverBackgroundColor: ["darkred", "green"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(allUsers());

    dispatch(getAdminProduct());

    dispatch(allOrders());
  }, [dispatch]);

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

        <div className="status">
          <div className="statusContainer">
            <div className="statusSection1">
              <div>
                <div
                  className="statusProduct"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/admin/dashboard/product`);
                  }}
                >
                  <div>
                    <h2>Products</h2>
                    <p>{products.length}</p>
                  </div>
                </div>
              </div>
              {/*  */}
              <div>
                <div
                  className="statusUsers"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/admin/dashboard/users`);
                  }}
                >
                  <div>
                    <h2>Users</h2>
                    <p>{users.length}</p>
                  </div>
                </div>
              </div>
              {/*  */}
              <div>
                <div
                  className="statusOrders"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/admin/dashboard/orders`);
                  }}
                >
                  <div>
                    <h2>Orders</h2>
                    <p>{orders.length}</p>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="statusSection2">
              <div>
                <h2>Total Amount</h2>
                <p>{`₹${totalAmount}`}</p>
              </div>
            </div>
            {/*  */}
            <div className="statusSection3">
              <div>
                <Line data={lineState} />
              </div>
            </div>
            {/*  */}
            <div className="statusSection4">
              <div>
                <Doughnut data={doughnutState} />
              </div>
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
