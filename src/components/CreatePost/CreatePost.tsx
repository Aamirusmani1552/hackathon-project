import useCreateEssence from "@/hooks/useCreateEssence";
import Link from "next/link";
import React, { FC, ReactElement, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

type Props = {};

const CreatePost: FC<Props> = (props): ReactElement => {
  const createEssence = useCreateEssence();
  const [file, setFile] = useState<File>();

  return (
    <Link href={"/Create"} className={"fixed bottom-8 z-10 right-8"}>
      <div className="w-14 h-14 cursor-pointer flex  bg-darkBlack text-lightBlack text-2xl items-center justify-center rounded-full">
        <BsPlusLg />
      </div>
    </Link>
  );
};

export default CreatePost;
