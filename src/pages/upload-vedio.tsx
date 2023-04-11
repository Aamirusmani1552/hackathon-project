import CreatePostForm from "@/components/CreatPostForm/CreatePostForm";
import UploadVedioForm from "@/components/CreatVedioForm";
import Header from "@/components/Header/Header";
import Image from "next/image";
import React, { FC, ReactElement, useEffect, useState } from "react";

type Props = {};

const styles = {
  main: "w-full min-h-screen flex flex-col",
  section: "md:px-20 px-2 w-full h-full flex-1 flex",
  form: "w-full flex flex-col gap-4 items-center flex-1 justify-center py-10",
  inputImageLabel:
    "min-w-[300px] w-full text-lightWhite flex items-center flex-col font-semibold justify-center h-[400px] border-2 border-lightBlack rounded-md border-dashed",
};

const UploadVedio: FC<Props> = (props): ReactElement => {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.section}>
        <div className={styles.form}>
          <UploadVedioForm />
        </div>
      </section>
    </main>
  );
};

export default UploadVedio;
