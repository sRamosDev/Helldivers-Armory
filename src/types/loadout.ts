export type Weapon = {
    id: string;
    name: string;
    description: string;
    type: string;
    damage: number;
    capacity: number;
    recoil: number;
    fire_rate: number;
    image_url: string;
    category: 'primary' | 'secondary' | 'spacial';
    max_penetration: 'Light' | 'Medium' | 'Heavy';
};

export type Gear = {
    id: string;
    name: string;
    description: string;
    type: 'Light' | 'Medium' | 'Heavy';
    armor_rating: number;
    speed: number;
    stamina_regen: number;
    image_url: string;
    category: 'helmet' | 'armor' | 'cape';
};

export type Throwable = {
    id: string;
    name: string;
    description: string;
    damage: number;
    penetration: number;
    outer_radius: number;
    fuse_time: number;
    image_url: string;
    category: 'throwable';
};

export type LoadoutItem = Weapon | Gear | Throwable;
export type LoadoutSlot = {
    category: LoadoutItem['category'];
    item: LoadoutItem | null;
};