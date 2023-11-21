import React from "react";
import { formatDate } from "../../lib/helper";
import { Trash2 } from "react-feather";
import { MessageBodyProps } from "../../lib/types";

const Body: React.FC<MessageBodyProps> = ({ message, openModal }) => {
  return (
    <div className="flex flex-col chat bg-[#248a52] relative rounded-bl-md px-2 gap-1">
      <p className="text-[14px] text-white font-bold ">{`~ ${message.userId}`}</p>
      <p className="relative pb-1 max-w-[15.5rem]  break-words  text-white text-[16px]">
        {message.content}
      </p>
      <div className=" flex items-end w-10 text-white absolute bottom-[0px] h-full bg-[#248a52] rounded-tr-md rounded-br-md -right-10">
        <p className="ml-1 mb-[2px] text-[9px] font-semibold">
          {formatDate(message.timestamp)}
        </p>
      </div>
      <span className="absolute -top-[1px] -left-[8px]">
        <svg
          viewBox="0 0 8 13"
          height="13"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          className=""
          version="1.1"
          x="0px"
          y="0px"
        >
          <path
            opacity="1"
            fill="#248a52"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
        </svg>
      </span>
      <span
        onClick={openModal}
        className="absolute -right-9 top-[5px] delete cursor-pointer"
      >
        <Trash2 color="white" width={12} height={12} />
      </span>
    </div>
  );
};

export default React.memo(Body);
