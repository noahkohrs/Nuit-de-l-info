import { Wallpaper } from "./wallpaper.js";
import { chapitre, Histoire } from "./types.js";

console.log("🚁");

window.onload = async () => {
    
    let wpDiv = <HTMLDivElement>document.querySelector(".wallpaper");
    if (!wpDiv) throw "Merci de ne pas détruire le HTML";

    const wall = new Wallpaper(wpDiv);
    
    wall.ajouteBG("Chapitre 1", "/img/Vagues_sous_la_nuit.svg", "/img/blob.svg", "/img/Vagues_sous_la_nuit.svg");
    wall.loadBG("Chapitre 1");

    // @ts-ignore
    window.wall = wall;

    // Histoire

    let reqChapitres = await fetch("/data/scenario.json");
    let reqFacts = await fetch("/data/facts.json");
    let reqDesc = await fetch("/data/desc.json");

    let chapitres = <chapitre[]>JSON.parse(await reqChapitres.text());
    let facts = <string[][]>JSON.parse(await reqFacts.text());
    let desc_fin = <string[][]>JSON.parse(await reqDesc.text());

    const histoire = new Histoire(chapitres, facts, desc_fin);
}