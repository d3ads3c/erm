"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";

export default function ChatLists() {
  const router = useRouter();
  const [userList, setUserList] = useState<[] | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [myChats, setMyChats] = useState<[] | null>(null);

  function AddNewChat(userID: string) {
    fetch("/api/chats/newchat", {
      method: "POST",
      body: JSON.stringify({ user: userID }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  function MyChats() {
    fetch("/api/chats/mychats", {})
      .then((res) => res.json())
      .then((data) => {
        setMyChats(data);
      });
  }
  async function GetPersonnel() {
    await fetch("/api/personnel/list")
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
      });
  }
  useEffect(() => {
    GetPersonnel();
    MyChats();
  }, []);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h1 className="mb-2">مکاتبات</h1>
          <Dialog>
            <DialogTrigger className="bg-red-600 text-white rounded-xl hover:shadow-xl hover:shadow-red-200 py-2 px-3 text-sm duration-150">
              چت جدید
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>انتخاب مخاطب</DialogTitle>
                <DialogDescription>
                  برای مکالمه جدید روی کاربر کلیک کنید
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    className="w-full rounded-xl p-3 bg-gray-100 focus:outline-none text-black"
                    placeholder="جستوجو ..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
                <div className="max-h-[400px] overflow-auto space-y-3 hide-scroll">
                  {userList &&
                    userList
                      .filter((user: any) => user.Fname.includes(userSearch))
                      .map((users: any, index: number) => (
                        <div
                          onClick={() => AddNewChat(users.ID)}
                          className="p-3 rounded-xl hover:bg-gray-100 duration-150"
                          key={index}
                        >
                          <div className="flex items-center gap-3">
                            <div className="size-14 rounded-full bg-gray-100">
                              <Image
                                src={"/img/default-user-icon.jpg"}
                                width={56}
                                height={56}
                                className="rounded-full"
                                alt="msg user Image"
                              ></Image>
                            </div>
                            <div className="w-3/4">
                              <div className="flex items-center justify-between">
                                <h2 className="text-sx text-gray-600">
                                  {users.Fname + " " + users.Lname}
                                </h2>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">
                                  {users.Title}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <input
          type="text"
          className="w-full rounded-xl p-3 bg-gray-100 focus:outline-none text-black"
          placeholder="جستوجو ..."
        />
      </div>
      <div className="chat_select_height mt-3 overflow-auto space-y-3">
        {myChats &&
          myChats.map((chat: any) => (
            <div
              onClick={() => router.push(`/chats?room=${chat.Serial}`)}
              className="p-3 rounded-xl hover:bg-gray-100 duration-150"
              key={chat.Serial}
            >
              <div className="flex items-center gap-3">
                <div className="size-14 rounded-full bg-gray-100">
                  <Image
                    src={"/img/default-user-icon.jpg"}
                    width={56}
                    height={56}
                    className="rounded-full"
                    alt="msg user Image"
                  ></Image>
                </div>
                <div className="w-3/4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sx text-gray-600">{chat.Reciver}</h2>
                    <div>
                      <p className="text-xs text-gray-400">14:47</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    با سلام و احترام خدمت همکاران محترم جهت بهره مندی از قابلیت
                    های جدید نرم افزار مدیریت کسب و کار نسخه خود را به روز رسانی
                    کنید.
                  </p>
                </div>
              </div>
            </div>
          ))}
        <div className="p-3 rounded-xl hover:bg-gray-100 duration-150">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-full bg-gray-100">
              <Image
                src={"/img/default-user-icon.jpg"}
                width={56}
                height={56}
                className="rounded-full"
                alt="msg user Image"
              ></Image>
            </div>
            <div className="w-3/4">
              <div className="flex items-center justify-between">
                <h2 className="text-sx text-gray-600">نیما نیک عمل</h2>
                <div className="size-5 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                  <p>2</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                با سلام و احترام خدمت همکاران محترم جهت بهره مندی از قابلیت های
                جدید نرم افزار مدیریت کسب و کار نسخه خود را به روز رسانی کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
