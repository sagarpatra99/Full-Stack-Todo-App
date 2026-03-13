import { Check, Lock, Mail, User } from "lucide-react";
import signupDesktop from "../../assets/signup-desktop.png";
import appleIcon from "../../assets/apple-icon.png";
import googleIcon from "../../assets/google-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { useState } from "react";
import { auth_api } from "@/api/auth.api";
import { toast } from "sonner";
import InputField from "../common/InputField";

export const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newErrors = {};
    if (!fullname) newErrors.fullname = "Fullname is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await auth_api.post("/register", {
        fullname,
        email,
        password,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#1251A6] to-[#062949] flex sm:flex-row flex-col items-center justify-center text-white">
      <div className="w-full sm:w-[50%] px-4 3xs:px-6 2xs:px-12 xs:px-18 sm:px-56 text-center space-y-6">
        <div className="bg-white mx-auto w-fit p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
          <Check size={30} className="text-[#08315A]" />
        </div>
        <div className="text-start space-y-2">
          <h2 className="3xs:text-2xl 2xs:text-3xl sm:text-4xl">
            Welcome to <span className="headingFont">DO IT</span>
          </h2>
          <p className="text-sm 3xs:text-base 2xs:text-lg sm:text-xl">Create an account and Join us now!</p>
        </div>
        {errors.fullname && (
          <p className="text-red-500 text-sm text-start mb-1">
            {errors.fullname}
          </p>
        )}
        <InputField
          icon={User}
          type="text"
          placeholder={"Enter full name"}
          onChange={(e) => {
            setFullname(e.target.value);
            setErrors((prev) => ({ ...prev, fullname: "" }));
          }}
        />
        {errors.email && (
          <p className="text-red-500 text-sm text-start mb-1">{errors.email}</p>
        )}
        <InputField
          icon={Mail}
          type="email"
          placeholder={"Enter email address"}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
        />
        {errors.password && (
          <p className="text-red-500 text-sm text-start mb-1">
            {errors.password}
          </p>
        )}
        <InputField
          icon={Lock}
          type="password"
          placeholder={"Enter password"}
          eyeIcon
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        <Button
          onClick={handleSubmit}
          text={`${loading ? "Signing Up" : "Sign Up"}`}
        />
        <div className="flex items-center justify-center gap-2">
          Already have an account?
          <Button to="/login" text={"Sign In"} variant="ghost" />
        </div>
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
