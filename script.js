window.addEventListener("DOMContentLoaded", () => {
    // let arrayOfW = document.getElementById("arrayOfWords");


    function fetch20Times() {
        for(let i = 1; i <= 20; i++) {
         fetch("https://api.api-ninjas.com/v1/randomword/?key=puHp1RTi4iddWO3YYmNuXQ==lTdWygeqoi5P3jQz").then(res => res.json()).then(data => {
            // console.log(data)


        })
    }
}
fetch20Times()


})
