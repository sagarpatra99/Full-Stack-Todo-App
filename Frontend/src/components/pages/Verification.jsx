import verifyIcon from "../../assets/verify.png";
import { Button } from "../common/Button";

export const Verification = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-b from-[#1251A6] to-[#062949] text-white">
      <div className="w-[50%] px-48 text-center">
        <h2 className="text-4xl pb-10">Verify account</h2>
        <div className="p-10 rounded-xl bg-linear-to-b from-[#5277A6] to-[#284664]">
          <h2 className="headingFont text-4xl">DO IT</h2>
          <p className="py-8">
            By verifying your account, your data will be secured and be default
            you are accepting our terms and policies
          </p>
          <input type="text" className="mb-6 py-2 px-5 w-full outline-none rounded-md tracking-wider bg-white text-black placeholder-gray-400" placeholder="Verification code" />
          <Button to="/home" text={"Verify"} className="tracking-wider font-semibold" />
        </div>
      </div>
      <div className="w-[50%] pl-40">
        <img src={verifyIcon} alt="" srcset="" />
      </div>
    </div>
  );
};
