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
      element.setAttribute("class", "badge rounded-pill bg-danger");
    }
    else {
      element = document.getElementById("notification");
      element.setAttribute("class", "none");
    }
  }
  
  articleCount()