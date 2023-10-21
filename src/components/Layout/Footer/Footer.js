"use client";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "../../../assets/logo.png";
import "./Footer.css";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      position={"relative"}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Box as="a" href={"/products"}>
              Overview
            </Box>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Box as="a" href={"/home#featured"}>
                Features
              </Box>
              <Tag
                size={"sm"}
                bg={useColorModeValue("green.300", "green.800")}
                ml={2}
                color={"white"}
              >
                New
              </Tag>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={"/about"}>
              About Us
            </Box>
            <Box as="a" href={"/contact"}>
              Contact Us
            </Box>
            <Box as="a" href={"/home#partners"}>
              Partners
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={"#"}>
              Cookies Policy
            </Box>
            <Box as="a" href={"#"}>
              Privacy Policy
            </Box>
            <Box as="a" href={"/home#termsofservice"}>
              Terms of Service
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Box
              as="a"
              href={
                "https://www.instagram.com/_aryan.baghel_/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              }
            >
              Facebook
            </Box>
            <Box
              as="a"
              href={
                "https://www.instagram.com/_aryan.baghel_/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              }
            >
              Twitter
            </Box>
            <Box
              as="a"
              href={
                "https://www.instagram.com/_aryan.baghel_/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              }
            >
              Instagram
            </Box>
            <Box
              as="a"
              href={
                "https://www.instagram.com/_aryan.baghel_/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              }
            >
              LinkedIn
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <img src={Logo} alt="logo" className="logo" />
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2023 Blue Store By Aryan. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
