import React, { ReactElement, FC, useEffect, useState } from "react";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useChainId,
} from "@thirdweb-dev/react";
import { useQuery } from "@apollo/client";
import { ACCOUNTS } from "../../graphql/Accounts";
import { ethers } from "ethers";
import SwitchNetwork from "./_switchNetwork";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import CyberconnectLogo from "public/Cyberconnect.png";
import {
  getAccessToken,
  removeAccessToken,
  removeUser,
  setUser,
} from "@/helpers/helpers";
import LoginToCyberconnect from "./_loginButton";

type Props = {};

const styles = {
  checkingButtonStyles:
    "rounded-md flex gap-2 items-center border-2 cursor-pointer border-lightBlack w-fit justify-center px-4 py-2 bg-white text-black font-semibold ",
  checkingButtonIconStyels: "font-bold animate-spin",
  profileContainer:
    "flex s bg-white text-darkBlack gap-2 items-center font-semibold justify-center border-2 border-lightBlack px-4 py-2 w-fit rounded-md",
  profileImageContainer: "w-8 h-8 rounded-full overflow-hidden relative",
};

const Connect: FC<Props> = ({}): ReactElement => {
  const address = useAddress();
  const chain = useChainId();
  const [isTokenSet, setIsTokenSet] = useState<boolean>(false);
  const { data, loading } = useQuery(ACCOUNTS, {
    variables: { address: address ? address : ethers.constants.AddressZero },
  });
  const profileCount = data?.address?.wallet?.profiles?.totalCount;
  const handle = data?.address?.wallet?.profiles.edges?.[0]?.node?.handle;
  const profileId = data?.address?.wallet?.profiles.edges?.[0]?.node?.profileID;

  useEffect(() => {
    if (
      profileCount &&
      handle &&
      profileCount &&
      profileId &&
      profileCount > 0
    ) {
      setUser({ handle, profileId });
    } else {
      removeUser();
    }
  }, [address, handle, profileCount, profileId]);

  useEffect(() => {
    if (isTokenSet) removeAccessToken();
  }, [address]);

  if (!address) {
    return <ConnectWallet accentColor="white" colorMode="dark" />;
  }

  if (chain !== ChainId.BinanceSmartChainTestnet) {
    return <SwitchNetwork />;
  }

  if (profileCount === 0) {
    return (
      <Link href={"https://testnet.cyberconnect.me/"} target={"_blank"}>
        <div className={styles.checkingButtonStyles}>Create Profile</div>
      </Link>
    );
  }

  if (loading) {
    return (
      <div className={styles.checkingButtonStyles}>
        <span className={styles.checkingButtonIconStyels}>
          <AiOutlineLoading3Quarters />
        </span>
        <span>Checking</span>
      </div>
    );
  }

  if (getAccessToken()?.length === 0) {
    return <LoginToCyberconnect setIsTokenSet={setIsTokenSet} />;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileImageContainer}>
        <Image
          src={CyberconnectLogo}
          alt="cyberconnect"
          style={{ objectFit: "contain" }}
        />
      </div>
      <span>{data?.address?.wallet?.profiles.edges?.[0]?.node?.handle}</span>
    </div>
  );
};

export default Connect;
