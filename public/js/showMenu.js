function showMenu() {
    var menu = document.getElementById("menu");
    var content = document.getElementById("content-container");
    var btnShow = document.getElementById("btnShow");
    var caret = document.getElementById("caret");
    console.log("hit me!")

    if (menu.style.display === "none") {
        menu.style.display = "block";
        content.style.marginLeft = "15%";
        btnShow.style.display = "none";
    } else {
        menu.style.display = "none";
        content.style.marginLeft = "0%";
        btnShow.style.display = "block";
        caret.style.display = "block";
    }
}