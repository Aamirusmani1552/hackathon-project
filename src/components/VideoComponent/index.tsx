import React, { FC, ReactElement } from "react";
import Image from "next/image";
import example from "../../../public/boredApe.png";
import cyberconnect from "../../../public/Cyberconnect.png";

type Props = {
  title?: string;
  poster?: string;
  description?: string;
};

const VideoComponent: FC<Props> = (props): ReactElement => {
  const {
    title = "This is title",
    poster = example,
    description = "This is description",
  } = props;

  return (
    <div className="custom-grid-item flex flex-col gap-2">
      <div className=" border-2 relative aspect-video rounded-lg">
        <Image src={poster} alt="video" fill style={{ objectFit: "contain" }} />
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-[40px] h-[40px] rounded-full relative overflow-hidden">
          <Image
            src={cyberconnect}
            alt="video"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="text-sm font-semibold">
          <p className=" text-darkBlack ">{title}</p>
          <p className="truncate text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
