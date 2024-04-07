import React from "react";
import Message from "@/components/Message/Message";
import InputMessage from "@/components/Message/InputMessage";
import HeaderMessage from "@/components/Message/HeaderMessage";

const Chat = () => {
  return (
    <div className="single-chat w-full h-screen flex flex-col">
      {/* TOP */}
      <HeaderMessage />

      {/* MESSAGES */}
      <Message />

      {/* CHAT INPUT */}
      <InputMessage />
    </div>
  );
};

export default Chat;
