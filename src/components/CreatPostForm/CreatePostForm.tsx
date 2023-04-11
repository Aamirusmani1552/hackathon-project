import useCreateEssence from "../../hooks/useCreateEssence";
import { MediaRenderer } from "@thirdweb-dev/react";
import React, { FC, ReactElement, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { MediaType } from "@/hooks/enums";

type Props = {
  image: string;
  isPaid: boolean;
  setIsPaid: React.Dispatch<React.SetStateAction<boolean>>;
  file: File;
};

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

const CreatePostForm: FC<Props> = ({
  image,
  isPaid,
  setIsPaid,
  file,
}): ReactElement => {
  const [formData, setFromData] = useState<FormData>({
    description: "",
    title: "",
    totalSupply: undefined,
    amount: undefined,
    content: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createEssence = useCreateEssence();

  function handleFormDataChange(name: string, value: string | number) {
    setFromData((prev) => ({ ...prev, [name]: value }));
  }

  console.log(formData);
  async function handleCreate() {
    setIsLoading(true);

    await createEssence({
      content: formData.content,
      description: formData.description,
      paid: isPaid,
      title: formData.title,
      amount: formData.amount,
      collectSupply: formData.totalSupply,
      nftFile: file,
      appID: "example_1552",
      vedio_ipfs_uri: "",
    });

    setIsLoading(false);
  }

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

      {/* preview Image */}
      <div className="">
        <MediaRenderer src={image} controls={true} />
      </div>

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
        {isLoading && (
          <span className="animate-spin">
            <ImSpinner8 />
          </span>
        )}
        Create
      </button>
    </div>
  );
};

export default CreatePostForm;
