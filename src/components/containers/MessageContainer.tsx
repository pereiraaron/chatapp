import React from "react";
import { isMobile } from "../../lib/helper";
import { MessageContainerProps } from "../../lib/types";

const MessageContainer: React.FC<MessageContainerProps> = ({ children }) => {
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

export default MessageContainer;
