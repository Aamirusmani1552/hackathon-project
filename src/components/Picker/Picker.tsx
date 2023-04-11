import Image from "next/image";
import React, { FC, ReactElement } from "react";
import PickerImage from "public/picture-placeholder-663241b1d5d22ee9abbe41bf9dd724df.png";

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  inputImageLabel: string;
};

const Picker: FC<Props> = (props): ReactElement => {
  return (
    <label htmlFor="pickup" className={props.inputImageLabel}>
      <Image src={PickerImage} alt="picker" width={100} />
      <input
        type={"file"}
        id="pickup"
        name="pickup"
        className={"hidden"}
        onChange={(e) => {
          if (e.target.files) {
            props.setFile(e.target.files[0]);
          }
        }}
      />
      <div>Click to select File</div>
    </label>
  );
};

export default Picker;
