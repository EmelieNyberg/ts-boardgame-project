// First version

type Stock = "I lager" | "Fåtal kvar" | "Slut";

interface BoardGame {
	id: number;
	title: string;
	minPlayers: number;
	maxPlayers: number;
	playTime: number; // i minuter
	ageRecommendation: number;
	isCooperative: boolean;
	publication: PublisherDetails;
};

interface PublisherDetails {
	publisher: string;
	releaseYear: number;
	coverImage?: string;
};

const games: BoardGame[] = [
	{
		id: 1,
		title: "Catan",
		minPlayers: 3,
		maxPlayers: 4,
		playTime: 90,
		ageRecommendation: 10,
		isCooperative: false,
		publication: {
			publisher: "Kosmos",
			releaseYear: 1995,
			coverImage: "https://www.spelexperten.com/bilder/artiklar/zoom/LPFI402_1.jpg?m=1751878829"
		}
	},
	{
		id: 2,
		title: "Terraforming Mars",
		minPlayers: 1,
		maxPlayers: 5,
		playTime: 120,
		ageRecommendation: 12,
		isCooperative: false,
		publication: {
			publisher: "FryxGames",
			releaseYear: 2016
		}
	},
	{
		id: 3,
		title: "Wingspan",
		minPlayers: 1,
		maxPlayers: 5,
		playTime: 70,
		ageRecommendation: 10,
		isCooperative: false,
		publication: {
			publisher: "Stonemaier Games",
			releaseYear: 2019,
			coverImage: "https://www.spelexperten.com/bilder/artiklar/zoom/STM910SE_1.jpg?m=1637219328"
		}
	},
	{
		id: 4,
		title: "Mysterium",
		minPlayers: 2,
		maxPlayers: 7,
		playTime: 45,
		ageRecommendation: 10,
		isCooperative: true,
		publication: {
			publisher: "Libellud",
			releaseYear: 2015,
			coverImage: "https://www.spelexperten.com/bilder/artiklar/zoom/AMDMYST01_1.jpg?m=1755251255"
		}
	}
];

const coverImageElement = document.getElementById("cover-img") as HTMLImageElement;
const gameTitleElement = document.getElementById("game-title");
const playersElement = document.getElementById("players");
const playTimeElement = document.getElementById("playtime");
const ageRecommendationElement = document.getElementById("age-recommendation");
const publisherElement = document.getElementById("publisher");
const releaseYearElement =
	document.getElementById("release-year") as HTMLTimeElement;

const currentGame = games[0];

if (coverImageElement) {
	if (currentGame.publication.coverImage) {
		coverImageElement.src = currentGame.publication.coverImage;
	}
};

if (gameTitleElement) {
	gameTitleElement.textContent = currentGame.title;
};

if (playersElement) {
	playersElement.textContent = `${currentGame.minPlayers}-${currentGame.maxPlayers} Spelare`;
};

if (playTimeElement) {
	playTimeElement.textContent = `${currentGame.playTime} Min`;
};

if (ageRecommendationElement) {
	ageRecommendationElement.textContent = `${currentGame.ageRecommendation}+ År`;
};

if (publisherElement) {
	publisherElement.textContent = `Utgivare: ${currentGame.publication.publisher}`;
};

if (releaseYearElement) {
	const year = currentGame.publication.releaseYear.toString();

	releaseYearElement.textContent = year;
	releaseYearElement.setAttribute("datetime", year);
};