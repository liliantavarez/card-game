function onOffDeckCards() {
    document.querySelector("#deckCards").classList.toggle("hide");
    document.getElementsByClassName("parent")[0].classList.toggle("hideScroll");
    document.querySelector("body").classList.toggle("hideScroll");
    document.querySelector("#deckCards").classList.toggle("addScroll");
}
function readImage() {
    if (this.files && this.files[0]) {
        const file = new FileReader();
        file.onload = function (e) {
            document.getElementById("preview").src = e.target.result;
        };
        file.readAsDataURL(this.files[0]);
    }
}
document.getElementById("fupload").addEventListener("change", readImage, false);

function ativaCross(index) {
    document.getElementsByClassName("imgCross")[index].style.filter = "none";
    document.getElementsByClassName("btCross")[index].disabled = false;
}

function desativaCross(index) {
    document.getElementsByClassName("imgCross")[index].style.filter
        = "grayscale(100%)";
    document.getElementsByClassName("btCross")[index].disabled = true;
}

function ativaCheck(index) {
    document.getElementsByClassName("imgCheck")[index].style.filter = "none";
    document.getElementsByClassName("btCheck")[index].disabled = false;
}

function desativaCheck(index) {
    document.getElementsByClassName("imgCheck")[index].style.filter
        = "grayscale(100%)";
    document.getElementsByClassName("btCheck")[index].disabled = true;
}

function onOff(id) {
    if (id === "quantMag") {
        desativaCross(2);
        ativaCheck(2);
    } else if (id === "quantDef") {
        desativaCross(1);
        ativaCheck(1);
    } else if (id === "quantAtaq") {
        desativaCross(0);
        ativaCheck(0);
    }
}
function totalValor(valorTotal, valorAtt) {
    const att = valorAtt;
    let total = valorTotal;
    if (att.value < valorTotal) {
        total -= att.value;
        document.getElementById("total").placeholder = valorTotal;
        att.disabled = "true";
    }
}
function check(id) {
    const valorTotal = parseInt(
        document.getElementById("total").placeholder,
        10,
    );
    if (id === "btCheckMag") {
        const valorMag = document.getElementById("quantMag");
        totalValor(valorTotal, valorMag);
        desativaCheck(2);
        ativaCross(2);
    } else if (id === "btCheckDef") {
        const valorDef = document.getElementById("quantDef");
        totalValor(valorTotal, valorDef);
        desativaCheck(1);
        ativaCross(1);
    } else if (id === "btCheckAtaq") {
        const valorAtaq = document.getElementById("quantAtaq");
        totalValor(valorTotal, valorAtaq);
        desativaCheck(0);
        ativaCross(0);
    }
}
