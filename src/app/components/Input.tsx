type InputType = "text" | "number" | "password" | "email" | "file" | "submit" | "tel";
interface InputProps {
    name: string;
    id?: string;
    placeholder?: string;
    errors?: string[];
    type?: InputType;
    defaultValue?: string | number | undefined;
    label?: string;
    [key: string]: any;
}

export default function Input({name, placeholder, label, errors, type, defaultValue, id, onChange}: InputProps) {
        if(!id) id = name;
        if(!label) label = placeholder;
    return (
        <div className={"flex flex-col mb-4"}>
            <label htmlFor={id}
                   className="mb-1 text-xs sm:text-sm tracking-wide text-white">
                {placeholder}
            </label>
            <div className="relative">
                <input id={id}
                       name={name}
                       type={type}
                       placeholder={placeholder}
                       defaultValue={defaultValue}
                       value={type === "submit" ? defaultValue : undefined}
                       onChange={onChange}
                       className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 px-2"/>

                <p className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors?.map((error, index) => <span key={index}>{error}</span>)}
                </p>
            </div>
        </div>
    )
}