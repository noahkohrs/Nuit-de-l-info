import { Wallpaper } from "./wallpaper.js";
import { Histoire } from "./types.js";

console.log("🚁");

window.onload = async () => {
    
    let wpDiv = <HTMLDivElement>document.querySelector(".wallpaper");
    if (!wpDiv) throw "Merci de ne pas détruire le HTML";

    const wall = new Wallpaper(wpDiv);
    
    wall.ajouteBG("Chapitre 1", "/img/Vagues_sous_la_nuit.svg", "/img/Soirée_étoile.svg", "/img/Vagues_sous_la_nuit.svg");
    wall.loadBG("Chapitre 1");

    // @ts-ignore
    window.wall = wall;
    const histoire = new Histoire();
    
    console.log(histoire.get_fact())
    
}