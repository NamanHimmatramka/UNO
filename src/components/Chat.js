import React, { useState, useContext } from "react";
import { AppContext } from "../context/appContext";
import "./Chat.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useEffect } from "react";
const Chat = (props) => {
  const [message, setMessage] = useState("");
  const socket = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const toggleChatBox = () => {
    const chatBody = document.querySelector(".chat-body");
    if (isChatBoxHidden) {
      chatBody.style.display = "block";
      setIsChatBoxHidden(false);
    } else {
      chatBody.style.display = "none";
      setIsChatBoxHidden(true);
    }
  };

  useEffect(() => {
    socket.on("receive-message", (res) => {
      setMessages((messages)=>{
        return [...messages, { message: res, sent: false }]
      })
    });
  }, [socket]);

  const [isChatBoxHidden, setIsChatBoxHidden] = useState(true);
  const messageSubmitHandler = (event) => {
    event.preventDefault();
    if (!message) {
    } else {
      socket.emit("send-message", {
        gameId: props.gameId,
        message: message,
      });
      const newMessages=[...messages, { message:  message , sent: true }]
      setMessages(newMessages);
      setMessage("");
    }
  };
  return (
    <div className="chat-box">
      <div className="chat-head">
        <h2>Chat Box</h2>
        {isChatBoxHidden ? (
          <span onClick={toggleChatBox}>
            <FaArrowUp />
          </span>
        ) : (
          <span onClick={toggleChatBox}>
            <FaArrowDown />
          </span>
        )}
      </div>
      <div className="chat-body">
        {messages.map((message, i) => {
          return message.sent ? (
            <div key={i} className="msg-send">
              {message.message}
            </div>
          ) : (
            <div key={i} className="msg-receive">
              {message.message}
            </div>
          );
        })}
        <div className="chat-text">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(event) =>
              event.key === "Enter" && messageSubmitHandler(event)
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Chat;
