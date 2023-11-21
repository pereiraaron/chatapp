import React from "react";
import { MessagesProps } from "../lib/types";
import Message from "./message/Message";
import { formatDateDivider, groupedMessages } from "../lib/helper";

const Messages: React.FC<MessagesProps> = ({ messages, getMessages }) => {
  return (
    <>
      <div className="mt-auto overflow-auto">
        {Object?.entries(groupedMessages(messages)).map(([date, messages]) => {
          return (
            <>
              <div className="flex items-center justify-center w-full my-4 ">
                <p className="px-4 bg-gray-500/50 rounded-[8px] py-1  text-[12px] font-bold text-white ">
                  {formatDateDivider(date)}
                </p>
              </div>
              <ul className="flex flex-col max-h-full gap-4 mx-2 my-2 ">
                {messages?.map((message) => {
                  return (
                    <Message
                      key={message.id}
                      message={message}
                      getMessages={getMessages}
                    />
                  );
                })}
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Messages;
