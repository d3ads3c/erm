// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FB_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FB_MEASURE_ID,
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export const requestNotificationPermission = async () => {
//   try {
//     const permission = Notification.permission;
//     if (permission === "denied") {
//       console.warn("Notifications are blocked. Please enable them in your browser settings.");
//       alert("Notifications are blocked. Please enable them in your browser settings.");
//       return null;
//     }

//     const token = await getToken(messaging, {
//       vapidKey: "YOUR_VAPID_KEY", // Replace with your VAPID key
//     });
//     if (token) {
//       console.log("FCM Token:", token);
//       return token;
//     } else {
//       console.log("No registration token available.");
//     }
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//   }
// };

// export const checkNotificationPermission = async () => {
//   const permission = Notification.permission;

//   if (permission === "granted") {
//     console.log("Notifications are already enabled.");
//     return true;
//   } else if (permission === "denied") {
//     console.warn("Notifications are blocked. Please enable them in your browser settings.");
//     alert("Notifications are blocked. Please enable them in your browser settings.");
//     return false;
//   } else {
//     console.log("Requesting notification permission...");
//     const token = await requestNotificationPermission();
//     return !!token;
//   }
// };

// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         });
//     });