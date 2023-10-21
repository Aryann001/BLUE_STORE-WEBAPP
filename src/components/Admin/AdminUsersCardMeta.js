import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AdminUsersCardMeta = (props) => {
  const { image, _id, name, email,  } = props;

  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        onClick={() => navigate(`/admin/dashboard/user/update/${_id}`)}
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
            onClick={() => navigate(`/admin/dashboard/user/update/${_id}`)}
            fontWeight="medium"
            cursor={"pointer"}
          >
            {name}
          </Text>
          <Text cursor={"default"} fontSize="sm">
            {_id}
          </Text>
          <Text cursor={"default"} fontSize="sm">
            {email}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
