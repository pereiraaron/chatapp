import React from "react";
import { isMobile } from "../../lib/helper";

const ChatContainer = ({ children }: { children: any }) => {
  return (
    <div
      className={`${
        !isMobile() ? "md:rounded-2xl chat" : ""
      }  md:h-[85vh] md:w-[25rem] bg-[#00000080] h-screen w-full z-2 overflow-hidden flex flex-col justify-between `}
    >
      {children}
    </div>
  );
};

export default ChatContainer;
