import { Check, Lock, Mail } from "lucide-react";
import loginDesktop from "../../assets/login-desktop.png";
import appleIcon from "../../assets/apple-icon.png";
import googleIcon from "../../assets/google-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { useState } from "react";
import { auth_api } from "@/api/auth.api";
import { toast } from "sonner";
import InputField from "../common/InputField";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await auth_api.post("/login", {
        email,
        password,
      });
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#1251A6] to-[#062949] flex sm:flex-row flex-col items-center justify-center text-white">
      <div className="w-full sm:w-[50%] px-4 3xs:px-6 2xs:px-12 xs:px-18 sm:px-48 bg-purple-400k text-center space-y-6">
        <div className="bg-white mx-auto w-fit p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
          <Check size={30} className="text-[#08315A]" />
        </div>
        <div className="text-start space-y-2">
          <h2 className="3xs:text-2xl xs:text-3xl 2xl:text-4xl">
            Welcome Back to <span className="headingFont">DO IT</span>
          </h2>
          <p className="text-xl 3xs:text-base 2xs:text-lg">
            Have an other productive day !
          </p>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm text-start mb-1">{errors.email}</p>
        )}
        <InputField
          icon={Mail}
          type="email"
          placeholder={"Email address"}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
        />
        <div>
          {errors.password && (
            <p className="text-red-500 text-sm text-start mb-1">
              {errors.password}
            </p>
          )}
          <InputField
            icon={Lock}
            type="password"
            placeholder={"Password"}
            eyeIcon
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          <Button
            to="/signup"
            text={"Forgot Password?"}
            className="text-end underline"
            variant="ghost"
          />
        </div>
        <Button
          onClick={handleSubmit}
          text={`${loading ? "Signing In" : "Sign In"}`}
        />
        <div className="flex items-center justify-center gap-2">
          <span>Don’t have an account?</span>
          <Button to="/signup" text={"Sign Up"} variant="ghost" />
        </div>
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
      <div className="hidden sm:block sm:w-[50%] pl-36">
        <img src={loginDesktop} alt="" className="rounded-lg" />
      </div>
    </div>
  );
};
