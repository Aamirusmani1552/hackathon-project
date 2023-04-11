import React, { FC, ReactElement } from "react";

type Props = {};

const SubscribeButton: FC<Props> = (props: Props): ReactElement => {
  return (
    <button
      className="px-4 py-2 bg-primaryPink text-white font-semibold rounded-md cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      Subscribe
    </button>
  );
};

export default SubscribeButton;
