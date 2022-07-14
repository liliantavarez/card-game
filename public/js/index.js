/* eslint-disable func-names */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable operator-linebreak */
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
    document.getElementsByClassName("imgCross")[index].style.filter =
        "grayscale(100%)";
    document.getElementsByClassName("btCross")[index].disabled = true;
}

function ativaCheck(index) {
    document.getElementsByClassName("imgCheck")[index].style.filter = "none";
    document.getElementsByClassName("btCheck")[index].disabled = false;
}

function desativaCheck(index) {
    document.getElementsByClassName("imgCheck")[index].style.filter =
        "grayscale(100%)";
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
    if (att.value < total) {
        total -= att.value;
        document.getElementById("total").placeholder = total;
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

function removerAtt(valorTotal, valorAtt) {
    const att = valorAtt;
    let novoValor = "";
    novoValor = valorTotal + parseInt(att.value, 10);
    document.getElementById("total").placeholder = novoValor;
    att.value = "";
    att.disabled = false;
}

function cross(id) {
    const valorTotal = parseInt(
        document.getElementById("total").placeholder,
        10,
    );

    if (id === "btCrossMag") {
        const valorMag = document.getElementById("quantMag");
        removerAtt(valorTotal, valorMag);
        desativaCheck(2);
        desativaCross(2);
    } else if (id === "btCrossDef") {
        const valorDef = document.getElementById("quantDef");
        removerAtt(valorTotal, valorDef);
        desativaCheck(1);
        desativaCross(1);
    } else if (id === "btCrossAtaq") {
        const valorAtaq = document.getElementById("quantAtaq");
        removerAtt(valorTotal, valorAtaq);
        desativaCheck(0);
        desativaCross(0);
    }
}

function criarCarta() {
    const nome = document.getElementById("nomeCarta").value;
    const ataque = document.getElementById("quantAtaq").value;
    const defesa = document.getElementById("quantDef").value;
    const magia = document.getElementById("quantMag").value;
    const imagem = document.getElementById("preview").src;

    const carta = {
        nome,
        ataque,
        defesa,
        magia,
        imagem,
    };
    console.log(carta);

    const options = {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(carta),
    };
    fetch("http://localhost:8081/perfil/:id", options).then(res => {
        // document.getElementById("title").value = "";
        // document.getElementById("desc").value = "";
    });
}

document.addEventListener("DOMContentLoaded", () => {});
