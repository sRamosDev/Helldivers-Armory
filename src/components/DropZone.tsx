import {useDrop} from 'react-dnd';
import {LoadoutItem, LoadoutSlot} from '../types/loadout';
import {useLoadoutStore} from '../stores/loadoutStore';
import {DraggableItem} from "./DraggableItem.tsx";

export const DropZone = ({slot}: { slot: LoadoutSlot }) => {
    const {addItemToSlot, selectedSlot, setSelectedSlot} = useLoadoutStore();

    const [{canDrop}, drop] = useDrop(() => ({
        accept: 'loadout-item',
        drop: (item: LoadoutItem) => {
            addItemToSlot(item, slot.category);
            setSelectedSlot(null);
        },
        canDrop: (item: LoadoutItem) => item.category === slot.category,
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));

    const handleSlotClick = () => {
        if (!slot.item) {
            setSelectedSlot(slot.category === selectedSlot ? null : slot.category);
        }
    };

    return (
        <div
            ref={drop}
            onClick={handleSlotClick}
            className={`p-4 border-2 rounded-lg transition-all
        ${canDrop ? "border-yellow-500 bg-yellow-900/20" : "border-gray-700"}
        ${slot.item ? "bg-gray-800" : "bg-gray-900"}
        ${!slot.item && selectedSlot === slot.category ? "ring-2 ring-blue-500" : ""}
        min-h-[100px] flex items-center justify-center`}
        >
            {slot.item ? (
                <DraggableItem item={slot.item}/>
            ) : (
                <span className="text-gray-500">{slot.category.toUpperCase()}</span>
            )}
        </div>
    );
};