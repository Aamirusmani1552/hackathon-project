import React, { useState, FC, ReactElement } from "react";
import Connect from "../ConnectButton/Connect";
import { SlMenu } from "react-icons/sl";
import DropDown from "./_dropDown";
import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";

type Props = {};

const styles = {
  header: "px-4 md:px-8 z-10 py-2 bg-transparent sticky top-0",
  headerNavBox:
    "bg-darkBlack min-h-[72px] text-xl md:text-base px-6 md:px-8 py-4 md:py-2 rounded-xl text-lightBlack font-semibold w-full flex align-center justify-between",
  headerUL: "flex items-center gap-4 h-full",
  headerListItem: "hidden md:block",
  headerHambergerMenuInactive:
    "text-2xl relative md:hidden p-1 rounded-lg border-transparent border-2",
  headerHambergerMenuActive:
    "text-2xl relative md:hidden p-1 rounded-lg border-lightBlack border-2",
  connectButtonStyles: "md:flex items-center justify-center hidden",
};

const Header: FC<Props> = (props): ReactElement => {
  const address = useAddress();
  const [active, setActive] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerNavBox}>
        <nav>
          <ul className={styles.headerUL}>
            <li className="pr-4">ARTGallery</li>
            <li className={styles.headerListItem}>Explore</li>
            <Link href={`/profile/${address}`}>
              <li className={styles.headerListItem}>Account</li>
            </Link>
            <li className={styles.headerListItem}>Contact</li>
          </ul>
        </nav>
        <div className={styles.connectButtonStyles}>
          <Connect />
        </div>
        <div
          className={
            active
              ? styles.headerHambergerMenuActive
              : styles.headerHambergerMenuInactive
          }
        >
          <div onClick={() => setActive((prev) => !prev)}>
            <SlMenu />
          </div>
          <DropDown active={active} />
        </div>
      </div>
    </header>
  );
};

export default Header;
