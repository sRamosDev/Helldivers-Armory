import {useDrop} from "react-dnd";
import {LoadoutItem} from "../types/loadout";
import {useLoadoutStore} from "../stores/loadoutStore";

interface TrashProps {
    className?: string;
}

export const TrashDropZone = ({ className }: TrashProps) => {
    const {removeItemFromSlot} = useLoadoutStore();
    const [{isOver}, drop] = useDrop(() => ({
        accept: "loadout-item",
        drop: (item: LoadoutItem) => removeItemFromSlot(item.category),
        collect: (monitor) => ({isOver: monitor.isOver()}),
    }));

    return (<div className="fixed bottom-4 right-4 p-5">
        <div
            ref={drop}
            className={`${className} fixed bottom-4 right-4 p-8 rounded-full transition-all
        ${isOver ? "bg-red-500 scale-125" : "bg-red-600"} 
        shadow-lg hover:shadow-red-500/30 cursor-pointer `}
        >
            🗑️
        </div></div>
    );
};