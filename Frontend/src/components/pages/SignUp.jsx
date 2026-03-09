import { Check, Lock, Mail, User } from "lucide-react";
import signupDesktop from "../../assets/signup-desktop.png";
import appleIcon from "../../assets/apple-icon.png";
import googleIcon from "../../assets/google-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { useState } from "react";
import { auth_api } from "@/api/auth.api";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await auth_api.post("/register", {
        fullname,
        email,
        password,
      });
      // console.log(response.data);
      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      // console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#1251A6] to-[#062949] flex sm:flex-row flex-col items-center justify-center text-white">
      <div className="w-full sm:w-[50%] px-4 3xs:px-6 2xs:px-12 xs:px-18 sm:px-56 text-center space-y-6">
        <div className="bg-white mx-auto w-fit p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
          <Check size={30} className="text-[#08315A]" />
        </div>
        <div className="text-start space-y-2">
          <h2 className="text-4xl">
            Welcome to <span className="headingFont">DO IT</span>
          </h2>
          <p className="text-xl">Create an account and Join us now!</p>
        </div>
        <div className="flex items-center border rounded-md bg-white px-3 py-2 space-x-2">
          <User className="text-black" />
          <input
            type="text"
            placeholder="Full Name"
            className="outline-none text-black tracking-wider"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="flex items-center border rounded-md bg-white px-3 py-2 space-x-2">
          <Mail className="text-black" />
          <input
            type="email"
            placeholder="E-mail"
            className="outline-none text-black tracking-wider"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center border rounded-md bg-white px-3 py-2 space-x-2">
          <Lock className="text-black" />
          <input
            type="password"
            placeholder="Password"
            className="outline-none text-black tracking-wider"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} text={"Sign Up"} />
        <p className="flex items-center justify-center gap-2">
          Already have an account?
          <Button to="/login" text={"Sign In"} variant="ghost" />
        </p>
        <div className="flex items-center gap-6">
          <p>Sign Up with :</p>
          <Link to="/" className="bg-white p-2 rounded-md">
            <img src={appleIcon} alt="" className="h-8" />
          </Link>
          <Link to="/" className="bg-white p-2 rounded-md">
            <img src={googleIcon} alt="" className="h-8" />
          </Link>
        </div>
      </div>
      <div className="hidden sm:block sm:w-[50%]">
        <img src={signupDesktop} alt="" className="rounded-lg" />
      </div>
    </div>
  );
};
