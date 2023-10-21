import React, { Fragment } from "react";
import { Box, Stack, Heading } from "@chakra-ui/react";
import "./Banner.css";
import { AdminReviewsViewCardItem } from "./AdminReviewsViewCardItems";

export default function AdminReviewsView({ reviews, search }) {
  return (
    <Fragment>
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
              {`Reviews`}
            </Heading>

            <Stack spacing="6">
              {reviews &&
                reviews.map((item) => (
                  <AdminReviewsViewCardItem key={item._id} search={search} {...item} />
                ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
}
