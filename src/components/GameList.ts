// =======================
//    SKAPA KORT
// =======================

import type { BoardGameListing } from "../models/BoardGame.js";

export const renderGames = (containerId: string, games: BoardGameListing[]) => {
    const container = document.getElementById(containerId);

    // Kör bara om container finns
    if (!container) return;
    // Tömmer listan
    container.replaceChildren();

    games.forEach(({ game, price, stock }) => {

        // Fallback bild om det inte finns något från datan
        const FALLBACK_COVER = "https://cdn.dribbble.com/userupload/20492562/file/original-eb6386e74bffac7624ca8ef3c9015f2b.jpg?resize=400x0";

        // Skapa article som håller allt i kortet
        const article = document.createElement("article");
        article.classList.add("card", "grid", "gap-s");

        // Produkt bild
        const img = document.createElement("img");
        img.classList.add("cover-img");
        img.src = game.publication.coverImage ?? FALLBACK_COVER;
        img.alt = `Omslag till ${game.title}`;

        // Titel
        const title = document.createElement("h3");
        title.textContent = game.title;

        // Pris
        const priceItem = document.createElement("p");
        priceItem.textContent = `${price} kr`;

        // Lagerstatus
        const stockItem = document.createElement("p");
        stockItem.classList.add("stock-status");

        // Skapa tom span (pricken)
        const stockDot = document.createElement("span");
        stockDot.classList.add("stock-dot");

        // Lägg klass baserat på lagerstatus
        if (stock === "I lager") {
            stockDot.classList.add("in-stock");
        } else if (stock === "Fåtal kvar") {
            stockDot.classList.add("low-stock");
        } else {
            stockDot.classList.add("out-of-stock");
        };

        // Texten efter pricken
        const stockText = document.createTextNode(stock);

        // Montera: ● I lager
        stockItem.append(stockDot, stockText);

        // UL med klasser + aria-label
        const featuresList = document.createElement("ul");
        featuresList.classList.add("grid", "grid-columns-three", "gap-xs");
        featuresList.setAttribute("aria-label", "Egenskaper");

        // LI 1: players + data-type="players"
        const playersLi = document.createElement("li");
        playersLi.dataset.type = "players";
        playersLi.textContent = `${game.minPlayers}–${game.maxPlayers} Spelare`;

        // LI 2: playtime + data-type="playtime"
        const playtimeLi = document.createElement("li");
        playtimeLi.dataset.type = "playtime";
        playtimeLi.textContent = `${game.playTime} Min`;

        // LI 3: age + data-type="age"
        const ageLi = document.createElement("li");
        ageLi.dataset.type = "age";
        ageLi.textContent = `${game.ageRecommendation}+ År`;

        // Montera li i ul
        featuresList.append(playersLi, playtimeLi, ageLi);

        // Köp-knapp
        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("cart-btn");
        // gör ett dataset som heter game id som hämtas från datan (id) och görs om till string (enbart string funkar i html)
        addToCartButton.dataset.gameId = String(game.id);

        // Om varan är slut disable button, annars lägg i varukorg
        if (stock === "Slut") {
            addToCartButton.textContent = "Slut i lager";
            addToCartButton.disabled = true;
        } else {
            addToCartButton.textContent = "Lägg till i varukorgen";
        };

        // Montera allt i article
        article.append(img, title, priceItem, stockItem, featuresList, addToCartButton);

        // Montera allt i main som finns i html.
        container.append(article);
    });

};