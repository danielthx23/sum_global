import { ReactNode } from "react";

interface FilterAsideProps<T> {
    filters: ReactNode[]; 
    filtersApply: (list: T[]) => T[]; 
    arrayToFilter: T[]; 
    setFilteredArray: (newArray: T[]) => void;
}

const FilterAside = <T,>({
    filters,
    filtersApply,
    arrayToFilter,
    setFilteredArray
}: FilterAsideProps<T>) => {
    
    const handleApplyFilters = () => {
        const filteredList = filtersApply(arrayToFilter);
        setFilteredArray(filteredList);
    };

    return (
        <aside className="z-[1] h-screen p-1 flex flex-col gap-8 w-full bg-backgroundlight backdrop-blur-md">
            <span className="w-full h-full absolute blur-[100px] z-0 bg-gradient-to-tr from-gradientcolor via-backgroundopacity80 to-transparent"></span>
            <div className="z-[2] flex flex-col gap-4 backgroundlight p-8 rounded-md h-full">
                <h2 className="text-xl text-foreground  w-full text-center underline">Filters</h2>
                <div className="flex flex-col gap-4 w-full">
                    {filters.map((filter, index) => (
                        <div key={index}>{filter}</div>
                    ))}
                </div>
                <button onClick={handleApplyFilters} className="backgroundlight text-foreground p-2 rounded-md hover:bg-foreground hover:text-background ransition-all ease-in-out">Apply Filters</button>
            </div>
        </aside>
    );
};

export default FilterAside;