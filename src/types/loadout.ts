export type LoadoutItem = {
    id: string;
    name: string;
    type: 'primary' | 'secondary' | 'throwable' | 'armor' | 'helmet' | 'cape';
    image?: string;
}

export type LoadoutSlot = {
    type: LoadoutItem['type'];
    item: LoadoutItem | null;
}