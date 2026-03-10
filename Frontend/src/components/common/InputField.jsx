import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputField({
  legend,
  type = "text",
  name,
  placeholder,
  onChange,
  eyeIcon = false,
}) {
  const [showPass, setShowPass] = useState(false);
  const inputType = eyeIcon && type === "password" && showPass ? "text" : type;
  const inputPlaceholder = showPass ? "Show password" : placeholder
  return (
    <>
      <fieldset className="border-2 border-gray-300 pl-4 w-full rounded-lg flex pr-4">
        <legend className="px-2 text-[#6C25FF] font-semibold required">
          {legend}
        </legend>
        <input
          type={inputType}
          name={name}
          placeholder={inputPlaceholder}
          className="outline-none mb-2 w-full pl-1"
          onChange={onChange}
        />
        {eyeIcon && (
          <div onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <Eye className="text-gray-500 cursor-pointer" />
            ) : (
              <EyeOff className="text-gray-500 cursor-pointer ml-2" />
            )}
          </div>
        )}
      </fieldset>
    </>
  );
}
