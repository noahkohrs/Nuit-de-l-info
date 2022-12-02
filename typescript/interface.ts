import { images } from "./images.js";
import { chapitre, Histoire } from "./types.js";

export class Interface {

    // Barre en haut
    private heureDiv: HTMLDivElement;
    private progressDiv: HTMLDivElement;
    private titreDiv: HTMLDivElement;
    // Pied
    private pied: HTMLDivElement;
    private infoTitre: HTMLDivElement;
    private infoTexte: HTMLDivElement;
    private infoBtn:   HTMLButtonElement;
    // Contenu
    private content: Contenu;
    private conteneur: HTMLDivElement;

    constructor (private wrapper: HTMLDivElement, public H: Histoire) {
        this.heureDiv = wrapper.querySelector(".heure")
        this.progressDiv = wrapper.querySelector(".progress-bar")
        this.titreDiv = wrapper.querySelector(".chapitre")
        this.pied = wrapper.querySelector('.informations')
        this.infoBtn = this.pied.querySelector(".bInfo")
        this.infoTitre = this.pied.querySelector("p")
        this.infoTexte = this.pied.querySelector(".texte")
        this.conteneur = wrapper.querySelector(".encoreunwrap")
        let chap = H.get_premier_chapitre();
        this.content = new Contenu(chap, this);
        this.heureDiv.innerText = chap.heure;

        this.affiche();
        this.infoBtn.onclick = () => wrapper.classList.toggle("info");
    }

    /**
     * Met à jour l'interface
     */
    affiche () {
        this.conteneur.append(this.content.elem);
        this.wrapper.classList.toggle("info", false);
        let fact = this.H.get_fact();
        this.infoTitre.innerText = `En savoir plus sur ${fact[0]}:`;
        this.infoTexte.innerText = fact[1];
        this.progressDiv.style.setProperty("--progress", this.H.get_avancee() + "%")
    }

    /**
     * Méthode représentant le clic sur un bouton
     * @param n Numéro du bouton
     */
    click (n: number) {
        this.content.rm();
        let chap = this.H.chapitre_suivant(n);
        setTimeout(() => {
            this.content = new Contenu(chap, this);
            this.heureDiv.innerText = chap.heure;
            this.affiche();
        }, 600)
    }

}

class Contenu {

    public elem: HTMLDivElement = document.createElement("div");
    public ss: HTMLDivElement;
    
    constructor (private C: chapitre, I: Interface, jeu?: Minijeu) {

        this.elem.className = "toutprendre"
        this.elem.innerHTML = `
        <div class="story-teller">
            <div class="wi">
                <img class="image-story" src="${images[C.nom_image]}">
            </div>
            
            <div class="text-story">
                <p>
                    ${C.description.replace(/\\n/g, "<br/>")}
                </p>
            </div>
        </div>
        
        <div class="sous-wrapper">
            ${jeu ? "" : C.reponses.map(r => {
                let grammage = I.H.get_alcool();
                if (r.min_alcool < grammage && r.max_alcool <= grammage) return;
                return `<button class="option">${r.texte}</button>`
            })}
        </div>
        `;

        this.elem.querySelectorAll(".option").forEach((btn: HTMLButtonElement, i: number) => {
            btn.onclick = () => I.click(i);
        });

        this.ss = this.elem.querySelector(".sous-wrapper");

        if (jeu) this.ss.appendChild(jeu.elem);

    }

    /**
     * Supprime le panneau
     */
    rm () {
        this.elem.classList.toggle("out", true);
        setTimeout(() => this.elem.remove(), 600);
    }

}

class Minijeu {

    public elem: HTMLDivElement;

}

