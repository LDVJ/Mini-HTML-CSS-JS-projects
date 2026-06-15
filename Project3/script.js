const cards = document.querySelectorAll(".card");
const boards = document.querySelectorAll(".board");

let draggedCard = null;
cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
        draggedCard = card;
    });
    
    card.addEventListener("dragend", () => {
        draggedCard = null;
        boards.forEach(b => b.classList.remove("over"));
    }); 
});
boards.forEach(board => {
    board.addEventListener("dragover", e => e.preventDefault())
    board.addEventListener("dragenter", function(e) {
        e.preventDefault();
        this.classList.add("over");
    })
    board.addEventListener("dragleave", function() {
        this.classList.remove("over");
    })
    board.addEventListener("drop", function() {
        const container = this.querySelector(".cards-container");
        container.append(draggedCard); // append moves it automatically
        this.classList.remove("over");
    })
})
