import ListItem from "@/types/listitem/listitem.type";
import { ReactNode } from "react";

interface MainCarouselSlideListProps {
    listItems: ListItem[]
}

const MainCarouselSlideList = ({listItems}: MainCarouselSlideListProps) => {
    return (
        <ul className="flex flex-col gap-4 font-bold">
            {listItems.map((listItem, index) => (
                <li key={index} className="flex gap-2 items-center text-lg">
                    {listItem.icon}
                    <p>{listItem.label}</p>
                </li>
            ))}
        </ul>
    );
}

export default MainCarouselSlideList