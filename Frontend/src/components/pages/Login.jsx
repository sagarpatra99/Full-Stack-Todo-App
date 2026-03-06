import { Check, Lock, Mail, User } from "lucide-react";
import loginDesktop from "../../assets/login-desktop.png";
import appleIcon from "../../assets/apple-icon.png";
import googleIcon from "../../assets/google-icon.png";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";

export const Login = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#1251A6] to-[#062949] flex items-center justify-center text-white">
      <div className="w-[50%] px-48 bg-purple-400k text-center space-y-6">
        <div className="bg-white mx-auto w-fit p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
          <Check size={30} className="text-[#08315A]" />
        </div>
        <div className="text-start space-y-2">
          <h2 className="text-4xl">
            Welcome Back to <span className="headingFont">DO IT</span>
          </h2>
          <p className="text-xl">Have an other productive day !</p>
        </div>
        <div className="flex items-center border rounded-md bg-white px-3 py-2 space-x-2">
          <Mail className="text-black" />
          <input
            type="email"
            placeholder="E-mail"
            className="outline-none text-black tracking-wider"
          />
        </div>
        <div>
          <div className="flex items-center border rounded-md bg-white px-3 py-2 space-x-2">
            <Lock className="text-black" />
            <input
              type="password"
              placeholder="Password"
              className="outline-none text-black tracking-wider"
            />
          </div>
          <Button
            to="/signup"
            text={"Forgot Password?"}
            className="text-end underline"
            variant="ghost"
          />
        </div>
        <Button to="/verification" text={"Sign In"} />
        <p className="flex items-center justify-center gap-2">
          Don’t have an account?
          <Button to="/signup" text={"Sign Up"} variant="ghost" />
        </p>
        <div className="flex items-center gap-6">
          <p>Sign In with :</p>
          <Link to="/" className="bg-white p-2 rounded-md">
            <img src={appleIcon} alt="" className="h-8" />
          </Link>
          <Link to="/" className="bg-white p-2 rounded-md">
            <img src={googleIcon} alt="" className="h-8" />
          </Link>
        </div>
      </div>
      <div className="w-[50%] pl-36">
        <img src={loginDesktop} alt="" className="rounded-lg" />
      </div>
    </div>
  );
};
