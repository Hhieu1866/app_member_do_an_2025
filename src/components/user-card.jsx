import React from "react";
import { Avatar, Box, Text } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

const UserCard = () => {
  const { userInfo } = useRecoilValue(userState);

  return (
    <Box flex>
      <Avatar
        story="seen"
        // online
        src={userInfo.avatar.startsWith("http") ? userInfo.avatar : undefined}
      >
        {userInfo.avatar}
      </Avatar>
      <Box ml={2}>
        <Text.Title className="!font-bold !text-lg">
          Xin chào {userInfo.name}
        </Text.Title>
        <Text className="!text-sm">{userInfo.id}</Text>
      </Box>
    </Box>
  );
};

export default UserCard;
