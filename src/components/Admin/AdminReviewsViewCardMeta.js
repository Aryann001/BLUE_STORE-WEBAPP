import {
    Box,
    Image,
    Stack,
    Text,
    useColorModeValue as mode,
  } from "@chakra-ui/react";
  
  export const AdminReviewsViewCardMeta = (props) => {
    const { image, name, comment, _id, rating } = props;
  
    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
          cursor={"pointer"}
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text
              fontWeight="medium"
              cursor={"pointer"}
            >
              {`"${comment}"`}
            </Text>
            <Text
              cursor={"default"}
              color={mode("gray.600", "gray.400")}
              fontSize="sm"
            >
              {name}
            </Text>
            <Text
              cursor={"default"}
              color={mode("gray.600", "gray.400")}
              fontSize="sm"
            >
              {`id#${_id}`}
            </Text>
            <Text
              cursor={"default"}
              color={mode("gray.600", "gray.400")}
              fontSize="sm"
            >
              {`${rating} ⭐`}
            </Text>
          </Stack>
        </Box>
      </Stack>
    );
  };
  