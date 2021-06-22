
let param = new URLSearchParams(window.location.search);
let idValidated = param.get("idValidated");


let prixTotalCommande = 0;
nombreDeDArticle = localStorage.length;

function paramUrl (id)
  {
    detailUrl = new URL('/pages/detail.html', "http://127.0.0.1:5500/");
    detailUrl.searchParams.append("id", id);
  };


for(a=0; a<nombreDeDArticle; a++){
    article = localStorage.key(a);
    console.log(article);
    detailArticle = (localStorage.getItem(article)).split(',');
    nom = (detailArticle[0]);
    quantite = (detailArticle[2]);
    prix = (detailArticle[1]);
    prix = (Number(prix)/100).toFixed(2);
    prixtotalarticle = (prix * Number(quantite));
    prixTotalCommande = Number(prixTotalCommande);
    prixtotalarticle = Number(prixtotalarticle);
    prixTotalCommande = prixTotalCommande + prixtotalarticle;

    paramUrl(article);

    const validationMessage = `
    <div class="fs-4 text-center mt-5">
    Votre commande est enregistrée sous le numéro ${idValidated}.
    </div>
`
    document.querySelector("#message").innerHTML = validationMessage;

    const resume = `
    <thead class="text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">désignation</th>
                <th scope="col">quantité</th>
                <th scope="col" style="width:120px;">prix</th>
              </tr>
            </thead>
            <tbody id="table" class="text-center fs-6">
              <tr  id="table0">
              <th scope="row">${a+1}</th>
              <td><a href="${detailUrl}">${nom}</a></td>
              <td>
                  ${quantite}
                  
              </td>
              <td>${prixtotalarticle} €</td>

              </tr>
            </tbody>
            <tfoot id="tfoot" class="text-center">
                <th scope="col">#</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
                <th scope="col">798.00 €</th>

              </tfoot>
          </table>
    
    `
    document.querySelector("#resume").innerHTML = resume;

}

{/* <div>${a+1}</div>
<div><a href="${detailUrl}">${nom}</a></div>
<div>${quantite}</div>
<div>${prixtotalarticle} €</div> */}