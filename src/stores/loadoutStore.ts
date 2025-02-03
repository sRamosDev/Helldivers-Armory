import {create} from 'zustand';
import {LoadoutItem, LoadoutSlot} from '../types/loadout';

type LoadoutState = {
    slots: LoadoutSlot[];
    weapons: LoadoutItem[];
    gear: LoadoutItem[];
    addItemToSlot: (item: LoadoutItem, slotType: LoadoutItem['type']) => void;
    removeItemFromSlot: (slotType: LoadoutItem['type']) => void;
    selectedSlot: LoadoutItem['type'] | null;
    setSelectedSlot: (type: LoadoutItem['type'] | null) => void;
    fetchItems: () => Promise<void>;
}

const initialSlots: LoadoutSlot[] = [
    {type: 'primary', item: null},
    {type: 'secondary', item: null},
    {type: 'throwable', item: null},
    {type: 'armor', item: null},
    {type: 'helmet', item: null},
    {type: 'cape', item: null},
];

export const useLoadoutStore = create<LoadoutState>((set) => ({
    slots: initialSlots,
    selectedSlot: null,
    setSelectedSlot: (type) => set({selectedSlot: type}),
    addItemToSlot: (item, slotType) => set((state) => ({
        slots: state.slots.map(slot =>
            slot.type === slotType ? {...slot, item} : slot
        )
    })),
    removeItemFromSlot: (slotType) => set((state) => ({
        slots: state.slots.map(slot =>
            slot.type === slotType ? {...slot, item: null} : slot
        )
    })),
    weapons: [],
    gear: [],

    fetchItems: async () => {
        try {
            const [gearResponse, weaponsResponse] = await Promise.all([
                fetch('http://localhost:3000/api/gear'),
                fetch('http://localhost:3000/api/weapon')
            ]);

            const gearData = await gearResponse.json();
            const weaponsData = await weaponsResponse.json();

            set({
                weapons: weaponsData.map((item: any) => ({
                    id: `weapon-${item.id}`,
                    name: item.name,
                    type: item.category as LoadoutItem['type'],
                    category: 'weapon'
                })),
                gear: gearData.map((item: any) => ({
                    id: `gear-${item.id}`,
                    name: item.name,
                    type: item.category as LoadoutItem['type'],
                    category: 'gear'
                }))
            });
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    }
}));
