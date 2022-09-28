import "./Chat.css";
const Chat = () => {
  return (
    <div className="chat-box">
      <div className="chat-head">
        <h2>Chat Box</h2>
      </div>
      <div className="chat-body">
        <div className="msg-receive">Hey!</div>
        <div className="msg-send">Goodluck have fun</div>
      </div>
      <div className="chat-text">
        <input
          type="text"
          placeholder="Type a message..."
        //   value={message}
        />
      </div>
    </div>
  );
};
export default Chat;
