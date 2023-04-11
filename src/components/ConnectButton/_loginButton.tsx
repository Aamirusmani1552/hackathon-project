import useLoginUser from "@/hooks/auth/useLoginUser";
import React, { ReactElement, useState, FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  setIsTokenSet: React.Dispatch<React.SetStateAction<boolean>>;
};
const styles = {
  loginButtonStyles:
    "bg-white rounded-md flex gap-2 items-center disabled:cursor-not-allowed justify-center px-4 py-2 disabled:opacity-50 text-black font-semibold border-2 border-lightBlack",
  loginButtonIconStyels: "font-bold animate-spin",
};

const LoginToCyberconnect: FC<Props> = ({ setIsTokenSet }): ReactElement => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const loginUser = useLoginUser();

  return (
    <>
      <button
        className={styles.loginButtonStyles}
        disabled={loading}
        onClick={async () => {
          setIsLoading(true);
          await loginUser();
          setIsLoading(false);
          setIsTokenSet(true);
        }}
      >
        {loading && (
          <div className={styles.loginButtonIconStyels}>
            <AiOutlineLoading3Quarters />
          </div>
        )}
        <span>Login</span>
      </button>
    </>
  );
};

export default LoginToCyberconnect;
