// Ajoute un article au clic "ajouter au panier" dans le local storage et renvoie vers articleCount()
function addToCart(id) {
    if (localStorage.getItem(id) > 0) {
        let store = Number(localStorage.getItem(id));
        localStorage.setItem(id, store + 1)
    }
    else {
        localStorage.setItem(id, 1);
    }
    articleCount();
}

// Compte le nombre d'article dans le local storage et affiche le badge "nombre" vers l'icone du panier

function articleCount() {
    nombreId = localStorage.length;
    let total = 0;
    for (a = 0; a < nombreId; a++) {
        nomId = localStorage.key(a);
        nombresArticleDansNomId = (localStorage.getItem(nomId)).split(',');
        nombresArticleDansNomId = Number(nombresArticleDansNomId[2]);
        total = total + nombresArticleDansNomId;
    }
    if (total > 0) {
        element = document.getElementById("notification");
        element.textContent = total;
        element.setAttribute("class", "badge rounded-pill bg-danger position-absolute");
    }
    else {
        element = document.getElementById("notification");
        element.setAttribute("class", "none");
    }
}

articleCount()