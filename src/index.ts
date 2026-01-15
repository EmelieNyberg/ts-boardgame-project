// Second version

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
	isCooperative: boolean;
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
			isCooperative: false,
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
			isCooperative: false,
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
			isCooperative: false,
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
			isCooperative: true,
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
//    SKAPA ETT KORT
// =======================

games.forEach((gameItem) => {

	// Skapa article som håller allt i kortet
	const article = document.createElement("article");
	article.classList.add("card", "grid", "gap-s");

	// Produkt bild
	const img = document.createElement("img");
	img.classList.add("cover-img");
	img.src = gameItem.game.publication.coverImage ?? "https://cdn.dribbble.com/userupload/20492562/file/original-eb6386e74bffac7624ca8ef3c9015f2b.jpg?resize=400x0";
	img.alt = `Omslag till ${gameItem.game.title}`;

	// Titel
	const title = document.createElement("h3");
	title.textContent = gameItem.game.title;

	// Pris
	const priceEl = document.createElement("p");
	priceEl.textContent = `${gameItem.price} kr`;

	// Lagerstatus
	const stockEl = document.createElement("p");
	stockEl.classList.add("stock-status");

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
	}

	// Texten efter pricken
	const stockText = document.createTextNode(gameItem.stock);

	// Montera: ● I lager
	stockEl.append(stockDot, stockText);


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


	const addToCartButton = document.createElement("button");
	addToCartButton.classList.add("cart-btn");

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
	article.append(img, title, priceEl, stockEl, featuresList, addToCartButton);

	// Montera allt i main som finns i html.
	gameListContainer.append(article);
});