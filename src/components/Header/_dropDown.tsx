import React, { FC, ReactElement } from "react";
import Connect from "../ConnectButton/Connect";

type Props = {
  active: boolean;
};

const styles = {
  dropDownBoxActive:
    "absolute border-2 z-20 border-lightBlack animate-popup right-0 top-[40px] bg-white text-darkBlack max-w-[250px] min-w-[200px] px-2 py-2 text-lg rounded-lg  origin-top-right",
  dropDownBoxInActive:
    "hidden absolute border-2 z-20 border-lightBlack right-0 top-[40px] bg-white text-darkBlack min-w-[200px] max-w-[250px] px-2 py-2 text-lg rounded-lg",
};

const DropDown: FC<Props> = (props): ReactElement => {
  return (
    <nav
      className={
        props.active ? styles.dropDownBoxActive : styles.dropDownBoxInActive
      }
    >
      <ul className="flex flex-col font-semibold gap-2 ">
        <li>
          <Connect />
        </li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default DropDown;
