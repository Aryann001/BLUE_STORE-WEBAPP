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
  Select,
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, createProduct } from "../../actions/productAction";

const LinkItems = [
  { name: "Status", icon: FiTrendingUp, href: "/admin/dashboard" },
  { name: "Banner", icon: BannerIcon, href: "/admin/dashboard/banner" },
  { name: "Product", icon: ProductIcon, href: "/admin/dashboard/product" },
  { name: "Orders", icon: OrdersIcon, href: "/admin/dashboard/orders" },
  { name: "Users", icon: UsersIcon, href: "/admin/dashboard/users" },
  { name: "Reviews", icon: ReviewsIcon, href: "/admin/dashboard/reviews" },
];

const categories = [
  "Laptop",
  "Mobile",
  "Camera",
  "Kid's Toy",
  "Men Wears",
  "Women Wears",
  "Footwears",
];

export default function ProductCreate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.adminProduct
  );

  const [banner, setBanner] = useState([]);
  const [bannerPreview, setBannerPreview] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);

  const [key1, setKey1] = useState("");
  const [key2, setKey2] = useState("");
  const [key3, setKey3] = useState("");
  const [key4, setKey4] = useState("");
  const [key5, setKey5] = useState("");

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");

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

    const productDetails = [
      {
        heading: key1,
        detail: value1,
      },
      {
        heading: key2,
        detail: value2,
      },
      {
        heading: key3,
        detail: value3,
      },
      {
        heading: key4,
        detail: value4,
      },
      {
        heading: key5,
        detail: value5,
      },
    ];

    console.log(productDetails)

    const bannerData = new FormData();

    bannerData.set(`name`, name);
    bannerData.set(`description`, description);
    bannerData.set(`price`, price);
    bannerData.set(`stock`, stock);
    bannerData.set(`category`, category);
    bannerData.set(`featured`, featured);
    bannerData.set(`productDetails`, JSON.stringify(productDetails));

    banner.forEach((image) => {
      bannerData.append(`images`, image);
    });

    dispatch(createProduct(bannerData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate(`/admin/dashboard/product`);
      toast.success(`Product Created Successfully`);
      dispatch({ type: "CREATE_ADMIN_PRODUCTS_RESET" });
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
            className="contactContainer bannerContainer createProduct"
            style={
              window.innerWidth <= Number(600) ? { height: "170vh" } : null
            }
          >
            <h1>Create Product</h1>
            <form
              encType="multipart/form-data"
              className="contactForm"
              onSubmit={bannerSubmitHandler}
            >
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="descriptions"
                  placeholder="Descriptions"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Select
                  placeholder="Select Category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  marginRight={"0.2vmax"}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                >
                  {categories &&
                    categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </Select>
                <Input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Heading>Product Details</Heading>
              </div>
              <div>
                <Input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={key1}
                  onChange={(e) => setKey1(e.target.value)}
                  required
                  marginRight={"0.2vmax"}
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
                <Input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={key2}
                  onChange={(e) => setKey2(e.target.value)}
                  required
                  marginRight={"0.2vmax"}
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
                <Input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={key3}
                  onChange={(e) => setKey3(e.target.value)}
                  required
                  marginRight={"0.2vmax"}
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
                <Input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={value3}
                  onChange={(e) => setValue3(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={key4}
                  onChange={(e) => setKey4(e.target.value)}
                  required
                  marginRight={"0.2vmax"}
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
                <Input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={value4}
                  onChange={(e) => setValue4(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={key5}
                  onChange={(e) => setKey5(e.target.value)}
                  required
                  marginRight={"0.2vmax"}
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
                <Input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={value5}
                  onChange={(e) => setValue5(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={featured === true ? true : false}
                  value={featured}
                  onChange={() => setFeatured(!featured)}
                  style={{ width: "2vmax" }}
                />
                <label htmlFor="featured">Featured</label>
              </div>
              <div className="inputFileBtn">
                <label
                  htmlFor="inputFile"
                  className="inputFile"
                  style={
                    window.innerWidth <= Number(600)
                      ? { fontSize: "2.2vmax" }
                      : null
                  }
                >
                  Choose Product Images
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
                padding={
                  window.innerWidth <= Number(600) ? "2vmax 0" : "1vmax 0"
                }
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
