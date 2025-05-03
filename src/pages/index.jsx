import React, { useEffect } from "react";
import { Page } from "zmp-ui";
import BigBanner from "../assets/img/bigBanner.png";
import Button from "../components/Button";
import {
  authorize,
  getAccessToken,
  getPhoneNumber,
  getSetting,
} from "zmp-sdk/apis";

const HomePage = () => {
  const handleStartLearning = async () => {
    try {
      // 1. getSetting
      const { authSetting } = await getSetting({});
      const grantedUserLocation = authSetting["scope.userLocation"] || false;
      const grantedPhoneNumber = authSetting["scope.userPhonenumber"] || false;

      // 2. Authorize
      if (!grantedUserLocation || !grantedPhoneNumber) {
        await authorize({
          scopes: ["scope.userLocation", "scope.userPhonenumber"],
        });
        console.log("Đã cấp quyền userLocation, userPhonenumber");
      } else {
        console.log("Người dùng đã cấp quyền đầy đủ.");
      }

      // 3. getAccessToken
      const accessToken = await getAccessToken({});
      console.log("Access Token:", accessToken);

      // 4. getPhoneNumber
      getPhoneNumber({
        success: async (data) => {
          const { token } = data;
          console.log("Phone Token:", token);
          fetchZaloPhoneNumber(token, accessToken);
        },
        fail: (error) => {
          console.log("Lỗi bước 4: ", error);
        },
      });
    } catch (error) {
      console.error("Lỗi khi xin quyền:", error);
    }
  };

  const fetchZaloPhoneNumber = async (phoneToken, accessToken) => {
    const endpoint = import.meta.env.VITE_ZALO_ENDPOINT;
    const secretKey = import.meta.env.VITE_ZALO_SECRET_KEY;

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          access_token: accessToken,
          code: phoneToken,
          secret_key: secretKey,
        },
      });
      const result = await res.json();
      console.log("Số điện thoại thu được: ", result);
    } catch (error) {
      console.log("Lỗi khi thực hiện api getPhoneNumber", error);
    }
  };

  return (
    <Page className="bg-white">
      <div className="flex flex-col justify-between h-screen py-7">
        <div className="flex items-center justify-center p-10">
          <div className="w-max">
            <h1 className="animate-typing overflow-hidden whitespace-nowrap pr-2 text-3xl text-black font-bold">
              TechZy
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="font-extrabold text-3xl">Level up and get hired</p>
          <div className="px-10">
            <img src={BigBanner} alt="" />
          </div>
          <p className="px-20 font-semibold text-base text-center">
            The easy way to follow your tech roadmap to success
          </p>
        </div>
        <Button
          to="/main-page"
          text="Start now"
          className={"font-bold"}
          onClick={handleStartLearning}
        />
      </div>
    </Page>
  );
};

export default HomePage;
