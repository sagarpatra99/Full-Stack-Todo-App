import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputField({
  icon,
  type = "text",
  placeholder,
  onChange,
  eyeIcon = false,
}) {
  const Icon = icon;
  const [showPass, setShowPass] = useState(false);
  const inputType = eyeIcon && type === "password" && showPass ? "text" : type;
  const inputPlaceholder = showPass ? "Show password" : placeholder;
  return (
    <>
      <div className="flex items-center border rounded-md bg-white px-3 py-2 space-x-2">
        <Icon className="text-black" />
        <input
          type={inputType}
          placeholder={inputPlaceholder}
          className="outline-none text-black tracking-wider w-full"
          onChange={onChange}
        />
        {eyeIcon && (
          <div onClick={() => setShowPass(!showPass)} className="mr-1">
            {showPass ? (
              <Eye className="text-gray-500 cursor-pointer" />
            ) : (
              <EyeOff className="text-gray-500 cursor-pointer" />
            )}
          </div>
        )}
      </div>
    </>
  );
}
