// get url parameter ?id=
let param = new URLSearchParams(window.location.search);
let id = param.get("id");
let cameraName = param.get("name");
let price = param.get("price");
// let article = [cameraName,price,count];
// console.log(article)

function addToCart(id) {
  if (localStorage.getItem(id) != null) {
    let idString = (localStorage.getItem(id)).split(',');
    let count = (idString[2])
    count = Number(count) +1;
    let article = [cameraName, price, count]
    localStorage.setItem(id, article)
  }
  else {
    let count = 1;
    let article = [cameraName,price,count];
    localStorage.setItem(id, article);
  }
  articleCount();
}

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

fetch("http://localhost:3000/api/cameras")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .catch(function (err) {
    cameraContainer = document.createElement("h3");
    h3 = document.getElementById("cameraContainer");
    h3.appendChild(cameraContainer);
    cameraContainer.innerHTML =
      'Erreur de connexion <i class="bi bi-exclamation-square"></i>';
    cameraContainer.setAttribute(
      "class",
      "text-center badge fs-3 bg-warning text-wrap my-4 py-4"

    );
  })

  .then(function camerasLoading(cameras) {
    for (i = 0; i < cameras.length; i++) {
      if (cameras[i]._id == id) {
        img = document.getElementById("photo");
        img.setAttribute("src", cameras[i].imageUrl);

        title = document.getElementById("title");
        title.textContent = cameras[i].name;

        description = document.getElementById("description");
        description.textContent = cameras[i].description;



        const lenses = cameras[i].lenses;
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
        let price = cameras[i].price / 100;
        prices.textContent = price.toFixed(2) + "€";
      } else {
        console.log();
      }
    }
  });

document.getElementById('addToCart').onclick = function () { addToCart(id) };
