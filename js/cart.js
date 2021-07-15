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

function addArticleInTable(){
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
}}
addArticleInTable();

// affiche le ligne footer du tableau avec le total

const total =`
    <th scope="col"></th>
    <th scope="col">Total</th>
    <th scope="col"></th>
    <th scope="col">${prixTotalCommande} €</th>
    <th scope="col"></th>`
document.querySelector("#tfoot").innerHTML = total;

// décrémente le nombre d'articles du panier

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
// incrémente le nombre d'articles du panier

function moreItems(id) {
    nombre = (localStorage.getItem(id)).split(',');
    quantite = (nombre[2]);
    quantite++;

    let article = [nombre[0], nombre[1], quantite]
    localStorage.setItem(id, article)
    location.reload();
}
// supprime le/s article/s

function deleteItem(id) {
    localStorage.removeItem(id);
    location.reload();
}

let formIsValid = false;

// efface le formaulaire si la panier est vide
function hideFormIfCartEmpty(){
    if(nombreDeDArticle === 0){
        console.log('zero article');
        var d = document.getElementById("cameraContainer");
        var d_nested = document.getElementById("validationForm");
        var throwawayNode = d.removeChild(d_nested);
    }
}
hideFormIfCartEmpty();


// valide ou invalide les champs d'inputs du formulaire

function validForm() {
    id = ['nom','prenom', 'email', 'adresse', 'adressePlus', 'codePostal', 'ville'];
    idDomOk = ['nomOk', 'prenomOk', 'emailOk', 'adresseOk', 'adressePlusOk', 'codePostalOk', 'villeOk'];
    idDomNotOk = ['nomNotOk', 'prenomNotOk', 'emailNotOk', 'adresseNotOk', 'adressePlusNotOk', 'codePostalNotOk', 'villeNotOk']

    let inputs = {
        regex :[/^[a-z ,.'-]+$/i,
                /^[a-z ,.'-]+$/i,
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                /^[a-zA-Z0-9\s\,\''\-]*$/,
                /^[a-zA-Z0-9\s\,\''\-]*$/,
                /^(?:[0-8]\d|9[0-8])\d{3}$/,
                /^[a-z ,.'-]+$/i] ,
        inputValue : document.getElementById(id[0]).value,
        valid : function (i){
            if (document.getElementById(id[i]).value.match(this.regex[i])) {
                document.getElementById(id[i]).classList.add('validname');
                document.getElementById(id[i]).classList.remove('invalidname');
                document.getElementById(idDomOk[i]).classList.remove('none');
                document.getElementById(idDomOk[i]).classList.add('ok');
                document.getElementById(idDomNotOk[i]).classList.add('none');
                formIsValid = true;
            }
            if (!document.getElementById(id[i]).value.match(this.regex[i])) {
                document.getElementById(id[i]).classList.add('invalidname');
                document.getElementById(id[i]).classList.remove('validname');
                document.getElementById(idDomNotOk[i]).classList.remove('none');
                document.getElementById(idDomNotOk[i]).classList.add('notOk');
                document.getElementById(idDomOk[i]).classList.add('none');
                formIsValid = false;
            }
            if (document.getElementById(id[i]).value == '') {
                document.getElementById(id[i]).classList.remove('invalidname');
                document.getElementById(id[i]).classList.remove('validname');
                document.getElementById(idDomOk[i]).classList.add('none');
                document.getElementById(idDomNotOk[i]).classList.add('none');
                formIsValid = false;
            }
        }
    };
    inputs.valid(0);
    inputs.valid(1);
    inputs.valid(2);
    inputs.valid(3);
    inputs.valid(4);
    inputs.valid(5);
    inputs.valid(6);
}

// au click du bouton "valider la commande" / recueil les champs validés et les POST au serveur

function submitForm() {
    if(formIsValid === true){
        let contact = {
            firstName: document.getElementById('prenom').value,
            lastName: document.getElementById('nom').value,
            address: document.getElementById('adresse').value + ", " + document.getElementById('adressePlus').value + " " + document.getElementById('codePostal').value,
            city: document.getElementById('ville').value,
            email: document.getElementById('email').value,
        };
        let products = articles;
        fetch("http://localhost:3000/api/cameras/order",{
            method: "POST",
            headers:
            {'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify(
                {contact,products}
            )
        })
        .then(function (res){
                if (res.ok) {
                    return res.json();
                }
            }
        )
        .then(function (res){
                let confirmUrl;
                confirmUrl = new URL('/pages/confirm.html', "http://127.0.0.1:5500/");
                confirmUrl.searchParams.append("idValidated", res.orderId);
                window.location.href = confirmUrl;
            }
        );
    }
    else{
        let popadd = document.getElementById('popadd');
        popadd.classList.remove('none');
    }
}
