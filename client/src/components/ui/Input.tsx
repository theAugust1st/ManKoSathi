import { useState } from "react";
import { type UseFormRegister, type FieldError } from "react-hook-form";
type InputProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  bgColor?: string;
  disabled?: boolean;
};
function Input({
  id,
  label,
  placeholder,
  type = "text",
  bgColor,
  register,
  error,
  disabled,
}: InputProps) {
  //     return(
  //         <div className="w-full">
  //             <label htmlFor={id} className={`block text-sm font-medium ${bgColor === "white"?"":'text-brand-50'}mb-1`}>{label}</label>
  //             <input type={type} id={id} placeholder={placeholder} {...register(id)} className={`w-full border border-solid px-4 py-2 rounded-md bg-white text-brand-950 placeholder:brand-300 focus:outline-none focus:ring-2 transition-colors duration-200
  //                 ${error ?
  //                 `border-red-500 focus:border-red-500 focus:ring-red-200`:
  //                 `border-brand-300 focus:border-brand-500 focus:ring-brand-200`
  //                 }
  //                 `} />
  //                 {error && (
  //         <p className="text-red-600 text-xs mt-1">{"*" + error?.message}</p>
  //       )}
  //         </div>
  //     )
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? isShowPassword
      ? "text"
      : "password"
    : type;
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`block text-xs md:text-sm font-medium ${
          bgColor ? "" : "text-white"
        } mb-1`}
      >
        {label}
      </label>
      <input
        type={inputType}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        {...register(id)}
        className={`w-full border border-solid text-sm md:text-base px-4 py-2 rounded-md bg-white text-brand-950 placeholder:brand-300 focus:outline-none focus:ring-2 transition-colors duration-200
                ${
                  error
                    ? `border-red-500 focus:border-red-500 focus:ring-red-200`
                    : `border-brand-300 focus:border-brand-500 focus:ring-brand-200`
                }
                `}
      />
      {isPasswordField && (
        <div className="flex items-center p-1 gap-2">
          <span
            onClick={() => setIsShowPassword((prev) => !prev)}
            className="text-white cursor-pointer text-2xl"
          >
            {isShowPassword ? "🙈" : "👁️"}
          </span>
          <p className="text-brand-50 text-xs">{isShowPassword ? "hide password": "show password"}</p>
        </div>
      )}
      {error && (
        <p className="text-red-600 text-xs mt-1">{"*" + error?.message}</p>
      )}
    </div>
  );
}

export default Input;
