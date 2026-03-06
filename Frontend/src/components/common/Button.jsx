import { Link } from "react-router-dom";

export const Button = ({
  to="",
  text,
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
}) => {
  const base = "duration-300 py-2 rounded-md text-center";

  const variants = {
    primary: "bg-[#0EA5E9] hover:bg-[#0f92cf] text-white",
    ghost: "bg-transparentd text-sky-500",
    outline: "border border-sky-500 text-sky-500 hover:bg-sky-50",
    danger: "bg-white text-red-600 font-semibold flex justify-center gap-4",
  };

  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  const finalClass = `${base} ${variants[variant]} ${disabledStyle} ${className}`;
  const content = children || text;

  return (
    <Link to={to}>
      <div className={finalClass} onClick={onClick}>
        {content}
      </div>
    </Link>
  );
};
