import React from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  Icon,
  useNavigate,
} from "zmp-ui";

import { useRecoilValue } from "recoil";
import { displayNameState, userState } from "../../state";
import { openPermissionSetting } from "zmp-sdk/apis";

const UserPage = () => {
  const { userInfo: user } = useRecoilValue(userState);
  const displayName = useRecoilValue(displayNameState);
  const navigate = useNavigate();

  const handleOpenPermissionSettings = () => {
    openPermissionSetting({
      success: () => {
        console.log("openPermissionSetting hoạt động");
      },
      fail: (error) => {
        console.log("Error openPermissionSetting: ", error);
      },
    });
  };
  return (
    <Page className="page">
      <Box
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box mt={6}>
          <Avatar
            story="default"
            size={96}
            online
            src={user.avatar.startsWith("http") ? user.avatar : undefined}
          >
            {user.avatar}
          </Avatar>
        </Box>
        <Box flex flexDirection="row" alignItems="center" ml={8}>
          <Box>
            <Text.Title>{displayName || user.name}</Text.Title>
          </Box>
          <Box ml={4}>
            <Button
              onClick={() => {
                navigate("/form");
              }}
              size="small"
              icon={<Icon icon="zi-edit" />}
            />
          </Box>
        </Box>
      </Box>
      <Box m={0} p={0} mt={6}>
        <div className="section-container">
          <List>
            {/* <List.Item title="Name" subTitle={user.name} /> */}
            <List.Item
              className="font-bold"
              title="Name"
              prefix={<Icon icon="zi-user-solid" className="text-primary" />}
              suffix={<Icon icon="zi-chevron-right" />}
            />
            <List.Item
              className="font-bold"
              title="Quản lý quyền truy cập"
              prefix={<Icon icon="zi-shield-solid" className="text-primary" />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={handleOpenPermissionSettings}
            />
          </List>
        </div>
      </Box>
    </Page>
  );
};

export default UserPage;
