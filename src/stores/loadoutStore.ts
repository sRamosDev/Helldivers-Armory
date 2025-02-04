import {create} from 'zustand';
import {Gear, LoadoutItem, LoadoutSlot, Throwable, Weapon} from '../types/loadout';
import {fetchGear, fetchTrowable, fetchWeapons} from '../api/client';

type LoadoutState = {
    slots: LoadoutSlot[];
    weapons: Weapon[];
    gear: Gear[];
    throwable: Throwable[];
    addItemToSlot: (item: Weapon | Throwable | Gear, slotCategory: LoadoutItem['category']) => void;
    removeItemFromSlot: (slotCategory: LoadoutItem['category']) => void;
    selectedSlot: LoadoutItem['category'] | null;
    setSelectedSlot: (type: LoadoutItem['category'] | null) => void;
    fetchItems: () => Promise<void>;
    clearAllSlots: () => void;
    saveLoadout: (name: string, cfToken: string) => Promise<void>;
};

const initialSlots: LoadoutSlot[] = [
    {category: 'primary', item: null},
    {category: 'secondary', item: null},
    {category: 'throwable', item: null},
    {category: 'armor', item: null},
    {category: 'helmet', item: null},
    {category: 'cape', item: null},
];


export const useLoadoutStore = create<LoadoutState>((set,get) => ({
    slots: initialSlots,
    weapons: [],
    gear: [],
    throwable: [],
    selectedSlot: null,

    setSelectedSlot: (category) => set({selectedSlot: category}),

    clearAllSlots: () => set((state) => ({
        slots: state.slots.map(slot => ({
            ...slot,
            item: null
        }))
    })),

    addItemToSlot: (item, slotCategory) => set((state) => ({
        slots: state.slots.map(slot =>
            slot.category === slotCategory ? {...slot, item} : slot
        )
    })),

    removeItemFromSlot: (slotCategory) => set((state) => ({
        slots: state.slots.map(slot =>
            slot.category === slotCategory ? {...slot, item: null} : slot
        )
    })),

    saveLoadout: async (name: string, cfToken: string) => {
        const state = get();
        const payload = {
            name,
            helmetId: parseInt(state.slots.find(s => s.category === 'helmet')?.item?.id.replace('gear-', '') || '0'),
            armorId: parseInt(state.slots.find(s => s.category === 'armor')?.item?.id.replace('gear-', '') || '0'),
            capeId: parseInt(state.slots.find(s => s.category === 'cape')?.item?.id.replace('gear-', '') || '0'),
            primaryWeaponId: parseInt(state.slots.find(s => s.category === 'primary')?.item?.id.replace('weapon-', '') || '0'),
            secondaryWeaponId: parseInt(state.slots.find(s => s.category === 'secondary')?.item?.id.replace('weapon-', '') || '0'),
            throwableId: parseInt(state.slots.find(s => s.category === 'throwable')?.item?.id.replace('throwable-', '') || '0'),
            cfTurnstileToken: cfToken
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/loadouts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to save loadout');
            }

            return await response.json();
        } catch (error) {
            console.error('Save failed:', error);
            throw error;
        }
    },

    fetchItems: async () => {
        try {
            const [weapons, gear, throwable] = await Promise.all([
                fetchWeapons(),
                fetchGear(),
                fetchTrowable(),
            ]);

            weapons.sort((a, b) => a.name.localeCompare(b.name));
            gear.sort((a, b) => a.name.localeCompare(b.name));
            throwable.sort((a, b) => a.name.localeCompare(b.name));

            set({weapons, gear, throwable});
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    }
}));

