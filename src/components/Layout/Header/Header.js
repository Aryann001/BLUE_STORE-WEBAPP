import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Link,
  Badge,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import logo from "../../../assets/logo.png";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/userAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart as CartIcon } from "react-icons/ai";

export default function WithSubnavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const { isOpen, onToggle } = useDisclosure();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success(`Logout Successfully`);
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <img
              onClick={() => navigate(`/home`)}
              src={logo}
              alt="logo"
              className="logo"
            />
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav cartItems={cartItems} />
          </Flex>
        </Flex>
        {isAuthenticated ? (
          <Flex flex={{ base: 1 }} justify={{ base: "flex-end", md: "auto" }}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={user.avatar.url}
                  width={window.innerWidth <= Number(600) ? "5vh" : "10vh"}
                  height={window.innerWidth <= Number(600) ? "5vh" : "10vh"}
                />
              </MenuButton>
              <MenuList>
                {user.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    _hover={{ border: "none", color: "#1f97d4" }}
                  >
                    <MenuItem>Dashboard</MenuItem>
                  </Link>
                )}

                <Link
                  href="/profile"
                  _hover={{ border: "none", color: "#1f97d4" }}
                >
                  <MenuItem>Profile</MenuItem>
                </Link>

                <Link
                  href="/orders"
                  _hover={{ border: "none", color: "#1f97d4" }}
                >
                  <MenuItem>My Orders</MenuItem>
                </Link>

                <MenuDivider />

                <Link
                  onClick={logoutHandler}
                  _hover={{ border: "none", color: "#1f97d4" }}
                >
                  <MenuItem>Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
            >
              Sign In
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"/register"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav cartItems={cartItems} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ cartItems }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  const NAV_ITEMS = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Services",
      href: "/home#termsofservice",
    },
    {
      label: <CartIcon />,
      href: "/cart",
      bagde: (
        <Badge
          ml="1"
          rounded="full"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          colorScheme="blue"
        >
          {Number(cartItems.length)}
        </Badge>
      ),
    },
  ];

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.bagde}
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({ cartItems }) => {
  const NAV_ITEMS = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Services",
      href: "/home#termsofservice",
    },
    {
      label: <CartIcon />,
      href: "/cart",
      bagde: (
        <Badge
          ml="1"
          borderRadius={"5vmax"}
          width={"5vmax"}
          textAlign={"center"}
          colorScheme="blue"
        >
          {Number(cartItems.length)}
        </Badge>
      ),
    },
  ];

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, bagde }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {bagde}
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
