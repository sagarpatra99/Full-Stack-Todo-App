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
    <div className="min-h-screen w-full bg-linear-to-b from-[#1251A6] to-[#062949] flex flex-col sm:flex-row items-center justify-center text-white px-4 sm:px-0">

      {/* Form Section */}
      <div className="w-full sm:w-[55%] lg:w-[60%] max-w-xl px-4 sm:px-10 lg:px-20 py-10 sm:py-16 text-center space-y-5">

        <div className="bg-white mx-auto w-fit p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
          <Check size={28} className="text-[#08315A]" />
        </div>

        <div className="text-left space-y-2">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-semibold">
            Welcome Back to <span className="headingFont">DO IT</span>
          </h2>

          <p className="text-sm xs:text-base sm:text-lg text-gray-200">
            Have another productive day!
          </p>
        </div>

        {errors.email && (
          <p className="text-red-400 text-sm text-left">
            {errors.email}
          </p>
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
            <p className="text-red-400 text-sm text-left">
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

          <div className="text-right mt-1">
            <Button
              to="/signup"
              text={"Forgot Password?"}
              className="underline text-sm"
              variant="ghost"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          text={`${loading ? "Signing In..." : "Sign In"}`}
        />

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">
          <span>Don’t have an account?</span>
          <Button to="/signup" text={"Sign Up"} variant="ghost" />
        </div>

        <div className="flex flex-col xs:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
          <p className="text-sm sm:text-base">Sign In with :</p>

          <div className="flex gap-4">
            <Link to="/" className="bg-white p-2 rounded-md hover:scale-105 transition">
              <img src={appleIcon} alt="apple" className="h-7 sm:h-8" />
            </Link>

            <Link to="/" className="bg-white p-2 rounded-md hover:scale-105 transition">
              <img src={googleIcon} alt="google" className="h-7 sm:h-8" />
            </Link>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden sm:flex sm:w-[45%] lg:w-[40%] items-center justify-center p-6">
        <img
          src={loginDesktop}
          alt="login"
          className="w-full max-w-md lg:max-w-lg rounded-lg"
        />
      </div>
    </div>
  );
};