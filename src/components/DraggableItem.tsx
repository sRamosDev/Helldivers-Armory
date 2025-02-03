import {useDrag} from 'react-dnd';
import {LoadoutItem} from '../types/loadout';
import {useLoadoutStore} from "../stores/loadoutStore.ts";

export const DraggableItem = ({item}: { item: LoadoutItem }) => {
    const {removeItemFromSlot} = useLoadoutStore();
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'loadout-item',
        item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));


    return (
        <div
            ref={drag}
            className={`group flex items-center justify-between p-4 mb-2 bg-gray-800 rounded-lg h-16
                ${isDragging ? "opacity-50 cursor-grabbing" : "opacity-100 cursor-move"}
                transition-all hover:bg-gray-700 overflow-hidden`}
        >
            <div className="relative flex-1 min-w-0">
                <span className="inline-block whitespace-nowrap group-hover:animate-scroll-text">
                    {item.name}
                </span>
            </div>
            {/* Only show remove button in slots */}
            {item.type !== "primary" && item.type !== "secondary" && item.type !== "throwable" && item.type !== "armor" && item.type !== "helmet" && item.type !== "cape" && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeItemFromSlot(item.type);
                    }}
                    className="text-red-400 hover:text-red-300 ml-2"
                >
                    ×
                </button>
            )}
        </div>
    );
};