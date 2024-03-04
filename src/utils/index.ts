import {useDebouncedCallback} from "use-debounce";
import {useSearchParams, usePathname, useRouter} from "next/navigation";


export const errorHandling = (err: unknown) => {
    if(err instanceof Error){
        return {
            errors: {
                _form: [err.message]
            }
        }
    }else{
        return{
            errors:{
                _form: ["Unknown error"]
            }
        };
    }
}

export const UseSearch = () => {
    "use client";

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((e) => {
        const input = e.target as HTMLInputElement;

        const {name, value} = input;
        const params = new URLSearchParams(searchParams);
        if(value)
            params.set(name, value);
        else
            params.delete(name);

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return {handleSearch, searchParams};
}

