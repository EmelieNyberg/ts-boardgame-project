// 3:rd version

// =======================
//    Interfaces/Typer
// =======================

type StockStatus = "I lager" | "Fåtal kvar" | "Slut";

interface BoardGame {
	id: number;
	title: string;
	minPlayers: number;
	maxPlayers: number;
	playTime: number;
	ageRecommendation: number;
	publication: PublisherDetails;
};

interface PublisherDetails {
	publisher: string;
	releaseYear: number;
	coverImage?: string;
};

interface BoardGameListing {
	game: BoardGame;
	stock: StockStatus;
	price: number;
};

// =======================
//    DATA
// =======================

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

// =======================
//    HÄMTA CONTAINER
// =======================

const gameListContainer = document.getElementById("game-list") as HTMLElement;
if (!gameListContainer) {
	throw new Error("Hittar inte #game-list"); //Om inte data finns
}

// =======================
//    SKAPA KORT
// =======================

function renderGames() {
	// Kör bara om gameListContainer finns
	if (gameListContainer) {
		// Tömmer listan
		gameListContainer.replaceChildren();
	}
	games.forEach((gameItem) => {

		// Fallback bild om det inte finns något från datan
		const FALLBACK_COVER = "https://cdn.dribbble.com/userupload/20492562/file/original-eb6386e74bffac7624ca8ef3c9015f2b.jpg?resize=400x0";

		// Skapa article som håller allt i kortet
		const article = document.createElement("article");
		article.classList.add("card", "grid", "gap-s");

		// Produkt bild
		const img = document.createElement("img");
		img.classList.add("cover-img");
		img.src = gameItem.game.publication.coverImage ?? FALLBACK_COVER;
		img.alt = `Omslag till ${gameItem.game.title}`;

		// Titel
		const title = document.createElement("h3");
		title.textContent = gameItem.game.title;

		// Pris
		const price = document.createElement("p");
		price.textContent = `${gameItem.price} kr`;

		// Lagerstatus
		const stock = document.createElement("p");
		stock.classList.add("stock-status");

		// Skapa tom span (pricken)
		const stockDot = document.createElement("span");
		stockDot.classList.add("stock-dot");

		// Lägg klass baserat på lagerstatus
		if (gameItem.stock === "I lager") {
			stockDot.classList.add("in-stock");
		} else if (gameItem.stock === "Fåtal kvar") {
			stockDot.classList.add("low-stock");
		} else {
			stockDot.classList.add("out-of-stock");
		};

		// Texten efter pricken
		const stockText = document.createTextNode(gameItem.stock);

		// Montera: ● I lager
		stock.append(stockDot, stockText);


		// UL med klasser + aria-label
		const featuresList = document.createElement("ul");
		featuresList.classList.add("grid", "grid-columns-three", "gap-xs");
		featuresList.setAttribute("aria-label", "Egenskaper");

		// LI 1: players + data-type="players"
		const playersLi = document.createElement("li");
		playersLi.dataset.type = "players";
		playersLi.textContent = `${gameItem.game.minPlayers}–${gameItem.game.maxPlayers} Spelare`;

		// LI 2: playtime + data-type="playtime"
		const playtimeLi = document.createElement("li");
		playtimeLi.dataset.type = "playtime";
		playtimeLi.textContent = `${gameItem.game.playTime} Min`;

		// LI 3: age + data-type="age"
		const ageLi = document.createElement("li");
		ageLi.dataset.type = "age";
		ageLi.textContent = `${gameItem.game.ageRecommendation}+ År`;

		// Montera li i ul
		featuresList.append(playersLi, playtimeLi, ageLi);

		// Köp-knapp
		const addToCartButton = document.createElement("button");
		addToCartButton.classList.add("cart-btn");

		// Om varan är slut disable button, annars lägg i varukorg
		if (gameItem.stock === "Slut") {
			addToCartButton.textContent = "Slut i lager";
			addToCartButton.disabled = true;
		} else {
			addToCartButton.textContent = "Lägg till i varukorgen";

			// Klick-event
			addToCartButton.addEventListener("click", () => {
				console.log(`Du köpte ${gameItem.game.title}!`);
			});
		};

		// Montera allt i article
		article.append(img, title, price, stock, featuresList, addToCartButton);

		// Montera allt i main som finns i html.
		gameListContainer.append(article);
	});

};

renderGames();

// =======================
//    MODAL FÖR ATT
//    SKAPA NYA KORT
// =======================

// Variabler för alla input element
const openModalBtn = document.querySelector("#open-modal-btn") as HTMLButtonElement;
const dialog = document.querySelector("#form-dialog") as HTMLDialogElement;
const closeModalBtn = document.querySelector("#close-modal-btn") as HTMLButtonElement;
const addNewGameBtn = document.querySelector("#add-new-game") as HTMLFormElement;
const inputTitle = document.querySelector("#input-title") as HTMLInputElement;
const inputNumbPlayers = document.querySelector("#input-numb-players") as HTMLInputElement;
const inputPlayTime = document.querySelector("#input-play-time") as HTMLInputElement;
const inputAgeRecom = document.querySelector("#input-age-recom") as HTMLInputElement;
const inputPublisher = document.querySelector("#input-publisher") as HTMLInputElement;
const inputReleaseYear = document.querySelector("#input-release-year") as HTMLInputElement;
const selectStock = document.querySelector("#select-stock") as HTMLSelectElement;
const inputPrice = document.querySelector("#input-price") as HTMLInputElement;

// Om någon klickar på + knappen, öppna modalen
openModalBtn.addEventListener("click", () => {
	dialog.showModal();
});

// Om någon klickar på stäng knappen i modalen
closeModalBtn.addEventListener("click", () => {
	dialog.close();
});

// Spara ett nytt spel
addNewGameBtn.addEventListener("submit", (e) => {
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

	// Detta ska läggas till i i games array.
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

	games.push(newGame);
	renderGames();
	dialog.close();
	addNewGameBtn.reset();
});