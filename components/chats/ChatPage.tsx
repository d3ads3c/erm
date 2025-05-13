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
import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [userList, setUserList] = useState<[] | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [myChats, setMyChats] = useState<[] | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatMsg, setChatMsg] = useState<[] | null>(null);
  const [text, setText] = useState<string>("");
  const [userID, setUserID] = useState<string | null>(null);

  //   const scrollToEnd = () => {
  //     if (divRef.current) {
  //       divRef.current.scrollTop = divRef.current.scrollHeight;
  //     }
  //   };

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
        setUserID(data[0].User);
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
        if (selectedChat) {
          ChatMsg(selectedChat);
          MyChats();
        }
      });
    setText("");
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
    if (selectedChat) {
      const interval = setInterval(() => ChatMsg(selectedChat), 5000);
      return () => clearInterval(interval);
    }
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [selectedChat]);

  return (
    <div className="xl:flex gap-2 chat_page p-3">
      <div className="w-xl:1/4 w-full">
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
                          <div className="size-5 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                            <p>2</p>
                          </div>
                          <p className="text-xs text-gray-400">14:47</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {chat.LastText}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {selectedChat && (
        <div className="xl:w-3/4 fixed top-0 right-0 h-screen xl:block w-full min-h-full bg-gray-100 xlrounded-2xl">
          <div className="p-3 h-full">
            <div className="bg-white rounded-2xl p-5 flex items-center justify-between h-[10%]">
              <div>
                <h2 className="text-sm text-gray-600">{}</h2>
                <p className="text-emerald-400 text-xs">آنلاین</p>
              </div>
              <div>
                <button type="button" onClick={() => setSelectedChat(null)}><i className="fi fi-sr-angle-small-left"></i></button>
              </div>
            </div>
            {/* MSG */}
            <div
              className="space-y-5 py-5 max-h-[80%] h-[80%] overflow-auto hide-scroll"
              ref={divRef}
            >
              {chatMsg &&
                chatMsg.map((chat: any) =>
                  chat.Sender == userID ? (
                    <div
                      className="flex items-center justify-start w-full"
                      key={chat.ID}
                    >
                      <div className="w-fit max-w-[50%]">
                        <div className="bg-red-600 text-white rounded-2xl p-3">
                          <p>{chat.Text}</p>
                        </div>
                        <p className="text-sm mt-3 text-gray-400">
                          25 اسفند | 14:25
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-end w-full"
                      key={chat.ID}
                    >
                      <div className="w-fit max-w-[50%] bg-white text-gray-600 rounded-xl p-3">
                        <p>{chat.Text}</p>
                      </div>
                    </div>
                  )
                )}
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
                className="size-10 min-w-[40px] rounded-full bg-red-600 text-white flex items-center justify-center hover:shadow-xl hover:shadow-red-200 duration-150"
              >
                <i className="fi fi-sr-paper-plane mt-2.5"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
