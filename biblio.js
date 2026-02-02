import { livres } from "./livres.js";

// Définition du titre + sous-titre
let titre1 = document.getElementById('titre-principal');

// Définition de l'entrée de l'utilisateur
let livreInput = document.getElementById('input');

let main = document.getElementById("main");

let resultat = [];
let nbr_resultats = 0;

function search() {
    let recherche = livreInput.value.trim().toLowerCase();

    if (recherche === "") return;

    for (let i = 0; i < livres.length; i++) {

        let l = livres[i];

        if(
            l.titre.toLowerCase().includes(recherche) ||
            l.auteur.toLowerCase().includes(recherche) ||
            l.date_publication === recherche ||
            l.id === recherche
        ) {
            resultat.push(l);
            nbr_resultats += 1;
        }

    }

    livreInput.value = "";

    showResult();
}

function showResult() {

    main.innerHTML = "";

    let titre2 = document.createElement('h2');
    titre2.textContent = nbr_resultats + " résultat(s) trouvé(s)";
    nbr_resultats = 0;
    titre2.className = 'titre';
    main.append(titre2);

    if (resultat.length === 0) {

        let noResults = document.querySelector('.no-results');
        if (!noResults) {
            let p = document.createElement('p');
            p.textContent = "Aucun résultat trouvé.";
            p.className = "no-results";
            main.append("Aucun résultat trouvé.")
        }
        return;
    }

    for (let livre of resultat) {

        let card = document.createElement("div");
        card.className = "livre";

        // Image
        let img = document.createElement("img");
        img.src = livre.image;
        img.alt = `Couverture de ${livre.titre}`;

        // Container infos
        let info = document.createElement("div");
        info.className = "infos";

        // Titre du livre
        let titre = document.createElement("h3");
        let a = document.createElement("a");
        a.href = "livre.html?id=" + livre.id;
        a.textContent = livre.titre;
        titre.appendChild(a);

        // Auteur
        let auteur = document.createElement("p");
        auteur.textContent = `${livre.auteur} — ${livre.date_publication}`;

        // Disponibilité
        let dispo = document.createElement("p");
        dispo.className = livre.disponible ? "dispo" : "indispo";
        dispo.textContent = livre.disponible
            ? "✔ Disponible"
            : "✖ Indisponible";

            info.append(titre, auteur, dispo);
            card.append(img, info);

            main.appendChild(card);
            main.appendChild(document.createElement("hr"));

    }
}

const bouton = document.getElementById("submit");
bouton.addEventListener("click", search);