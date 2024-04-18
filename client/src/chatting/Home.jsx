import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect(import.meta.env.VITE_APP_SERVER, {
  transports: ["polling"],
  upgrade: false,
  forceNew: true,
});

const Home = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // const notification = new Audio(music)

  const joinChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      // notification.play();
    }
  };

  return (
    <>
      {!showChat && (
        <div className="flex h-screen justify-center items-center flex-col gap-4 bg-black">
          <h1 className="text-white text-2xl">Join Chat</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="h-9 w-72 bg-black text-white border-2 border-yellow-500 p-1 placeholder-bold text-lg"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Chat Room"
            className="h-9 w-72 bg-black text-white border-2 border-yellow-500 p-1 placeholder-bold text-lg"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            className="h-10 w-72 font-bold text-xl bg-blue-800 text-white border border-yellow-500"
            onClick={joinChat}
          >
            Join
          </button>
        </div>
      )}
      {showChat && <Chat socket={socket} username={username} room={room} />}
    </>
  );
};

export default Home;
