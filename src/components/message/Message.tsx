import React, { useMemo, useState } from "react";
import { MessageProps } from "../../lib/types";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Avatar from "./Avatar";
import Body from "./Body";
import { sendRequest } from "../../lib/helper";

const Message: React.FC<MessageProps> = ({ message, getMessages }) => {
  const [open, setOpen] = useState<boolean>(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleDelete = async (id: string) => {
    try {
      await sendRequest(`/messages/${id}`, "DELETE");
      getMessages();
      onCloseModal();
    } catch (error) {
      console.error(error);
      onCloseModal();
    }
  };

  const MemoizedModal = () => {
    const memoizedModal = useMemo(
      () => (
        <Modal
          open={open}
          onClose={onCloseModal}
          center
          classNames={{ modal: "customModal" }}
          showCloseIcon={false}
        >
          <div className="flex flex-col gap-8">
            <h2 className="w-full">
              Are you sure you want to delete the message?
            </h2>
            <div className="flex gap-4 ml-auto">
              <button
                className="px-3 py-1 bg-inherit rounded-xl border border-[#ffffff20]"
                onClick={() => handleDelete(message.id)}
              >
                Yes
              </button>
              <button
                className="px-3 py-1 border border-[#ffffff20] bg-inherit rounded-xl"
                onClick={onCloseModal}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ),
      [open, onCloseModal, handleDelete, message.id]
    );

    return memoizedModal;
  };

  return (
    <>
      <li className=" max-w-[85%] flex gap-3 relative">
        <Avatar userId={message.userId} />
        <Body message={message} openModal={onOpenModal} />
      </li>
      <MemoizedModal />
    </>
  );
};

export default Message;
