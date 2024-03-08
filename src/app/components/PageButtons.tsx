"use client"
import {UseUpdatePage} from "@/utils";

export const PageButtons = ({currentPage, totalPages}:{currentPage:number, totalPages: number}) => {
    const {updatePage} = UseUpdatePage();
    const lowerNumber = currentPage-1 > 0 ? currentPage-1 :  1;
    const higherNumber = currentPage + 1 < totalPages ? currentPage + 1 : totalPages;

    return <div className={"flex flex-row gap-x-2 h-min"}>
        <button className={"bg-white border-2 p-1"} onClick={() => {
            updatePage(lowerNumber)
        }}>{`<<`}</button>
        <span className={"bg-white border-2 p-1"}>{currentPage}</span>
        <button className={"bg-white border-2 p-1"} onClick={() => {
            updatePage(higherNumber)
        }}>{`>>`}</button>
    </div>
}