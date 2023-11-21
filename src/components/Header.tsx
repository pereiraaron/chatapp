import React from "react";

const Header: React.FC = () => {
  return (
    <div className="relative  z-10 text-left	pr-2.5 pl-[50px] py-2.5  uppercase text-white bg-[#00000033]">
      <h1 className="font-normal text-[10px] m-0 p-0">Aron Pereira</h1>
      <h2 className="font-normal text-[8px] m-0 p-0 tracking-[1px] text-[#ffffff80]">
        aron-p
      </h2>
      <figure className="absolute flex justify-center bg-gray-500/50 font-bold items-center top-2 left-[9px] rounded-[50%] overflow-hidden w-8 h-8 border-2 border-[#ffffff3d]">
        <h1>A</h1>
      </figure>
    </div>
  );
};

export default Header;
