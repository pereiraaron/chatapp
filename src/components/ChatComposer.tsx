import React, { useState } from "react";
import axios from "axios";

const ChatComposer = ({
  getMessages,
}: {
  getMessages: () => Promise<void>;
}) => {
  const [message, setMessage] = useState<string>("");

  const handleClick = async () => {
    try {
      await axios.post(
        "https://mapi.harmoney.dev/api/v1/messages/",
        { text: message },
        {
          headers: { Authorization: "noag2GiqPZO81KS1" },
        }
      );
      getMessages();
      setMessage("");
    } catch (error) {}
  };

  return (
    <div className="message-box">
      <textarea
        className="message-input border w-3/4"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button className="message-submit" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};

export default ChatComposer;
