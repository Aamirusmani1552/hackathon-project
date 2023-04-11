import Image from "next/image";
import React, { FC, ReactElement, useEffect, useState } from "react";
import ExampleImage from "public/boredApe.png";
import {
  Essence,
  VerifyEssenceMetadataInput,
} from "@/Types/__generated__/graphql";
import axios from "axios";
import CyberConnectImage from "../../../public/Cyberconnect.png";
import { BiFolderPlus } from "react-icons/bi";
import useCollectEssence from "@/hooks/useCollectEssence";
import { useRouter } from "next/router";
import { parseIPFSUrl } from "@/helpers/helpers";
import { BsImages } from "react-icons/bs";
import Link from "next/link";

type Props = { data: Essence };

const EssenceCard: FC<Props> = ({ data }): ReactElement => {
  const [metadata, setMetadata] = useState<VerifyEssenceMetadataInput>();
  const collectEssence = useCollectEssence();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      console.log("this is in data token", data);
      const nft = await axios.get(parseIPFSUrl(data.tokenURI)!);
      setMetadata(nft.data);
    }
    fetchData();
  }, []);

  function goToSeePost() {
    router.push(
      {
        pathname: `/view/${data.essenceID}`,
        query: {
          data: JSON.stringify(data),
          metadata: JSON.stringify(metadata),
        },
      },
      `/view/${data.essenceID}`
    );
  }

  function handleNavigation() {
    router.push(
      {
        pathname: `/profile/${data.createdBy.owner.address}`,
        query: {
          address: data.createdBy.owner.address,
          handle: data.createdBy.handle,
        },
      },
      `/profile/${data.createdBy.owner.address}`
    );
  }

  return (
    <div className="custom-grid-item group   relative flex flex-col gap-2 select-none cursor-pointer">
      <div
        className="relative h-full overflow-hidden rounded-xl group-hover:shadow-inner "
        onClick={goToSeePost}
      >
        {metadata && (
          <Image
            src={parseIPFSUrl(metadata?.image)!}
            alt="essence"
            fill
            style={{ objectFit: "cover" }}
            draggable={false}
          />
        )}

        <div className="w-full h-full text-8xl flex flex-col items-center justify-center text-primaryYellow">
          <BsImages />
        </div>
      </div>

      {/* details */}
      <div className="flex  gap-2 items-center " onClick={handleNavigation}>
        <div className="relative w-8 h-8 block  rounded-full overflow-hidden">
          <Image
            src={CyberConnectImage}
            alt="essence"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <span className="font-semibold text-darkBlack text-sm ">
          {data.createdBy.handle}
        </span>
      </div>

      <div className="absolute top-0 h-14 group-hover:flex  hidden px-2 items-center justify-end w-full text-white font-bold ">
        <button
          onClick={(e) => {
            e.preventDefault();
            collectEssence(data.essenceID.toString());
          }}
          className=" text-3xl bg-primaryGreen p-1 rounded-md"
        >
          <BiFolderPlus />
        </button>
      </div>
    </div>
  );
};

export default EssenceCard;
