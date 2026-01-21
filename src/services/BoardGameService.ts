// =======================
//    DATA
// =======================

import type { BoardGameListing } from "../models/BoardGame.js";

const games: BoardGameListing[] = [
	{
		game: {
			id: 1,
			title: "Catan",
			minPlayers: 3,
			maxPlayers: 4,
			playTime: 90,
			ageRecommendation: 10,
			publication: {
				publisher: "Kosmos",
				releaseYear: 1995,
				coverImage:
					"https://www.spelexperten.com/bilder/artiklar/zoom/LPFI402_1.jpg?m=1751878829",
			},
		},
		stock: "I lager",
		price: 399,
	},
	{
		game: {
			id: 2,
			title: "Terraforming Mars",
			minPlayers: 1,
			maxPlayers: 5,
			playTime: 120,
			ageRecommendation: 12,
			publication: {
				publisher: "FryxGames",
				releaseYear: 2016,
			},
		},
		stock: "Fåtal kvar",
		price: 699,
	},
	{
		game: {
			id: 3,
			title: "Wingspan",
			minPlayers: 1,
			maxPlayers: 5,
			playTime: 70,
			ageRecommendation: 10,
			publication: {
				publisher: "Stonemaier Games",
				releaseYear: 2019,
				coverImage:
					"https://www.spelexperten.com/bilder/artiklar/zoom/STM910SE_1.jpg?m=1637219328",
			},
		},
		stock: "I lager",
		price: 599,
	},
	{
		game: {
			id: 4,
			title: "Mysterium",
			minPlayers: 2,
			maxPlayers: 7,
			playTime: 45,
			ageRecommendation: 10,
			publication: {
				publisher: "Libellud",
				releaseYear: 2015,
				coverImage:
					"https://www.spelexperten.com/bilder/artiklar/zoom/AMDMYST01_1.jpg?m=1755251255",
			},
		},
		stock: "Slut",
		price: 449,
	},
];

// Exporterar som funktion så inte vi förändrar grund arrayn.
export const getBoardGameListing = (): BoardGameListing[] => {
	return [...games];
};