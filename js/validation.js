// get l'ID du parametre Url et affc-iche dans un message de confirmation
let param = new URLSearchParams(window.location.search);
let idValidated = param.get("idValidated");
const validationMessage = `
<div class="fs-4 text-center">
Votre commande est enregistrée sous le numéro<br> ${idValidated}.
</div>`
document.querySelector("#message").innerHTML = validationMessage;

// vide la panier

localStorage.clear();
