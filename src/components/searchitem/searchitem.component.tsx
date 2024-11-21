import Page from "@/types/page/page.type";
import Link from "next/link";

interface SearchBarItemProps {
    page: Page,
}

const SearchBarItem = ({ page }: SearchBarItemProps) => {
    return (
        <li className={`px-2 w-full flex flex-col text-foregroundopacity80`}>
        <Link className="cursor-pointer hover:bg-foregroundopacity20 rounded-md transition-all flex gap-2 items-center text-md p-3" href={page.link}>{page.icon}{page.label}</Link>
        {page.subPages && page.subPages.length > 0 && (
            <ul className="flex flex-col">
                {page.subPages.map((subPage, index) => (
                    <li key={index} className="pl-4 flex gap-2 text-md justify-start">
                        <span className="w-[2px] h-full bg-foregroundopacity20 relative"></span>
                        <Link className="cursor-pointer hover:bg-foregroundopacity20 rounded-sm transition-all flex gap-2 p-2 items-center" href={subPage.link}>{subPage.icon}{subPage.label}</Link>
                    </li>
                ))}
            </ul>
        )}
    </li>
    );
};

export default SearchBarItem;