window.addEventListener("DOMContentLoaded", () => {
    let arrayOfW = document.getElementById("arrayOfWords");


    function fetch20Times() {
        for(let i = 1; i <= 20; i++) {
         fetch("https://api.api-ninjas.com/v1/randomword/?key=puHp1RTi4iddWO3YYmNuXQ==lTdWygeqoi5P3jQz").then(res => res.json()).then(data => {
            // console.log(data)
            let randomW = document.createElement("button")
            arrayOfW.appendChild(randomW)
            randomW.innerText = `${data.word}`
            randomW.style.marginTop = `${Math.random() * 10}px`
            randomW.style.marginLeft = `${Math.random() * 10}px`
            randomW.style.borderRadius = "70px";
            randomW.style.height = "50px"
            let word = `${data.word}`
            randomW.style.boxShadow = "inset 0 0 10px #000000"


        })
    }
}
fetch20Times()


})
