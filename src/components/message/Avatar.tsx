import React from "react";
import { MessageAvatarProps } from "../../lib/types";

const Avatar: React.FC<MessageAvatarProps> = ({ userId }) => {
  return (
    <div className="h-[28px] w-[28px]  bg-gray-500/50 rounded-[50%] flex items-center justify-center font-bold text-white">
      {userId?.[0]?.toUpperCase()}
    </div>
  );
};

export default React.memo(Avatar);
