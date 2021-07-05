// creating dynamic links for each cameras
function paramUrl(id) {
    detailUrl = new URL('/pages/product.html', "http://127.0.0.1:5500/");
    detailUrl.searchParams.append("id", id);
};
// résumé du panier
let prixTotalCommande = 0;
nombreDeDArticle = localStorage.length;
let articles = [];
// affiche la ligne de l'article dans le tableau
for (a = 0; a < nombreDeDArticle; a++) {
    article = localStorage.key(a);
    detailArticle = (localStorage.getItem(article)).split(',');
    nom = (detailArticle[0]);
    quantite = (detailArticle[2]);
    prix = (detailArticle[1]);
    prix = (Number(prix) / 100).toFixed(2);
    prixtotalarticle = (prix * Number(quantite));
    prixTotalCommande = Number(prixTotalCommande);
    prixtotalarticle = Number(prixtotalarticle);
    prixTotalCommande = prixTotalCommande + prixtotalarticle;

    for (q = 0; q < quantite; q++) {
        articlesTotal = articles.push(article);
    }
    paramUrl(article);

    table = document.createElement("tr");
    tr = document.getElementById("table");
    tr.appendChild(table);
    table.setAttribute("id", "table" + a);

    const line = `
    <tr>
    <th scope="row">${a + 1}</th>
    <td><a href="${detailUrl}">${nom}</a></td>
    <td><i class="me-2 bi bi-dash-square pointer" onclick="lessItems('${article}')"></i>
        ${quantite}
        <i class="ms-2 bi bi-plus-square pointer" onclick="moreItems('${article}')"></i>
    </td>
    <td>${prixtotalarticle} €</td>
    <td><i class="bi bi-trash text-danger fs-4 pointer" onclick="deleteItem('${article}')"></i>
    </td>
    </tr>`
    document.querySelector("#table" + a).innerHTML = line;
}

// affiche le ligne footer du tableau avec le total
const total =
    `
    <tfoot class="text-center">

    <th scope="col"></th>
    <th scope="col">Total</th>
    <th scope="col"></th>
    <th scope="col">${prixTotalCommande} €</th>
    <th scope="col"></th>

    `
document.querySelector("#tfoot").innerHTML = total;


function lessItems(id) {
    nombre = (localStorage.getItem(id)).split(',');
    quantite = (nombre[2]);
    if (quantite > 1) {
        quantite--;

        let article = [nombre[0], nombre[1], quantite]
        localStorage.setItem(id, article)
        location.reload();
    }
}

function moreItems(id) {
    nombre = (localStorage.getItem(id)).split(',');
    quantite = (nombre[2]);
    quantite++;

    let article = [nombre[0], nombre[1], quantite]
    localStorage.setItem(id, article)
    location.reload();
}

function deleteItem(id) {
    localStorage.removeItem(id);
    location.reload();
}

let formIsValid = false;

