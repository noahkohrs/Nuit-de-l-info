export class Histoire {
    heros: personnage;

    constructor(private chapitres: chapitre[], private facts: string[], private desc_fin: string[]){

        this.heros = {
            branches_visitees: [0],
            index_branche: 0,
            index_dernier_checkpoint: 0,
            niveau_alcool: 0,
            max_alcool: 3,
            temps_parcours: 0,
            inventaire: []
        }

    };

    get_chapitre(id: number): chapitre {
        return this.chapitres.filter(e => id==e.id)[0];
    }

    get_avancee(): number {
        return Math.round((this.heros.index_branche/this.chapitres.length)*100);
    }

    get_alcool(): number {
        return this.heros.niveau_alcool;
    }

    est_fin(): boolean {
        return this.get_chapitre(this.heros.branches_visitees[this.heros.index_branche]).reponses.length == 0;
    }

    incremente_alcool(gramme: number): void {
        this.heros.niveau_alcool += gramme;
        if(this.heros.niveau_alcool < 0) this.heros.niveau_alcool = 0;
        if(this.heros.niveau_alcool > this.heros.max_alcool) this.heros.niveau_alcool = this.heros.max_alcool;
    }

    chapitre_suivant(reponse: number): chapitre {
        /** Retourne le chapitre suivant en fonction du choix de l'utilisateur */
        const chap_actuel: chapitre = this.get_chapitre(this.heros.branches_visitees[this.heros.index_branche]);

        const rep = chap_actuel.reponses[reponse];
        const id_chap_suivant: number = rep.chapitre_destination;
        const new_chap: chapitre = this.get_chapitre(id_chap_suivant);

        this.incremente_alcool(-0.1); // Redescente de l'alcool.

        //MAJ donnees personnage.
        this.heros.index_branche++;
        this.heros.branches_visitees[this.heros.index_branche]=id_chap_suivant;
        if(new_chap.checkpoint) this.heros.index_dernier_checkpoint = this.heros.index_branche;
        if(rep.augmente_alcool) this.incremente_alcool(0.25);

        return new_chap;
    };
    
    chapitre_precedent(): chapitre {
        /** Retourne le chapitre precedent par rapport a la position actuelle de l'utilisateur */
        this.heros.index_branche--;
        this.incremente_alcool(0.1);
        return this.get_chapitre(this.heros.index_branche);
    }; // Retourne l'id du chapitre precedent

    get_fact(): string {
        return this.facts[Math.round(Math.random()*this.facts.length)][0];
    }

    get_texte_fin(): string {
        return this.facts[0][0];
    }

}

export type personnage = {
    inventaire: objet[];
    niveau_alcool: number;
    max_alcool: number;
    branches_visitees: number[]; // id des branches visites dans l'ordre de visite.
    index_branche: number;
    index_dernier_checkpoint: number; // position du dernier chapitre checkpoint dans branches_visitees.
    temps_parcours: number; // Temps de parcours depuis le debut de la game.
}

export type objet = {
    nom: string;
    description: string;
    url: string;
    quantite: number;
};

type reponse = {
    texte: string;
    min_alcool: number; // Pour etre affiche
    max_alcool: number; // Pour etre affiche
    objets_requis?: objet[]; // Pour l'afficher
    chapitre_destination: number; // id du chapitre
    augmente_alcool: boolean; // True : augmente le taux d'alcool
};

export type chapitre = {
    id: number;
    titre: string;
    description: string;
    heure: string;
    nom_background: string;
    nom_image: string;
    checkpoint: boolean;
    reponses: reponse[];
};