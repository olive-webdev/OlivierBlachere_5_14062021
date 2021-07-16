// Crée un lien unique pour chaque produit renvoyant vers sa page respective
let detailUrlParameter =[];
function paramUrl (id){
    detailUrl = new URL('/pages/product.html', "http://127.0.0.1:5500/");
    detailUrl.searchParams.append("id", id);
    detailUrlParameter.push(detailUrl);
};

// Loader de la page d'accueil
const loader = document.querySelector('#loader');
window.addEventListener('load', () => {
    fetch("http://localhost:3000/api/cameras")
    .then (function(res){
        if (res.ok){
            return res.json();
        }
    })
    .catch(function(err){
        cameraContainer = document.createElement("div");
        h2 = document.getElementById('cameraContainer');
        h2.appendChild(cameraContainer);
        cameraContainer.innerHTML ='Erreur de connexion <i class="bi bi-exclamation-square"></i>';
        cameraContainer.setAttribute("class", "text-center badge fs-3 btn-danger text-wrap p-5 mt-5 position-fixed w-50 centeredfixed");
        loader.className += ' none';
    })
    .then(function camerasLoading (cameras){
        for (let i=0; i<cameras.length; ++i){ 
            paramUrl(cameras[i]._id);
            const option = cameras[i].lenses;
            const nombreOption = option.length;
            let optionText = 1;
            if (nombreOption>1){
             optionText = nombreOption + " options disponibles";
            }
            if (nombreOption==1){
                optionText = nombreOption + " option disponible";
            }
            if (nombreOption==0){
            optionText = nombreOption + " pas option disponible";
            }
            let price = cameras[i].price/100;
            const productCard = `
            <div class="col-lg-4 col-md-6 mt-4" id="camera${i}">
                <div class="list-box w-100 border p-3 bg-white" id="list-box">
                    <a href="${detailUrlParameter[i]}">
                        <img src="${cameras[i].imageUrl}" class="w-100 mb-2" alt="un appareil photo ${cameras[i].name}">
                    </a>
                    <h2>${cameras[i].name}</h2>
                    <p class="d-inline-block text-truncate w-100 mb-3">${cameras[i].description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <i class="bi bi-arrow-right-square me-1"></i>
                            ${optionText}
                        </div>
                        <span class="border border-primary p-2 rounded-2">${price.toFixed(2)+'€'}</span>
                    </div>
                    <a href="${detailUrlParameter[i]}" class="btn btn-primary w-100">Plus de details<i class="ms-2 bi bi-plus-square"></i></a>
                </div>
            </div>`
            element = document.getElementById('cameraContainer');
            element.insertAdjacentHTML('beforeend', productCard)
        }
        loader.className += ' none'
    })
})