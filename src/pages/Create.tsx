import Header from "@/components/Header/Header";
import React, { FC, ReactElement, useState, useEffect } from "react";
import Picker from "@/components/Picker/Picker";
import CreatePostForm from "@/components/CreatPostForm/CreatePostForm";

type Props = {};

const styles = {
  main: "w-full mb-10",
  section: "md:px-20 px-2 w-full",
  form: "w-full flex flex-col gap-4 items-center justify-center",
  inputImageLabel:
    "min-w-[300px] w-full text-lightWhite flex items-center flex-col font-semibold justify-center h-[400px] border-2 border-lightBlack rounded-md border-dashed",
};

const Create: FC<Props> = (props): ReactElement => {
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>();
  const [isPaid, setIsPaid] = useState<boolean>(false);

  async function handleChange() {
    if (typeof window != "undefined") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file!);
    }
  }

  useEffect(() => {
    if (file) {
      handleChange();
    }
  }, [file]);

  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.section}>
        <div className={styles.form}>
          {!image ? (
            <Picker
              setFile={setFile}
              inputImageLabel={styles.inputImageLabel}
            />
          ) : (
            <CreatePostForm
              image={image}
              isPaid={isPaid}
              setIsPaid={setIsPaid}
              file={file!}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Create;
