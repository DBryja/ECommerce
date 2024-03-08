import {useDebouncedCallback} from "use-debounce";
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";


export const errorHandling = (err: unknown) => {
    console.log(err);
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

export const UseUpdatePage = () =>{
    "use client";

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const updatePage = (value: number) => {
        console.log(value);
        const params = new URLSearchParams(searchParams);
        params.set("page", value.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    return {updatePage};
}

export const itemsInCart = (cookies : RequestCookie[]) => {
    return cookies.filter(obj => obj.name.startsWith('item_'));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};
