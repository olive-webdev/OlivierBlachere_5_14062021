
let param = new URLSearchParams(window.location.search);

let idValidated = param.get("idValidated");
console.log(idValidated);

const validationMessage = `
<div class="fs-4 text-center">
Votre commande est enregistrée sous le numéro<br> ${idValidated}.
</div>
`
document.querySelector("#message").innerHTML = validationMessage;

localStorage.clear();
