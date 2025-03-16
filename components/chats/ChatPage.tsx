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

export default function ChatPage() {
  const [userList, setUserList] = useState<[] | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [myChats, setMyChats] = useState<[] | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatMsg, setChatMsg] = useState<[] | null>(null);
  const [text, setText] = useState<string>("");

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

  const ChatMsg = async (chatID: string) => {
    await fetch("/api/chats/texts", {
      method: "POST",
      body: JSON.stringify({ Chat: chatID }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChatMsg(data);
      });
  };

  function SelectChat(chatID: string) {
    ChatMsg(chatID);
    setSelectedChat(chatID);
  }

  function MyChats() {
    fetch("/api/chats/mychats", {})
      .then((res) => res.json())
      .then((data) => {
        setMyChats(data);
      });
  }

  const SendChat = async () => {
    await fetch("/api/chats/send", {
      method: "POST",
      body: JSON.stringify({ msg: text, chat: selectedChat }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

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
    <div className="flex gap-2 chat_page">
      <div className="w-1/4">
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
                          .filter((user: any) =>
                            user.Fname.includes(userSearch)
                          )
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
                  onClick={() => SelectChat(chat.Serial)}
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
                        <h2 className="text-sx text-gray-600">
                          {chat.Reciver}
                        </h2>
                        <div>
                          <p className="text-xs text-gray-400">14:47</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        با سلام و احترام خدمت همکاران محترم جهت بهره مندی از
                        قابلیت های جدید نرم افزار مدیریت کسب و کار نسخه خود را
                        به روز رسانی کنید.
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
                    با سلام و احترام خدمت همکاران محترم جهت بهره مندی از قابلیت
                    های جدید نرم افزار مدیریت کسب و کار نسخه خود را به روز رسانی
                    کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedChat && (
        <div className="w-3/4 min-h-full bg-gray-100 rounded-2xl">
          <div className="p-3 h-full">
            <div className="bg-white rounded-2xl p-5 flex items-center justify-between h-[10%]">
              <div>
                <h2 className="text-sm text-gray-600">{}</h2>
                <p className="text-emerald-400 text-xs">آنلاین</p>
              </div>
              <div></div>
            </div>
            {/* MSG */}
            <div className="space-y-5 py-5 max-h-[80%] h-[80%] overflow-auto hide-scroll">
              <div className="flex items-center justify-start w-full">
                <div className="w-1/2">
                  <div className="bg-red-600 text-white rounded-2xl p-3">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut autem inventore ipsum minima temporibus incidunt illo
                      aliquid, omnis ea quas voluptatem cumque modi eveniet rem
                      assumenda vitae ullam totam mollitia!
                    </p>
                  </div>
                  <p className="text-sm mt-3 text-gray-400">25 اسفند | 14:25</p>
                </div>
              </div>
              <div className="flex items-center justify-end w-full">
                <div className="w-1/2 bg-white text-gray-600 rounded-xl p-3">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    autem inventore ipsum minima temporibus incidunt illo
                    aliquid, omnis ea quas voluptatem cumque modi eveniet rem
                    assumenda vitae ullam totam mollitia!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end w-full">
                <div className="w-1/2 bg-white text-gray-600 rounded-xl p-3">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    autem inventore ipsum minima temporibus incidunt illo
                    aliquid, omnis ea quas voluptatem cumque modi eveniet rem
                    assumenda vitae ullam totam mollitia!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end w-full">
                <div className="w-1/2 bg-white text-gray-600 rounded-xl p-3">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    autem inventore ipsum minima temporibus incidunt illo
                    aliquid, omnis ea quas voluptatem cumque modi eveniet rem
                    assumenda vitae ullam totam mollitia!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end w-full">
                <div className="w-1/2 bg-white text-gray-600 rounded-xl p-3">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    autem inventore ipsum minima temporibus incidunt illo
                    aliquid, omnis ea quas voluptatem cumque modi eveniet rem
                    assumenda vitae ullam totam mollitia!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end w-full">
                <div className="w-1/2 bg-white text-gray-600 rounded-xl p-3">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    autem inventore ipsum minima temporibus incidunt illo
                    aliquid, omnis ea quas voluptatem cumque modi eveniet rem
                    assumenda vitae ullam totam mollitia!
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[10%] bg-white w-full flex items-center gap-3 px-3 rounded-2xl">
              <textarea
                value={text}
                onChange={(value) => setText(value.target.value)}
                rows={1}
                cols={5}
                placeholder="پیام شما ..."
                className="bg-gray-100 rounded-lg p-3 text-gray-600 text-sm w-[95%] focus:outline-none resize-none"
              ></textarea>
              <button
                type="button"
                onClick={SendChat}
                className="size-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:shadow-xl hover:shadow-red-200 duration-150"
              >
                <i className="fi fi-sr-paper-plane mt-2"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
