"use client";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/lib/functions";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
// import { requestNotificationPermission, checkNotificationPermission } from "@/src/utils/firebaseConfig";

export default function HeadBar() {
  const [user, setUser] = useState<any>(null);
  const [notif, setNotif] = useState<boolean>(false)
  const [today, setToday] = useState<string | null>(null)
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(false);

  const TodayInfo = async () => {
    await fetch("/api/settings/today")
      .then((res) => res.json())
      .then((data) => {
        setToday(data)
      })
  }

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(async (registration) => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BG3va9AESVS921QyWIdPFyJVOy6HWSjBzBHTI_5cyK5IJLKRCwkyy4w6n8HLVFV_8iJ18sdN-8n7iEC_ON0NwEs',
          });
          // Send subscription to your backend to save it
          await fetch('/api/notification/save-subscription', {
            method: 'POST',
            body: JSON.stringify({ Token: subscription }),
            headers: { 'Content-Type': 'application/json' },
          });
        }
      });
    }
    TodayInfo()
    getUserInfo().then(setUser);
  }, [])

  const handleEnableNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BG3va9AESVS921QyWIdPFyJVOy6HWSjBzBHTI_5cyK5IJLKRCwkyy4w6n8HLVFV_8iJ18sdN-8n7iEC_ON0NwEs',
        });
        await fetch('/api/notification/save-subscription', {
          method: 'POST',
          body: JSON.stringify({ Token: subscription }),
          headers: { 'Content-Type': 'application/json' },
        });
        setNotificationEnabled(true);
        alert("Notifications enabled!");
      } else {
        alert("Permission denied.");
      }
    }
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const LocalData = localStorage.getItem("UserInfo");
  //     if (LocalData) {
  //       const userName = JSON.parse(LocalData);
  //       setUserName(userName.Fname);
  //     } else {
  //       console.log("No user data found in localStorage");
  //     }
  //   }

  //   // Check if notifications are already enabled
  //   const checkNotifications = async () => {
  //     const hasPermission = await checkNotificationPermission();
  //     setNotificationEnabled(hasPermission);
  //   };

  //   checkNotifications();
  // }, []);

  // const handleEnableNotifications = async () => {
  //   const token = await requestNotificationPermission();
  //   if (token) {
  //     setNotificationEnabled(true);
  //     alert("Notifications have been enabled!");
  //   } else {
  //     alert("Failed to enable notifications. Please check your browser settings.");
  //   }
  // };

  return (
    <>
      <div className="w-full py-5 bg-white xl:flex items-center border-b hidden">
        <div className="w-1/2">
          <h2>سلام {user ? user.Fname : ""}؛ خوش آمدی</h2>
          <p className="text-xs text-gray-400">{today}</p>
        </div>
        <div className="w-1/2 flex items-center justify-end gap-3">
          {!notificationEnabled && (
            <button
              type="button"
              className="w-full rounded-xl bg-red-500 text-white py-3"
              onClick={handleEnableNotifications}
            >
              فعال‌سازی اعلان‌ها
            </button>
          )}
          <div onClick={() => setNotif(!notif)} className="size-12 rounded-xl flex items-center justify-center bg-gray-100 text-gray-500 relative">
            <i className="fi fi-sr-bell mt-2"></i>
            {/* <span className="absolute -top-0.5 -right-0.5 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span> */}
            {notif && (
              <div className="absolute top-16 shadow-xl left-0 w-[250px] rounded-2xl p-3 bg-white">
                <div className="mb-1">
                  <p className="text-xs text-gray-400">اعلان ها</p>
                </div>
                <div className="bg-gray-100 text-sm text-gray-400 rounded-xl p-5 text-center">
                  <h2>شما هیچ اعلانی ندارید.</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 bg-red-600 rounded-b-[30px] xl:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <Image
                src={"/img/default-user-icon.jpg"}
                width={1000}
                height={1000}
                alt="User Image"
                className="max-w-[60px] rounded-2xl"
              ></Image>
            </div>
            <div>
              <p className="text-xs text-white">خوش آمدید</p>
              <h2 className="font-bold text-white">{user ? user.Fname + " " + user.Lname : ""}</h2>
            </div>
          </div>
          <div onClick={() => setNotif(!notif)} className="bg-white size-14 rounded-2xl flex items-center justify-center text-red-500 text-xl relative">
            <i className="fi fi-sr-bell mt-2"></i>
            {notif && (
              <div className="absolute top-16 shadow-xl left-0 w-[250px] rounded-2xl p-3 bg-white">
                <div className="mb-1">
                  <p className="text-xs text-gray-400">اعلان ها</p>
                </div>
                <div className="bg-gray-100 text-sm text-gray-400 rounded-xl p-5 text-center">
                  <h2>شما هیچ اعلانی ندارید.</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Drawer defaultOpen={true}>
        <DrawerContent className="max-h-[600px] max-w-[30%] mx-auto p-10" dir="rtl">
          <DrawerHeader className="text-right">
            <DrawerTitle>منو</DrawerTitle>
            <DrawerDescription>دسترسی به قابلیت های برنامه</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[600px] overflow-auto">
            {!notificationEnabled ? (
              <button
                type="button"
                className="w-full rounded-xl bg-red-500 text-white py-3"
                onClick={handleEnableNotifications}
              >
                Enable Notifications
              </button>
            ) : (
              <p className="text-green-500 text-center">Notifications are already enabled!</p>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose>
              <i className="fi fi-sr-cross-small"></i>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </>
  );
}
