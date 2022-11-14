import type { IUser } from '$lib/db/Schemas/User';
import { writable } from 'svelte/store';

export const themeID = writable('0');
export const user = writable<IUser | null>(null);
