// 5:th version

import type { BoardGameListing, StockStatus } from "./models/BoardGame.js";
import { getBoardGameListing } from "./services/BoardGameService.js";
import { renderGames } from "./components/GameList.js";

const games: BoardGameListing[] = getBoardGameListing();


// =======================
//    HÄMTA CONTAINER
// =======================

const gameListContainer = document.getElementById("game-list") as HTMLElement;
if (!gameListContainer) {
	throw new Error("Hittar inte #game-list"); //Om inte data finns
}

// =======================
//    HÄMTA DOM ELEMENT
// =======================

const openModalBtn = document.querySelector("#open-modal-btn") as HTMLButtonElement;
const dialog = document.querySelector("#form-dialog") as HTMLDialogElement;
const closeModalBtn = document.querySelector("#close-modal-btn") as HTMLButtonElement;
const addNewGameForm = document.querySelector("#add-new-game") as HTMLFormElement;

const inputTitle = document.querySelector("#input-title") as HTMLInputElement;
const inputNumbPlayers = document.querySelector("#input-numb-players") as HTMLInputElement;
const inputPlayTime = document.querySelector("#input-play-time") as HTMLInputElement;
const inputAgeRecom = document.querySelector("#input-age-recom") as HTMLInputElement;
const inputPublisher = document.querySelector("#input-publisher") as HTMLInputElement;
const inputReleaseYear = document.querySelector("#input-release-year") as HTMLInputElement;
const selectStock = document.querySelector("#select-stock") as HTMLSelectElement;
const inputPrice = document.querySelector("#input-price") as HTMLInputElement;


// =======================
//    RULLA UT SPELEN
// =======================

renderGames("game-list", games);


// =======================
//    EVENT LISTENERS
// =======================

// Klick-event för att lägga i varukorgen
if (gameListContainer) {
	gameListContainer.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;

		// vi vill bara reagera om man klickar på en .cart-btn (eller något inuti den)
		const button = target.closest(".cart-btn") as HTMLButtonElement | null;
		if (!button) return;

		// om knappen är disabled (Slut i lager), gör inget.
		if (button.disabled) return;

		//Från HTML så är gameId en string (måste var det i html), men jag gör om till
		//Number eftersom game.id från interface är nummer. Om gameId saknas så stoppas programmet
		const gameId = Number(button.dataset.gameId);
		if (Number.isNaN(gameId)) return;

		//Hitta spelet vars id är samma som id:t på knappen jag klickade på.
		//Om det inte är en match, avsluta programmet.
		const gameItem = games.find((item) => item.game.id === gameId);
		if (!gameItem) return;

		console.log(`Du köpte ${gameItem.game.title}!`);
	});
};

// Om någon klickar på + knappen, öppna modalen
openModalBtn.addEventListener("click", () => {
	dialog.showModal();
});

// Om någon klickar på stäng knappen i modalen
closeModalBtn.addEventListener("click", () => {
	dialog.close();
});

// Spara ett nytt spel
addNewGameForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const title = inputTitle.value;
	const players = inputNumbPlayers.value;
	const playTime = Number(inputPlayTime.value);
	const minAge = Number(inputAgeRecom.value);
	const publisher = inputPublisher.value;
	const releaseYear = Number(inputReleaseYear.value);
	const stock = selectStock.value as StockStatus;
	const price = Number(inputPrice.value);

	const [minString, maxString] = players.split("-");
	const min = Number(minString);
	const max = Number(maxString);

	// Text till användaren om denna lägger in på fel sätt
	if (isNaN(min) || isNaN(max)) {
		alert("Ange antal spelare som t.ex. 2-5");
		return;
	}

	// Detta ska läggas till i games array.
	const newGame: BoardGameListing = {
		game: {
			id: Date.now(),
			title: title,
			minPlayers: min,
			maxPlayers: max,
			playTime: playTime, ageRecommendation: minAge,
			publication: {
				publisher: publisher,
				releaseYear: releaseYear
			}
		},
		stock: stock,
		price: price
	};

	// Lägg till det nya spelet
	games.push(newGame);
	renderGames("game-list", games);

	// Stäng modalen
	dialog.close();
	// Ta bort alla som är skrivet i formuläret
	addNewGameForm.reset();
});