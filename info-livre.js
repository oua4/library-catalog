import { livres } from "./livres.js";

const query = window.location.search;
const livre_id = new URLSearchParams(query).get("id");

let livre;

// Trouver le livre dont le ID correspond
for (let i = 0; i < livres.length; i++) {

    let l = livres[i];

    // Si le ID correspond au ID dans le query
    if (l.id === livre_id) {
        // Permet l'utilisation de ce livre
        livre = l;
        break;
    }
}

document.title = livre.titre;

// Création de la section principale
let main = document.createElement("div");
main.id = "main";
document.body.appendChild(main);

// Image
let img = document.createElement("img");
img.src = livre.image;
img.alt = `Couverture de ${livre.titre}`;

// Container infos
let info = document.createElement("div");
info.className = "infos";
let card = document.createElement("div");
card.id = "card";

// Titre du livre
let titre = document.createElement("h2");
titre.textContent = livre.titre;

// Auteur et date de publication
let auteur = document.createElement("p");
auteur.innerHTML = `<b>Auteur:</b> ${livre.auteur}`;
let date = document.createElement("p");
date.innerHTML = `<b>Année de publication:</b> ${livre.date_publication}`;

// Disponibilité
let dispo = document.createElement("p");
dispo.className = livre.disponible ? "dispo" : "indispo";
dispo.textContent = livre.disponible
    ? "✔ Disponible"
    : "✖ Indisponible";

let emprunter = document.createElement("button");
emprunter.id = "emprunter";
emprunter.textContent = "Emprunter";

let retour = document.createElement("a");
retour.textContent = "Retour au menu";
retour.href = "biblio.html";

info.append(titre, auteur, date, dispo, emprunter, retour);
card.append(img, info);

main.appendChild(card);