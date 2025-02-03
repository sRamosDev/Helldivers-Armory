import { create } from 'zustand';
import { LoadoutItem, LoadoutSlot } from '../types/loadout';

type LoadoutState = {
    slots: LoadoutSlot[];
    availableItems: LoadoutItem[];
    addItemToSlot: (item: LoadoutItem, slotType: LoadoutItem['type']) => void;
    removeItemFromSlot: (slotType: LoadoutItem['type']) => void;
    selectedSlot: LoadoutItem['type'] | null;
    setSelectedSlot: (type: LoadoutItem['type'] | null) => void;
}

const initialSlots: LoadoutSlot[] = [
    { type: 'primary', item: null },
    { type: 'secondary', item: null },
    { type: 'throwable', item: null },
    { type: 'armor', item: null },
    { type: 'helmet', item: null },
    { type: 'cape', item: null },
];

const initialItems: LoadoutItem[] = [
    { id: '1', name: 'Liberator', type: 'primary' },
    { id: '2', name: 'Redeemer', type: 'secondary' },
    { id: '3', name: 'Stun Grenade', type: 'throwable' },
    { id: '4', name: 'Heavy Armor', type: 'armor' },
    { id: '5', name: 'Tactical Helmet', type: 'helmet' },
    { id: '6', name: 'Democracy Cape', type: 'cape' },
];

export const useLoadoutStore = create<LoadoutState>((set) => ({
    slots: initialSlots,
    availableItems: initialItems,
    selectedSlot: null,
    setSelectedSlot: (type) => set({ selectedSlot: type }),
    addItemToSlot: (item, slotType) => set((state) => ({
        slots: state.slots.map(slot =>
            slot.type === slotType ? { ...slot, item } : slot
        )
    })),
    removeItemFromSlot: (slotType) => set((state) => ({
        slots: state.slots.map(slot =>
            slot.type === slotType ? { ...slot, item: null } : slot
        )
    })),
}));