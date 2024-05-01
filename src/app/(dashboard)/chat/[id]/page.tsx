
import React from "react";
import Message from "@/components/Message/Message";
import InputMessage from "@/components/Message/InputMessage";
import HeaderMessage from "@/components/Message/HeaderMessage";
import ChatSettings from "@/components/Message/ChatSettings";
import { client } from "@/apollo/apolloClient";

async function getMessages() {

  // const message = client.query({
  //   query: GET_MESSAGES
  // })
  // const res = await fetch('https://api.example.com/...')
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
  // return res.json()
}

const Chat = async () => {
  const res = await getMessages();

  return (
    <div className="chat-container flex">
      <div className="single-chat w-full h-screen flex flex-col">
        {/* TOP */}
        {/* <HeaderMessage /> */}

        {/* MESSAGES */}
        {/* <Message /> */}

        {/* CHAT INPUT */}
        {/* <InputMessage /> */}
      </div>

      {/* CHAT SETTINGS RIGHT SIDE */}
      {/* <ChatSettings /> */}
    </div>
  );
};

export default Chat;
