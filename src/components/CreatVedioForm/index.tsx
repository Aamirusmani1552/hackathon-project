import useCreateEssence from "../../hooks/useCreateEssence";
import { MediaRenderer, useAddress } from "@thirdweb-dev/react";
import React, { FC, ReactElement, useState, useEffect } from "react";
import { ImSpinner8 } from "react-icons/im";
import { MediaType } from "@/hooks/enums";
import videoImage from "../../../public/—Pngtree—computer play video education abstract_4971774.png";
import Image from "next/image";
import posterSelectImage from "../../../public/picture-placeholder-663241b1d5d22ee9abbe41bf9dd724df.png";
import useLivePeer from "@/hooks/useLivePeer";
import { CgSandClock } from "react-icons/cg";
import { useAsset } from "@livepeer/react";

type Props = {};

interface FormData {
  title: string;
  description: string;
  amount?: number;
  totalSupply?: number;
  content: string;
}

const styles = {
  previewBox:
    "max-w-[800px] w-full  flex  flex-col items-center justify-center font-semibold  gap-8 rounded-md ",
  inputTextLabel:
    " outline-none text-center max-w-[300px] disabled:opacity-50  w-full px-4 py-2 text-3xl text-darkBlack",
  inputTextAreaLabel: "w-full flex flex-col gap-2 items-center justify-center",
  descriptionLabel:
    "block w-full max-w-[800px] font-semibold text-gray-500 text-lg md:text-base",
  textAreaStyles:
    "border-2  focus:border-primaryYellow  border-lightBlack  rounded-md resize-none w-full px-4 py-2 text-xl  max-w-[800px] overflow-hidden disabled:opacity-50",
  createPostButton:
    "bg-primaryPurple flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md cursor-pointer text-xl disabled:cursor-not-allowed",
  amountInput: "text-xl w-full px-4 py-2 h-full",
};

