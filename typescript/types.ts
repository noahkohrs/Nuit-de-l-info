class Histoire {
    objets: objet[];
    chapitres: chapitre[];
    heros: personnage;

    constructor(heros: personnage, chapitres: chapitre[], objets: objet[]){
        heros.index_branche = 0;
        heros.index_dernier_checkpoint = 0;
        
        this.heros = heros;
        this.chapitres = chapitres;
        this.objets = objets;
    };

    get_chapitre(id: number): chapitre {
        return this.chapitres.filter(e => id==e.id)[0];
    }

    chapitre_suivant(reponse: number): chapitre {
        /** Retourne le chapitre suivant en fonction du choix de l'utilisateur */
        const chap_actuel: chapitre = this.get_chapitre(this.heros.branches_visitees[this.heros.index_branche]);

        const id_chap_suivant: number = chap_actuel.reponses[reponse].chapitre_destination;
        const new_chap: chapitre = this.get_chapitre(id_chap_suivant);

        //MAJ donnees personnage.
        this.heros.branches_visitees.push(id_chap_suivant);
        this.heros.index_branche++;

        if(new_chap.checkpoint) this.heros.index_dernier_checkpoint = this.heros.index_branche;

        return new_chap;
    };
    
    chapitre_precedent(): chapitre {
        /** Retourne le chapitre precedent par rapport a la position actuelle de l'utilisateur */
        this.heros.index_branche--;
        return this.get_chapitre(this.heros.index_branche);
    }; // Retourne l'id du chapitre precedent

}

type personnage = {
    inventaire: objet[];
    nom: string;
    niveau_alcool: number;
    branches_visitees: number[]; // id des branches visites dans l'ordre de visite.
    index_branche: number;
    index_dernier_checkpoint: number; // position du dernier chapitre checkpoint dans branches_visitees.
    temps_parcours: number; // Temps de parcours depuis le debut de la game.
}

type objet = {
    nom: string;
    description: string;
    url: string;
    quantite: number;
};

type reponse = {
    texte: string;
    min_alcool: number; // Pour etre affiche
    max_alcool: number; // Pour etre affiche
    objets_requis: objet[]; // Pour l'afficher
    chapitre_destination: number; // id du chapitre
};

type chapitre = {
    id: number;
    titre: string;
    description: string;
    heure: string;
    background_url: string;
    checkpoint: boolean;
    reponses: reponse[];
};