function onOffDeckCards() {
    document.querySelector("#deckCards").classList.toggle("hide");
    document.getElementsByClassName("parent")[0].classList.toggle("hideScroll");
    document.querySelector("body").classList.toggle("hideScroll");
    document.querySelector("#deckCards").classList.toggle("addScroll");
}