function validForm() {

    const validLastName = /^[a-z ,.'-]+$/i;
    const nom = document.getElementById('nom').value;
    if (nom.match(validLastName)) {
        document.getElementById('nom').classList.add('validname');
        document.getElementById('nom').classList.remove('invalidname');
        document.getElementById('iconLastNameOk').classList.remove('none');
        document.getElementById('iconLastNameOk').classList.add('iconOk');
        document.getElementById('iconLastNameNotOk').classList.add('none');
    }
    if (!nom.match(validLastName)) {
        document.getElementById('nom').classList.add('invalidname');
        document.getElementById('nom').classList.remove('validname');
        document.getElementById('iconLastNameNotOk').classList.remove('none');
        document.getElementById('iconLastNameNotOk').classList.add('iconNotOk');
        document.getElementById('iconLastNameOk').classList.add('none');
    }
    if (nom == '') {
        document.getElementById('nom').classList.remove('invalidname');
        document.getElementById('nom').classList.remove('validname');
        document.getElementById('iconLastNameOk').classList.add('none');
        document.getElementById('iconLastNameNotOk').classList.add('none');
    }

    const validFirstName = /^[a-z ,.'-]+$/i;
    const prenom = document.getElementById('prenom').value;
    if (prenom.match(validFirstName)) {
        document.getElementById('prenom').classList.add('validname');
        document.getElementById('prenom').classList.remove('invalidname');
        document.getElementById('iconFirstNameOk').classList.remove('none');
        document.getElementById('iconFirstNameOk').classList.add('iconOk');
        document.getElementById('iconFirstNameNotOk').classList.add('none');
    }
    if (!prenom.match(validFirstName)) {
        document.getElementById('prenom').classList.add('invalidname');
        document.getElementById('prenom').classList.remove('validname');
        document.getElementById('iconFirstNameNotOk').classList.remove('none');
        document.getElementById('iconFirstNameNotOk').classList.add('iconNotOk');
        document.getElementById('iconFirstNameOk').classList.add('none');
    }
    if (prenom == '') {
        document.getElementById('prenom').classList.remove('invalidname');
        document.getElementById('prenom').classList.remove('validname');
        document.getElementById('iconFirstNameOk').classList.add('none');
        document.getElementById('iconFirstNameNotOk').classList.add('none');
    }

    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = document.getElementById('email').value;
    if (email.match(validEmail)) {
        document.getElementById('email').classList.add('validname');
        document.getElementById('email').classList.remove('invalidname');
        document.getElementById('iconEmailOk').classList.remove('none');
        document.getElementById('iconEmailOk').classList.add('iconOk');
        document.getElementById('iconEmailNotOk').classList.add('none');
    }
    if (!email.match(validEmail)) {
        document.getElementById('email').classList.add('invalidname');
        document.getElementById('email').classList.remove('validname');
        document.getElementById('iconEmailNotOk').classList.remove('none');
        document.getElementById('iconEmailNotOk').classList.add('iconNotOk');
        document.getElementById('iconEmailOk').classList.add('none');
    }
    if (email == '') {
        document.getElementById('email').classList.remove('invalidname');
        document.getElementById('email').classList.remove('validname');
        document.getElementById('iconEmailOk').classList.add('none');
        document.getElementById('iconEmailNotOk').classList.add('none');
    }

    const validAdresse = /^[a-zA-Z0-9\s\,\''\-]*$/;
    const adresse = document.getElementById('adresse').value;
    if (adresse.match(validAdresse)) {
        document.getElementById('adresse').classList.add('validname');
        document.getElementById('adresse').classList.remove('invalidname');
        document.getElementById('iconAdresseOk').classList.remove('none');
        document.getElementById('iconAdresseOk').classList.add('iconOk');
        document.getElementById('iconAdresseNotOk').classList.add('none');
    }
    if (!adresse.match(validAdresse)) {
        document.getElementById('adresse').classList.add('invalidname');
        document.getElementById('adresse').classList.remove('validname');
        document.getElementById('iconAdresseNotOk').classList.remove('none');
        document.getElementById('iconAdresseNotOk').classList.add('iconNotOk');
        document.getElementById('iconAdresseOk').classList.add('none');
    }
    if (adresse == '') {
        document.getElementById('adresse').classList.remove('invalidname');
        document.getElementById('adresse').classList.remove('validname');
        document.getElementById('iconAdresseOk').classList.add('none');
        document.getElementById('iconAdresseNotOk').classList.add('none');
    }

    const validAdressePlus = /^[a-zA-Z0-9\s\,\''\-]*$/;
    const adressePlus = document.getElementById('adressePlus').value;
    if (adressePlus.match(validAdressePlus)) {
        document.getElementById('adressePlus').classList.add('validname');
        document.getElementById('adressePlus').classList.remove('invalidname');
        document.getElementById('iconAdressePlusOk').classList.remove('none');
        document.getElementById('iconAdressePlusOk').classList.add('iconOk');
        document.getElementById('iconAdressePlusNotOk').classList.add('none');
    }
    if (!adressePlus.match(validAdressePlus)) {
        document.getElementById('adressePlus').classList.add('invalidname');
        document.getElementById('adressePlus').classList.remove('validname');
        document.getElementById('iconAdressePlusNotOk').classList.remove('none');
        document.getElementById('iconAdressePlusNotOk').classList.add('iconNotOk');
        document.getElementById('iconAdressePlusOk').classList.add('none');
    }
    if (adressePlus == '') {
        document.getElementById('adressePlus').classList.remove('invalidname');
        document.getElementById('adressePlus').classList.remove('validname');
        document.getElementById('iconAdressePlusOk').classList.add('none');
        document.getElementById('iconAdressePlusNotOk').classList.add('none');
    }

    const validCodePostal = /^(?:[0-8]\d|9[0-8])\d{3}$/;
    const codePostal = document.getElementById('codePostal').value;
    if (codePostal.match(validCodePostal)) {
        document.getElementById('codePostal').classList.add('validname');
        document.getElementById('codePostal').classList.remove('invalidname');
        document.getElementById('iconCodePostalOk').classList.remove('none');
        document.getElementById('iconCodePostalOk').classList.add('iconOk');
        document.getElementById('iconCodePostalNotOk').classList.add('none');

    }
    if (!codePostal.match(validCodePostal)) {
        document.getElementById('codePostal').classList.add('invalidname');
        document.getElementById('codePostal').classList.remove('validname');
        document.getElementById('iconCodePostalNotOk').classList.remove('none');
        document.getElementById('iconCodePostalNotOk').classList.add('iconNotOk');
        document.getElementById('iconCodePostalOk').classList.add('none');
    }
    if (codePostal == '') {
        document.getElementById('codePostal').classList.remove('invalidname');
        document.getElementById('codePostal').classList.remove('validname');
        document.getElementById('iconCodePostalOk').classList.add('none');
        document.getElementById('iconCodePostalNotOk').classList.add('none');
    }

    const validVille = /^[a-z ,.'-]+$/i;
    const ville = document.getElementById('ville').value;
    if (ville.match(validVille)) {
        document.getElementById('ville').classList.add('validname');
        document.getElementById('ville').classList.remove('invalidname');
        document.getElementById('iconVilleOk').classList.remove('none');
        document.getElementById('iconVilleOk').classList.add('iconOk');
        document.getElementById('iconVilleNotOk').classList.add('none');
    }
    if (!ville.match(validVille)) {
        document.getElementById('ville').classList.add('invalidname');
        document.getElementById('ville').classList.remove('validname');
        document.getElementById('iconVilleNotOk').classList.remove('none');
        document.getElementById('iconVilleNotOk').classList.add('iconNotOk');
        document.getElementById('iconVilleOk').classList.add('none');
    }
    if (ville == '') {
        document.getElementById('ville').classList.remove('invalidname');
        document.getElementById('ville').classList.remove('validname');
        document.getElementById('iconVilleOk').classList.add('none');
        document.getElementById('iconVilleNotOk').classList.add('none');
    }

    if(nom.match(validLastName) && prenom.match(validFirstName) &&
     email.match(validEmail) && adresse.match(validAdresse) &&
     codePostal.match(validCodePostal) && ville.match(validVille)){
        formIsValid = true;
    }
}



function submitForm() {
    if(formIsValid === true){

    let contact = {
        firstName: document.getElementById('prenom').value,
        lastName: document.getElementById('nom').value,
        address: document.getElementById('adresse').value + ", " + document.getElementById('adressePlus').value + " " + document.getElementById('codePostal').value,
        city: document.getElementById('ville').value,
        email: document.getElementById('email').value,
    };
    console.log(contact);

    let products = articles;


    fetch("http://localhost:3000/api/cameras/order",
        {
            method: "POST",

            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify
                (
                    {
                        contact,
                        products
                    }
                )
        }
    )
        .then
        (function (res) {
            if (res.ok) {
                return res.json();
            }
        }
        )
        .then(function (res) {
            console.log(res.orderId);
            let confirmUrl;
            confirmUrl = new URL('/pages/confirm.html', "http://127.0.0.1:5500/");
            confirmUrl.searchParams.append("idValidated", res.orderId);
            window.location.href = confirmUrl;
        });
}
else{
    window.alert('Veuillez remplir le formulaire correctement, Merci.')
}
}


