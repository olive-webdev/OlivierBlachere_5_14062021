// =============================================================================
// afficher notif panier
// =============================================================================

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
      element.setAttribute("class", "badge rounded-pill bg-danger");
    }
    else {
      element = document.getElementById("notification");
      element.setAttribute("class", "none");
    }
  }
  
  articleCount()


// =============================================================================
// résumé du panier
// =============================================================================
let prixTotalCommande = 0;
nombreDeDArticle = localStorage.length;

// -----------------------------------------------------------------------------
// affiche la ligne de l'article dans le tableau
// -----------------------------------------------------------------------------
for(a=0; a<nombreDeDArticle; a++){
    article = localStorage.key(a);
    console.log(article)
    detailArticle = (localStorage.getItem(article)).split(',');
    nom = (detailArticle[0]);
    quantite = (detailArticle[2]);
    prix = (detailArticle[1]);
    prix = (Number(prix)/100).toFixed(2);
    prixtotalarticle = (prix * Number(quantite));
    prixTotalCommande = Number(prixTotalCommande);
    prixtotalarticle = Number(prixtotalarticle);
    prixTotalCommande = prixTotalCommande + prixtotalarticle;

    table = document.createElement("tr");
    tr = document.getElementById("table");
    tr.appendChild(table);
    table.setAttribute("id", "table"+a);

    const line = `
    <tr>
    <th scope="row">${a+1}</th>
    <td>${nom}</td>
    <td><i class="me-2 bi bi-dash-square pointer" onclick="lessItems('${article}')"></i>
        ${quantite}
        <i class="ms-2 bi bi-plus-square pointer" onclick="moreItems('${article}')"></i>
    </td>
    <td>${prixtotalarticle} €</td>
    <td><i class="bi bi-trash text-danger fs-4 pointer" onclick="deleteItem('${article}')"></i>
    </td>
    </tr>`
    document.querySelector("#table"+a).innerHTML = line;
}

// -----------------------------------------------------------------------------
// affiche le ligne footer du tableau avec le total
// -----------------------------------------------------------------------------
const total = `
    <tfoot class="text-center">
    <th scope="col">#</th>
    <th scope="col">Total</th>
    <th scope="col"></th>
    <th scope="col">${prixTotalCommande} €</th>
    <th scope="col"></th>
            `
document.querySelector("#tfoot").innerHTML = total;


function lessItems(id) {

    nombre = (localStorage.getItem(id)).split(',');

    quantite = (nombre[2]);

    quantite --;

    let article = [nombre[0], nombre[1], quantite]
    localStorage.setItem(id, article)
    location.reload();
}

function moreItems(id) {

    nombre = (localStorage.getItem(id)).split(',');

    quantite = (nombre[2]);

    quantite ++;

    let article = [nombre[0], nombre[1], quantite]
    localStorage.setItem(id, article)
    javascript:location.reload();
}

function deleteItem(id) {
    localStorage.removeItem(id);
    location.reload();
}


function post()
{
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",

  })
  .then
    (function(res)
      {
        if (res.ok)
          {
            return res.json();
          }
      }
    )
  .catch
    (function(err)
      {
        console.log('erreur')
      }
    )
  .then
    ( console.log('posting')
    )
  
  }