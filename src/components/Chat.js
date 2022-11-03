import { useState, useRef } from "react";
import "./Chat.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
const Chat = () => {
  const message = useRef();
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
  const [isChatBoxHidden, setIsChatBoxHidden] = useState(true);
  const messageSubmitHandler = () => [];
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
        <div className="msg-receive">Hey!</div>
        <div className="msg-send">Goodluck have fun</div>
        <div className="chat-text">
          <input
            type="text"
            placeholder="Type a message..."
            ref={message}
            onEnter={messageSubmitHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default Chat;
