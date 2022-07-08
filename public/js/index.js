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