const UploadvideoForm: FC<Props> = (): ReactElement => {
  const [video, setvideo] = useState<File>();
  const [posterImage, setPosterImage] = useState<File>();
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [poster, setPoster] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFromData] = useState<FormData>({
    description: "",
    title: "",
    totalSupply: undefined,
    amount: undefined,
    content: "",
  });

  const address = useAddress();

  const createEssence = useCreateEssence();
  const {
    uploadVideo,
    uploadProgress,
    updateStatus,
    updatedAsset,
    uploadStatus,
    cid,
  } = useLivePeer({
    video: video!,
  });

  function handleFormDataChange(name: string, value: string | number) {
    setFromData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreate() {
    if (!video) return;
    setIsLoading(true);

    await uploadVideo();
  }

  useEffect(() => {
    if (cid.length <= 0) {
      return;
    }

    async function createAsset() {
      console.log("creating asset");
      await createEssence({
        content: formData.content,
        description: formData.description,
        paid: isPaid,
        title: formData.title,
        amount: formData.amount,
        collectSupply: formData.totalSupply,
        nftFile: posterImage,
        appID: `example_1552+${address}`,
        vedio_ipfs_uri: cid,
      });
    }
    if (isLoading) createAsset();
    setIsLoading(false);
  }, [cid]);

  async function handleChange() {
    if (typeof window != "undefined") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result as string);
      };
      reader.readAsDataURL(posterImage!);
    }
  }

  useEffect(() => {
    if (posterImage) {
      handleChange();
    }
  }, [posterImage]);

  console.log(cid);

  return (
    <div className={styles.previewBox}>
      {/* title */}
      <label htmlFor="title">
        <input
          type="text"
          name="title"
          id="title"
          className={styles.inputTextLabel}
          placeholder="Give a title"
          value={formData.title}
          onChange={(e) => {
            const { name, value } = e.target;
            handleFormDataChange(name, value as string);
          }}
          disabled={isLoading}
          max={50}
        />
      </label>

      {/* video */}
      <label
        htmlFor="video"
        className="border-dashed px-4 py-2 border-2 max-w-[800px] w-full rounded-md flex items-center justify-center flex-col cursor-pointer "
      >
        <div className="relative w-[250px] h-[250px]">
          <Image
            src={videoImage}
            alt="video-image"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <input
          type="file"
          name="video"
          id="video"
          accept="video/mp4,video/x-m4v,video/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) setvideo(e.target.files[0]);
          }}
          disabled={isLoading}
        />
        {!video && (
          <span className="text-primaryGreen text-sm">Select video File</span>
        )}

        {video && (
          <p className="text-primaryYellow font-semibold text-sm">
            <span className="text-primaryGreen">Selected: </span>
            {video.name}
          </p>
        )}
      </label>

      {/* POSTER */}

      <label
        htmlFor="poster"
        className="border-dashed px-4 py-8 border-2 max-w-[800px] w-full rounded-md flex items-center justify-center flex-col cursor-pointer "
      >
        <div className="relative w-[200px] h-[200px]">
          <Image
            src={poster ? poster : posterSelectImage}
            alt="posterImage"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <input
          type="file"
          name="poster"
          id="poster"
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) setPosterImage(e.target.files[0]);
          }}
          disabled={isLoading}
        />

        {!posterImage && (
          <span className="text-primaryGreen text-sm">Select Poster Image</span>
        )}

        {posterImage && (
          <p className="text-primaryYellow font-semibold text-sm">
            <span className="text-primaryGreen">Selected: </span>
            {posterImage.name}
          </p>
        )}
      </label>

      {/* description */}
      <label htmlFor="description" className={styles.inputTextAreaLabel}>
        <span className={styles.descriptionLabel}>Give a description</span>
        <textarea
          rows={2}
          name="description"
          id="description"
          className={styles.textAreaStyles}
          value={formData.description}
          onChange={(e) => {
            const { name, value } = e.target;
            handleFormDataChange(name, value as string);
          }}
          disabled={isLoading}
        />
      </label>

      {/* If post paid to collect */}
      <label htmlFor="isPaid" className={"flex gap-2 w-full text-gray-500"}>
        <input
          type="checkbox"
          name="isPaid"
          id="isPaid"
          checked={isPaid}
          onChange={() => setIsPaid((prev) => !prev)}
          className={""}
          disabled={isLoading}
        />
        <span>Do you want to make it paid to collect?</span>
      </label>

      {/* amount */}
      {isPaid && (
        <div className="w-full flex gap-2 mb-4">
          <label htmlFor="amount" className="flex-1  border-2 rounded-lg">
            <input
              type="number"
              name="amount"
              id="amount"
              className={styles.amountInput}
              placeholder="Amount (Min 1 BUSD)"
              max={50}
              value={formData.amount}
              onChange={(e) => {
                const { name, value } = e.target;
                handleFormDataChange(name, parseInt(value));
              }}
              disabled={isLoading}
            />
            <span className="text-[14px] text-primaryGreen">
              You will get payment in BUSD
            </span>
          </label>

          {/* collect supply */}
          <label htmlFor="totalSupply" className="flex-1 border-2 rounded-lg">
            <input
              type="number"
              name="totalSupply"
              id="totalSupply"
              className={styles.amountInput}
              placeholder="Supply"
              value={formData.totalSupply}
              onChange={(e) => {
                const { name, value } = e.target;
                handleFormDataChange(name, parseInt(value));
              }}
              disabled={isLoading}
            />
          </label>
        </div>
      )}

      {/* content */}
      <label htmlFor="content" className={styles.inputTextAreaLabel}>
        <span className={styles.descriptionLabel}>Content</span>
        <textarea
          rows={5}
          name="content"
          id="content"
          className={styles.textAreaStyles}
          value={formData.content}
          onChange={(e) => {
            const { name, value } = e.target;
            handleFormDataChange(name, value as string);
          }}
          disabled={isLoading}
        />
      </label>

      <button
        disabled={isLoading}
        className={styles.createPostButton}
        onClick={() => {
          handleCreate();
        }}
      >
        {isLoading && !uploadProgress && (
          <span className="animate-spin">
            <ImSpinner8 />
          </span>
        )}
        {isLoading ? (
          <div className="">
            {uploadStatus != "success"
              ? uploadProgress?.[0].progress
                ? (uploadProgress?.[0].progress * 100).toFixed(1) + "% "
                : "Wait "
              : "success"}
            <span>{uploadProgress?.[0].phase}</span>
          </div>
        ) : cid?.length > 0 && uploadProgress?.[0].progress === 1 ? (
          <span className="flex items-center ">
            <CgSandClock />
            Processing
          </span>
        ) : (
          "Create"
        )}
      </button>
    </div>
  );
};

export default UploadvideoForm;
