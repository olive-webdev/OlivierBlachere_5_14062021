// importing modules
function articleCount() {
  nombreId = localStorage.length;
  console.log("nombre d'ID " + nombreId)
  let total = 0;
  for (a = 0; a < nombreId; a++) {
    nomId = localStorage.key(a);
    console.log("affiche le numero ID " + nomId)
    nombresArticleDansNomId = (localStorage.getItem(nomId)).split(',');
    nombresArticleDansNomId = Number(nombresArticleDansNomId[2]);
    console.log("nombre d'article " + nombresArticleDansNomId)
    total = total + nombresArticleDansNomId;
    console.log("affiche le total " + total)
  }
  if (total > 0) {
    element = document.getElementById("notification");
    element.textContent = total;
    element.setAttribute("class", "display text-danger text-center");
  }
  else {
    element = document.getElementById("notification");
    element.setAttribute("class", "none");
  }
}

articleCount()

// creating dynamic links for each cameras
let detailUrlParameter =[];
function paramUrl (id, name, price)
  {
    detailUrl = new URL('/pages/detail.html', "http://127.0.0.1:5500/");
    detailUrl.searchParams.append("id", id);
    detailUrl.searchParams.append("name", name);
    detailUrl.searchParams.append("price", price);
    detailUrlParameter.push(detailUrl);
  };
//---------------------------------------------------------------------------


fetch("http://localhost:3000/api/cameras")
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
        cameraContainer = document.createElement("h3");
          h2 = document.getElementById('cameraContainer');
          h2.appendChild(cameraContainer);
          cameraContainer.innerHTML ='Erreur de connexion <i class="bi bi-exclamation-square"></i>'
          cameraContainer.setAttribute("class", "text-center badge fs-3 bg-warning text-wrap p-4")
      }
    )
  .then
    ( 
      function camerasLoading (cameras)
        {
          for (let i=0; i<cameras.length; ++i)
            { 
              paramUrl(cameras[i]._id, cameras[i].name, cameras[i].price);
              // ---------------------------------------------------------------
              // creating HTML element
              element = ['div', 'a', 'img', 'h2', 'p', 'span']
              id = ['cameraContainer', 'camera', 'list-box', 'link', 'card-body', ]

              function card (element, id)
              {
                camera = document.createElement(element);
                element = document.getElementById(id);
                element.appendChild(camera);
              }
              // ---------------------------------------------------------------

              card(element[0], id[0]);
              camera.setAttribute("class", "col-lg-4 col-md-6 mt-4");
              camera.setAttribute("id", "camera"+i);


              card(element[0], id[1]+i);
              camera.setAttribute("class", "list-box w-100")
              camera.setAttribute("id", "list-box"+i);

              card(element[1], id[2]+i);
              camera.setAttribute("id", "link"+i);
              camera.setAttribute("href", detailUrlParameter[i]);

              card(element[2], id[3]+i);
              camera.setAttribute("src", cameras[i].imageUrl);
              camera.setAttribute("class", "w-100");

              card(element[3], id[2]+i);
              camera.textContent = cameras[i].name;

              card(element[4], id[2]+i);
              camera.setAttribute("class", "d-inline-block text-truncate w-100 mb-3");
              camera.textContent = cameras[i].description;

              card(element[0], id[2]+i);
              camera.setAttribute("class", "d-flex justify-content-between align-items-center mb-3");
              camera.setAttribute("id", "card-body"+i);

              card(element[0], id[4]+i);
              camera.setAttribute("class", "option");
              const option = cameras[i].lenses;
              const nombreOption = option.length;
              camera.innerHTML = '<i class="bi bi-arrow-right-square"></i> '  + nombreOption+" option disponible";
              if (nombreOption>1)
                {
                  camera.innerHTML = '<i class="bi bi-arrow-right-square"></i> ' +nombreOption+" options disponibles";
                }
              if (nombreOption==0)
                {
                  camera.innerHTML = '<i class="bi bi-arrow-right-square"></i> ' +"Pas d'option disponible"
                }

              card(element[5], id[4]+i);
              camera.setAttribute("class", "border border-primary p-2 rounded-2");
              let price = cameras[i].price/100;
              camera.textContent = price.toFixed(2)+'€';

              card(element[1], id[2]+i);
              camera.setAttribute("id", "link"+i);
              camera.setAttribute("class", "btn btn-primary w-100");
              camera.setAttribute("href", detailUrlParameter[i]);
              camera.innerHTML = 'Plus de détails <i class="bi bi-plus-square"></i>';
            }
        }
    )


