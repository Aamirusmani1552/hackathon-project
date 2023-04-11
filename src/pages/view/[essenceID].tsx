import Header from "@/components/Header/Header";
import useLike from "@/hooks/useLike";
import {
  Essence,
  VerifyEssenceMetadataInput,
} from "@/Types/__generated__/graphql";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import borderApe from "../../../public/boredApe.png";
import cyberconnectImage from "../../../public/Cyberconnect.png";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { BiFolderPlus } from "react-icons/bi";
import useCollectEssence from "@/hooks/useCollectEssence";
import ViewEssenceModal from "@/components/EssenceViewModal";
import { parseIPFSUrl } from "@/helpers/helpers";
import Link from "next/link";

type Props = {};

const ViewPage: FC<Props> = (props): ReactElement => {
  const router = useRouter();
  const like = useLike();
  const collectEssence = useCollectEssence();
  const [open, setOpen] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement>(null);

  const { data: dataJson, metadata } = router.query;
  const nftMedata: VerifyEssenceMetadataInput = JSON.parse(metadata as string);

  const data: Essence = JSON.parse(dataJson! as string);
  console.log("got this metadata", nftMedata);
  console.log("this is the data", data);

  return (
    <main
      ref={mainRef}
      className="bg-background min-w-full flex flex-col min-h-screen"
    >
      <Header />
      <section className="px-2 py-1 md:px-8 md:py-2 flex-1 items-center  flex flex-col  ">
        {/* essence data */}
        <div className="flex md:flex-row flex-col items-center w-full gap-4 max-w-[800px]">
          {/* image */}
          <div className="relative flex-1 w-[350px]  custom-grid-item cursor-pointer aspect-video ">
            <Image
              src={parseIPFSUrl(nftMedata.image)!}
              style={{ objectFit: "contain" }}
              alt="post"
              fill
              onClick={() => setOpen(true)}
            />
          </div>

          {/* info */}
          <div className="flex flex-col flex-1 w-full md:ml-[16px]  gap-4">
            <span className="font-semibold text-2xl md:text-3xl">
              {nftMedata.name}
            </span>
            <p className="text-gray-500 text-base">{nftMedata.description}</p>
            <Link href={`/profile/${data.createdBy.owner.address}`}>
              <div className="flex items-center gap-2 cursor-pointer w-fit">
                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                  <Image src={cyberconnectImage} alt="cyberconnect" fill />
                </div>
                <span className="flex flex-col font-semibold">
                  <span>{data.createdBy.handle}</span>
                  <span className="text-[12px] font-semibold w-fit bg-primaryPurple text-white px-2 py-1 rounded-md">
                    Creater
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </div>
        {/*  */}

        <div className="flex flex-col  w-full gap-4 max-w-[800px] mt-10">
          {/* buttons */}
          <div className="cursor-pointer text-4xl font-bold flex items-center gap-8">
            <span onClick={() => like(data.contentID)}>
              <AiOutlineHeart />
            </span>
            <span onClick={() => collectEssence(data.essenceID.toString())}>
              <BiFolderPlus />
            </span>
          </div>

          {/* content */}
          <p className="text-xl text-darkBlack">{nftMedata.content}</p>
        </div>
      </section>
      {open && (
        <ViewEssenceModal setOpen={setOpen} nftImage={nftMedata.image} />
      )}
    </main>
  );
};

export default ViewPage;
