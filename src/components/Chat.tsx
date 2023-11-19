import React, { useState } from "react";
import { Trash2 } from "react-feather";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";

const Chat = ({
  messages,
  getMessages,
}: {
  messages: any[];
  getMessages: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://mapi.harmoney.dev/api/v1/messages/${id}`, {
        headers: { Authorization: "noag2GiqPZO81KS1" },
      });
      getMessages();
      onCloseModal();
    } catch (error) {
      console.error(error);
      onCloseModal();
    }
  };

  return (
    <>
      <div className="overflow-hidden max-h-[80%] mt-auto pb-4 ">
        <ul className="flex flex-col mx-2 my-2  max-h-full overflow-y-auto gap-4">
          {messages?.map((message, index) => {
            return (
              <>
                <li
                  key={message.id}
                  className=" max-w-[85%] flex gap-3 relative"
                >
                  <div className="h-[28px] w-[28px]  bg-gray-500 rounded-[50%] flex items-center justify-center font-bold text-white">
                    A
                  </div>
                  <div className="flex flex-col chat bg-[#248a52] relative rounded-bl-md px-2 gap-1">
                    <p className="text-[14px] text-white font-bold ">{`~ ${message.source}`}</p>
                    <p className="relative pb-1 max-w-[15.5rem]  break-words  text-white text-[16px]">
                      {message.text}
                    </p>
                    <div className=" flex items-end w-10 text-white absolute bottom-[0px] h-full bg-[#248a52] rounded-tr-md rounded-br-md -right-10">
                      <p className="ml-1 mb-[2px] text-[9px] font-semibold">
                        {"7:12pm"}
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
                      onClick={onOpenModal}
                      className="absolute -right-9 top-[5px] delete cursor-pointer"
                    >
                      <Trash2 color="white" width={12} height={12} />
                    </span>
                  </div>
                </li>
                <Modal
                  open={open}
                  onClose={onCloseModal}
                  center
                  showCloseIcon={false}
                >
                  <div className="flex flex-col gap-8">
                    <h2 className="w-full">
                      Are you sure you want to delete the message?
                    </h2>
                    <div className="flex gap-4 ml-auto">
                      <button
                        className="bg-gray-300 px-3 py-1 rounded-xl"
                        onClick={() => handleDelete(message.id)}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-gray-300 px-3 py-1 rounded-xl"
                        onClick={onCloseModal}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Modal>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Chat;
