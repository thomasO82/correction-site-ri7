const grid = [
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
]
const gameContainer = document.querySelector('#gameContainer')

function displayGrid() {
    gameContainer.innerHTML = ""
    grid.forEach(row => {
        const rowContainer = document.createElement('div')
        rowContainer.classList.add('row')
        gameContainer.appendChild(rowContainer)
        row.forEach(cell => {
            const cellContainer = document.createElement('div')
            cellContainer.classList.add('cell')
            rowContainer.appendChild(cellContainer)
            switch (cell) {
                case 1:
                    cellContainer.textContent = "V"
                    break;
                case 2:
                    cellContainer.textContent = "E"
                    break
                default:
                    break;
            }
        })
    })
}

document.addEventListener('keyup', (e) => {
    const ground = grid[grid.length - 1]
    const position = ground.indexOf(1)
    if (e.key == "ArrowLeft") {
        if (position > 0) {
            ground[position] = 0
            ground[position - 1] = 1
        }
    } else if (e.key == "ArrowRight") {
        if (position < ground.length - 1) {
            ground[position] = 0
            ground[position+ 1] = 1
        }
    }
    displayGrid()

})

displayGrid()