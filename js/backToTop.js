// affiche un bouton pour revenir en haut de la page

let mybutton = document.getElementById("bttb");
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200) {
            mybutton.style.visibility = "visible";
        }
    else {
        mybutton.style.visibility = "hidden";
    }
}

