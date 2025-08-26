import { type UseFormRegister, type FieldError } from "react-hook-form"
type InputProps = {
    id:string,
    label:string,
    placeholder:string,
    type?:string
    register: UseFormRegister<any> ,
    error?: FieldError
}
function Input({id,label,placeholder, type='text', register,error}:InputProps){
    return(
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-brand-50 mb-1">{label}</label>
            <input type={type} id={id} placeholder={placeholder} {...register(id)} className={`w-full border border-solid px-4 py-2 rounded-md bg-white text-brand-950 placeholder:brand-300 focus:outline-none focus:ring-2 transition-colors duration-200
                ${error ?
                `border-red-500 focus:border-red-500 focus:ring-red-200`:
                `border-brand-300 focus:border-brand-500 focus:ring-brand-200`
                }
                `} />
                {error && (
        <p className="text-red-600 text-xs mt-1">{"*" + error?.message}</p>
      )}
        </div>
    )
}

export default Input