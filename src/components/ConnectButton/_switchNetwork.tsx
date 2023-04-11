import { useNetwork } from "@thirdweb-dev/react";
import React, { FC, ReactElement, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdSwap } from "react-icons/io";
import { ChainId } from "@thirdweb-dev/sdk";

const styles = {
  switchButtonStyles:
    "bg-[#262627] rounded-md flex gap-2 items-center justify-center px-4 py-2 disabled:opacity-50 text-white font-semibold ",
  switchButtonIconStyels: "font-bold animate-spin",
};

const SwitchNetwork: FC = (): ReactElement => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [, switchNetwork] = useNetwork();

  return (
    <div>
      {" "}
      <button
        className={styles.switchButtonStyles}
        disabled={isFetching}
        onClick={async () => {
          setIsFetching(true);
          await switchNetwork?.(ChainId.BinanceSmartChainTestnet);
          setIsFetching(false);
        }}
      >
        {isFetching ? (
          <div className={styles.switchButtonIconStyels}>
            <AiOutlineLoading3Quarters />
          </div>
        ) : (
          <IoMdSwap />
        )}

        <span>Switch Network</span>
      </button>
    </div>
  );
};

export default SwitchNetwork;
