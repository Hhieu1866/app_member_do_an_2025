// import {
//   authorize,
//   getSetting,
//   getPhoneNumber,
//   getAccessToken,
// } from "zmp-sdk/apis";

// /**
//  * Kiểm tra quyền hiện tại của người dùng
//  */
// export const checkPermissions = () => {
//   getSetting({
//     success: (data) => {
//       console.log("Trạng thái quyền hiện tại:", data);
//       const grantedUserLocation =
//         data.authSetting["scope.userLocation"] || false;
//       const grantedPhoneNumber =
//         data.authSetting["scope.userPhonenumber"] || false;

//       if (!grantedUserLocation || !grantedPhoneNumber) {
//         console.log("Chưa có quyền đầy đủ, yêu cầu cấp quyền.");
//       } else {
//         console.log("Người dùng đã cấp quyền đầy đủ.");
//       }
//     },
//     fail: (error) => {
//       console.log("Lỗi khi kiểm tra quyền:", error);
//     },
//   });
// };

// /**
//  * Xin quyền nếu thiếu
//  */
// export const requestPermissions = () => {
//   authorize({
//     scopes: ["scope.userInfo", "scope.userPhonenumber"],
//     success: (data) => {
//       console.log("Đã cấp quyền:", data);
//     },
//     fail: (error) => {
//       console.log("Lỗi xin quyền:", error);
//     },
//   });
// };

// /**
//  * Lấy số điện thoại của user qua Zalo API
//  */
// export const fetchUserPhoneNumber = () => {
//   getPhoneNumber({
//     success: async (data) => {
//       const { token } = data;
//       console.log("Phone Token:", token);

//       fetchZaloPhoneNumber(token);
//     },
//     fail: (error) => {
//       console.log("Lỗi lấy số điện thoại:", error);
//     },
//   });
// };

// /**
//  * Gửi phoneToken lên Zalo Open API để lấy số thực
//  */
// export const fetchZaloPhoneNumber = async (phoneToken) => {
//   const endpoint = "https://graph.zalo.me/v2.0/me/info";
//   const secretKey = "losASIQfw8z4l2246GY0"; // Thay bằng Secret Key thật

//   try {
//     // 1️⃣ Lấy Access Token từ Zalo Mini App SDK
//     const accessToken = await new Promise((resolve, reject) => {
//       getAccessToken({
//         success: (token) => {
//           console.log("Lấy Access Token thành công:", token);
//           resolve(token);
//         },
//         fail: (error) => {
//           console.log("Lỗi lấy Access Token:", error);
//           reject(error);
//         },
//       });
//     });

//     console.log("Access Token lấy được:", accessToken);

//     // 2️⃣ Gửi request đến Zalo Open API
//     const response = await fetch(endpoint, {
//       method: "GET",
//       headers: {
//         access_token: accessToken,
//         code: phoneToken,
//         secret_key: secretKey,
//       },
//     });

//     const result = await response.json();
//     console.log("Số điện thoại từ Open API:", result);
//   } catch (error) {
//     console.log("Lỗi gửi request đến Open API:", error);
//   }
// };
