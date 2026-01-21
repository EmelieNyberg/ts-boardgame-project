// =======================
//    Interfaces/Typer
// =======================

export type StockStatus = "I lager" | "Fåtal kvar" | "Slut";

export interface BoardGame {
    id: number;
    title: string;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
    ageRecommendation: number;
    publication: PublisherDetails;
};

export interface PublisherDetails {
    publisher: string;
    releaseYear: number;
    coverImage?: string;
};

export interface BoardGameListing {
    game: BoardGame;
    stock: StockStatus;
    price: number;
};