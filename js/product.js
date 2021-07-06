// recueil l'ID de la page product
let param = new URLSearchParams(window.location.search);
let id = param.get("id");

// GET au serveur avec ID produit et affiche les infos recueillies sur la page product

fetch("http://localhost:3000/api/cameras/" + id)
    .then(function (res) {
        if (res.ok) {
            console.log(res)
            return res.json();
        }
    })
    .catch(function (err) {
        cameraContainer = document.createElement("h3");
        h3 = document.getElementById("cameraContainer");
        h3.appendChild(cameraContainer);
        cameraContainer.innerHTML = 'Erreur de connexion <i class="bi bi-exclamation-square"></i>';
        cameraContainer.setAttribute("class", "text-center badge fs-3 bg-warning text-wrap my-4 py-4");
    })
    .then(function camerasLoading(cameras) {
        img = document.getElementById("photo");
        img.setAttribute("src", cameras.imageUrl);
        title = document.getElementById("title");
        title.textContent = cameras.name;
        description = document.getElementById("description");
        description.textContent = cameras.description;
        const lenses = cameras.lenses;
        const lensesNumber = lenses.length;
        lense = document.createElement("option");
        option = document.getElementById('select');
        option.appendChild(lense);
        lense.setAttribute("id", "option");
        lense.textContent = (lensesNumber + ' option disponible')
        if (lensesNumber > 1) {
            lense.textContent = (lensesNumber + ' options disponibles')
        }
        for (a = 0; a < lensesNumber; a++) {
            lense = document.createElement("option");
            option = document.getElementById('select');
            option.appendChild(lense);
            lense.setAttribute("id", "option");
            lense.textContent = (lenses[a])
        }
        prices = document.getElementById("price");
        let price = cameras.price / 100;
        prices.textContent = price.toFixed(2) + "€";
        document.getElementById('addToCart').onclick = function () {addToCart(id)};
});

// Ajoute le prduit au panier

function addToCart(id) {
    if (localStorage.getItem(id) != null) {
    let idString = (localStorage.getItem(id)).split(',');
    let count = (idString[2])
    count = Number(count) +1;
    let article = [cameras.name, cameras.price, count]
    localStorage.setItem(id, article)
    }
    else {
    let count = 1;
    let article = [cameras.name,cameras.price,count];
    localStorage.setItem(id, article);
    }
    articleCount();
    popUp();
}

// Affiche un PopUp lors de l'ajout d'un produit au panier

function popUp(){
    let popadd = document.getElementById('popadd');
    popadd.classList.remove('none');
};


