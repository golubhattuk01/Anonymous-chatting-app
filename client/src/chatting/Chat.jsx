import { useState, useEffect, useRef } from "react";

export const Chat = ({ socket, username, room }) => {
  const currentMessage = useRef("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage.current.value !== "") {
      const messageData = {
        id: Math.random(),
        room: room,
        author: username,
        message: currentMessage.current.value,
        time:
          (new Date(Date.now()).getHours() % 12) +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      currentMessage.current.value = "";
    }
  };

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", handleReceiveMsg);

    return () => {
      socket.off("receive_message", handleReceiveMsg);
    };
  }, [socket]);

  const containRef = useRef(null);

  useEffect(() => {
    containRef.current.scrollTop = containRef.current.scrollHeight;
  }, [messageList]);

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-4 border-2 border-yellow-500">
        <h1>Welcome {username}</h1>
        <div className="relative bg-gray-700 border-yellow-500 border h-full overflow-hidden">
          <div
            className=" overflow-scroll h-96 overflow-x-hidden"
            ref={containRef}
          >
            {messageList.map((data) => (
              <div
                key={data.id}
                className={`flex ${
                  username === data.author ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={` text-black p-2 rounded-md ${
                    username === data.author ? "bg-yellow-400" : "bg-green-400"
                  } `}
                >
                  <p>{data.message}</p>
                  <div className="flex justify-center items-center gap-2">
                    <p>{data.author}</p>
                    <p>{data.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className=" w-full mt-4">
            <input
              className="w-full p-2 border-yellow-500 border text-red-600"
              ref={currentMessage}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type Your Message"
            />
            <button
              className="p-2 bg-purple-700 text-white"
              onClick={sendMessage}
            >
              &#9658;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
