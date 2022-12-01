declare class Histoire {
    objets: objet[];
    chapitres: chapitre[];
    heros: personnage;
}

declare type personnage = {
    inventaire: objet[];
    nom: string;
    niveau_alcool: number;
    branches_visitees: number[]; // id des branches visites dans l'ordre de visite.
    index_branche: number;
    dernier_checkpoint: number; // position du dernier chapitre checkpoint
    temps_parcours: number; // Temps de parcours depuis le debut de la game.
}

declare type objet = {
    nom: string;
    description: string;
    url: string;
    quantite: number;
};

declare type reponse = {
    texte: string;
    min_alcool: number; // Pour etre affiche
    max_alcool: number; // Pour etre affiche
    objets_requis: objet[]; // Pour l'afficher
    chapitre_destination: number; // id du chapitre
};

declare type chapitre = {
    id: number;
    titre: string;
    description: string;
    heure: string;
    checkpoint: boolean;
    reponses: reponse[];
};