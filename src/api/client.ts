// api/client.ts
import {Gear, Weapon, Throwable} from "../types/loadout.ts";

const API_BASE = 'http://localhost:3000/api';

export const fetchWeapons = async (): Promise<Weapon[]> => {
    const response = await fetch(`${API_BASE}/weapon`);
    const data = await response.json();
    return data.map((weapon: any) => ({
        ...weapon,
        id: `weapon-${weapon.id}`,
        class: 'weapon' as const,
        category: weapon.category.toLowerCase() as Weapon['category']
    }));
};

export const fetchGear = async (): Promise<Gear[]> => {
    const response = await fetch(`${API_BASE}/gear`);
    const data = await response.json();
    return data.map((gear: any) => ({
        ...gear,
        id: `gear-${gear.id}`,
        class: 'gear' as const,
        category: gear.category.toLowerCase() as Gear['category']
    }));
};

export const fetchTrowable = async (): Promise<Throwable[]> => {
    const response = await fetch(`${API_BASE}/throwables`);
    const data = await response.json();
    return data.map((throwable: any) => ({
        ...throwable,
        id: `throwable-${throwable.id}`,
        class: 'throwable' as const,
        category: 'throwable' as Throwable['category']
    }));
};