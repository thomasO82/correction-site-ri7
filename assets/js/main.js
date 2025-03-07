const grid = [
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
]
let interShoot = null
let interEnnemy = null
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
                    cellContainer.innerHTML = "<img src='./assets/images/vaisseau.png' width='100'>"
                    break;
                case 2:
                    cellContainer.textContent = "E"
                    break
                case 3 : 
                    cellContainer.textContent = "I"    
                default:
                    break;
            }
        })
    })
}

document.addEventListener('keyup', (e) => {
    console.log(e.key);
    
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
    } else if (e.key == " ") {
        grid[grid.length - 2][position] = 3
    }
    displayGrid()
})

function mooveShoot() {
   interShoot = setInterval(()=>{
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 3) {
                if (i == 0) {
                    grid[i][j] = 0
                }else if(grid[i-1][j] == 2){
                    grid[i-1][j] = 0
                    grid[i][j] = 0
                }else{
                    grid[i-1][j] = 3
                    grid[i][j] = 0
                }
            }
        }
    }
    displayGrid()
   },200) 
}

function mooveEnnemy() {
    interEnnemy = setInterval(()=> {
        checkEnemy()
        for (let i = grid.length - 1; i >= 0; i--) {
            for (let j = grid[i].length-1; j >= 0; j--) {
                if (grid[i][j] == 2) {
                    if (i == grid.length - 1) {
                        return gameOver()
                    }
                    if (j == grid[i].length - 1) {
                        grid[i][j] = 0
                        grid[i+1][0] = 2
                    }else{
                        grid[i][j] = 0
                        grid[i][j+1] = 2
                    }  
                }
            } 
        }        
        displayGrid()
    },1000)
}

function gameOver(){
   clearInterval(interEnnemy)
   clearInterval(interShoot)

}

function win(){
    clearInterval(interEnnemy)
   clearInterval(interShoot)
   console.log("gagné");
   
}

function checkEnemy(){
    let finded = false
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 2) {
                finded = true
                break
            }
        }
    }
    if (!finded) {
        win()
    }
}

displayGrid()
mooveShoot()
mooveEnnemy()