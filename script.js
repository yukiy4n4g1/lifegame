const lifeGameTable = document.getElementsByClassName("lifegame")[0];
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const createBtn = document.getElementById("createBtn");
const heightText = document.getElementById("heightText");
const widthText = document.getElementById("widthText");
let gridWidth = 32;
let gridHeight = 32;

const initCells = (height, width) => {
    for (let i = 0; i < height; i++) {
        const newRow = document.createElement("tr");
        for (let j = 0; j < width; j++) {
            const td = document.createElement("td");
            td.classList.add("cell")
            td.addEventListener("click", (e) => {
                e.target.classList.toggle("live");
            });
        
            newRow.appendChild(td);
        }
        lifeGameTable.appendChild(newRow);
    }
    return document.getElementsByClassName("cell");
}

const updateGen = (cells, width) => {
    let newArray = Array(cells.length).fill(0);
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("live")) {
            newArray[i] += 10;
            newArray[i - width] += 1;
            newArray[i + width] += 1;
            if (i % width != 0) {
                newArray[i - 1] += 1;
                newArray[i+width - 1] += 1;
                newArray[i-width - 1] += 1;
            }
            if (i % width != width - 1) {
                newArray[i + 1] += 1;
                newArray[i + width + 1] += 1;
                newArray[i - width + 1] += 1;
            }
        }
    }
    newArray = newArray.map((n) => n == 12 || n == 13 || n == 3);

    for (let i = 0; i < cells.length; i++){
        if (newArray[i]) {
            cells[i].classList.add("live");
        } else {
            cells[i].classList.remove("live");
        }
    }
} 

let cells = initCells(gridHeight, gridWidth);

nextBtn.addEventListener("click", () => {
    updateGen(cells, gridWidth);
});

resetBtn.addEventListener("click", () => {
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("live");
    }
});

createBtn.addEventListener("click", () => {
    gridHeight = Number(heightText.value);
    gridWidth = Number(widthText.value);
    while (lifeGameTable.firstChild) {
        lifeGameTable.removeChild(lifeGameTable.firstChild);
    }
    cells = initCells(gridHeight, gridWidth);
});