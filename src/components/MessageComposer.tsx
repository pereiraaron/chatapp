import React, { useState } from "react";
import { MessageComposerProps } from "../lib/types";
import { Send } from "react-feather";
import { sendRequest } from "../lib/helper";

const MessageComposer: React.FC<MessageComposerProps> = ({ getMessages }) => {
  const [message, setMessage] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await sendRequest("/messages/", "POST", { text: message });
      getMessages();
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-2.5 pt-4 bg-[#0000004d] w-full transition-all ease-in	"
    >
      <textarea
        className={`${
          focused || message?.length ? "w-[88%]" : "w-full"
        } bg-[#414d6399]  overflow-auto rounded-[8px] bg-[#0d244b ] p-1 px-2 max-h-12 m-0 pr-5 text-[12px] h-8 text-[#ffffffb3] outline-none resize-none`}
        placeholder="Type your message..."
        value={message}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      {focused || message?.length ? (
        <button
          type="submit"
          className="absolute top-[18px] flex w-8 h-7 rounded-[10px] justify-center items-center right-2.5 text-white  bg-[#248a52] hover:bg-[#1d7745]"
        >
          <Send width={16} height={16} />
        </button>
      ) : (
        <></>
      )}
    </form>
  );
};

export default MessageComposer;
