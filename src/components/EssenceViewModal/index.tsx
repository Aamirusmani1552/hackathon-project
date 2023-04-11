import { parseIPFSUrl } from "@/helpers/helpers";
import gsap from "gsap";
import Image from "next/image";
import React, { FC, ReactElement, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import cyberconnect from "../../../public/Cyberconnect.png";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  nftImage: string;
};

const ViewEssenceModal: FC<Props> = ({ setOpen, nftImage }): ReactElement => {
  useEffect(() => {
    gsap.fromTo(
      "#modalSection",
      { y: 1000, duration: 0.2 },
      { y: 0, duration: 0.2 }
    );
  }, []);

  return (
    <section
      id="modalSection"
      className=" w-full h-screen fixed px-10 py-4 flex-col  flex items-center justify-center bg-[#ffffff] z-30"
    >
      {" "}
      <div
        className="text-darkBlack bg-white max-w-[800px] flex items-center justify-end w-full  px-2 py-1 text-2xl font-bold "
        onClick={() => setOpen(false)}
      >
        <span className="px-2 py-1 border-2 rounded-lg mb-4">
          <IoIosArrowDown />
        </span>
      </div>
      <div className="w-[100%] md:w-[90%] max-w-[800px] custom-grid-item flex items-center  rounded-xl bg-gray-800  justify-center relative h-full">
        <Image
          src={parseIPFSUrl(nftImage)!}
          alt="post"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
};

export default ViewEssenceModal;
