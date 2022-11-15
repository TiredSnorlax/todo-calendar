import type { ITheme } from '$lib/Layout/Theme';
import type { IDate } from './Date';

export interface IUserSettings {
	themeID: string;
	additionalThemes: Array<ITheme>;
}

export interface IUser {
	username: string;
	password: string;
	settings: IUserSettings;
	id: string;

	dates?: IDate[];
}
