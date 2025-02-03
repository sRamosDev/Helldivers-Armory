import { create } from 'zustand';
import { LoadoutItem, LoadoutSlot } from '../types/loadout';

type LoadoutState = {
    slots: LoadoutSlot[];
    availableItems: LoadoutItem[];
    addItemToSlot: (item: LoadoutItem, slotType: LoadoutItem['type']) => void;
    removeItemFromSlot: (slotType: LoadoutItem['type']) => void;
    selectedSlot: LoadoutItem['type'] | null;
    setSelectedSlot: (type: LoadoutItem['type'] | null) => void;
    fetchItems: () => Promise<void>;
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
    fetchItems: async () => {
        try {
            const [gearResponse, weaponsResponse] = await Promise.all([
                fetch('http://localhost:3000/api/gear'),
                fetch('http://localhost:3000/api/weapon')
            ]);

            const gear = await gearResponse.json();
            const weapons = await weaponsResponse.json();

            const mappedItems: LoadoutItem[] = [
                ...gear.map((item: any) => ({
                    id: item.id.toString(),
                    name: item.name,
                    type: item.category as LoadoutItem['type']
                })),
                ...weapons.map((item: any) => ({
                    id: item.id.toString(),
                    name: item.name,
                    type: item.category as LoadoutItem['type']
                }))
            ];

            set({ availableItems: mappedItems });
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    }
}));