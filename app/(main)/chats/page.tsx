import ChatLists from "@/components/chats/ChatList";

export default function ChatsPage() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1/4">
        <ChatLists />
      </div>
      <div className="w-3/4"></div>
    </div>
  );
}
