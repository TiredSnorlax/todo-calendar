export interface ITheme {
	primary: string;
	secondary: string;
	bg: string;
	id: string;
}

export const themes: ITheme[] = [
	{ primary: 'transparent', secondary: 'transparent', bg: 'transparent', id: '-1' },
	{
		primary: 'rgb(188, 108, 37)',
		secondary: 'rgb(96, 108, 56)',
		bg: 'rgb(254, 250, 224)',
		id: '0'
	},
	{
		primary: 'rgb(29, 53, 87)',
		secondary: 'rgb(230, 57, 70)',
		bg: 'rgb(168, 218, 220)',
		id: '1'
	},
	{
		primary: 'rgb(212, 163, 115)',
		secondary: 'rgb(204, 213, 174)',
		bg: 'rgb(254, 250, 224)',
		id: '2'
	},
	{ primary: 'orange', secondary: 'red', bg: 'rgb(255, 224, 158)', id: '3' },
	{
		primary: 'rgb(92, 171, 255)',
		secondary: 'rgb(221, 154, 252)',
		bg: 'rgb(255, 184, 238)',
		id: '4'
	},
	{
		primary: 'rgb(0, 116, 212)',
		secondary: 'rgb(255, 51, 51)',
		bg: 'rgb(179, 255, 204)',
		id: '5'
	},
	{
		primary: 'rgb(201, 128, 73)',
		secondary: 'rgb(214, 204, 194)',
		bg: 'rgb(237, 237, 233)',
		id: '6'
	},
	{
		primary: 'rgb(52, 78, 65)',
		secondary: 'rgb(163, 177, 138)',
		bg: 'rgb(88, 129, 87)',
		id: '7'
	},
	{
		primary: 'rgb(163, 163, 255)',
		secondary: 'rgb(187, 101, 252)',
		bg: 'rgb(255, 212, 239)',
		id: '8'
	},
];
