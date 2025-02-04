import {useDrag} from 'react-dnd';
import {LoadoutItem} from '../types/loadout';
import {useLoadoutStore} from "../stores/loadoutStore.ts";
import { AzureImage } from './AzureImage';

export const DraggableItem = ({ item }: { item: LoadoutItem }) => {
    const { removeItemFromSlot } = useLoadoutStore();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'loadout-item',
        item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`group flex flex-col items-center p-3 mb-2 bg-gray-800 object-contain rounded-lg
        ${isDragging ? "opacity-50 cursor-grabbing" : "opacity-100 cursor-move"}
        transition-all hover:bg-gray-700 overflow-hidden min-h-[100px]`}
        >
            <AzureImage imageUrl={item.image_url} className="flex-shrink-0" />
            <div className="w-full flex items-center justify-between">
                <div className="relative flex-1 min-w-0 text-center">
          <span className="inline-block whitespace-nowrap group-hover:animate-scroll-text text-sm">
            {item.name}
          </span>
                </div>
                {!['primary', 'secondary', 'throwable', 'armor', 'helmet', 'cape'].includes(item.category) && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            removeItemFromSlot(item.category);
                        }}
                        className="text-red-400 hover:text-red-300 ml-2 text-lg"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};