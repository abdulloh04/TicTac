const game = document.querySelector('.game--container')
const restart = document.querySelector(".game--restart")
const statusH2 = document.querySelector(".game--status")

let errorArrays = []
let x = [], xbool = false
let zero = [], zerobool = false
let div = []

for (let key in game.childNodes) {
    if (key % 2)
        div.push(game.childNodes[key]);
}



function comparisons(arr) {

    if (
        arr.includes(0) && arr.includes(1) && arr.includes(2) ||
        arr.includes(3) && arr.includes(4) && arr.includes(5) ||
        arr.includes(6) && arr.includes(7) && arr.includes(8)
    ) return true

    else if (
        arr.includes(0) && arr.includes(3) && arr.includes(6) ||
        arr.includes(1) && arr.includes(4) && arr.includes(7) ||
        arr.includes(2) && arr.includes(5) && arr.includes(8)
    ) return true

    else if (
        arr.includes(0) && arr.includes(4) && arr.includes(8) ||
        arr.includes(6) && arr.includes(4) && arr.includes(2)
    ) return true

}


class Tictac {
    robot(bool) {

        if (bool) return

        let random = [Math.floor(Math.random() * 8)]
        
        

        while (errorArrays.includes(random[random.length - 1]) && errorArrays.length != 9) {
            random.push(Math.floor(Math.random() * 8))
            console.log('Loop: ', random);
        }

        let random_lastEl = random[random.length - 1]

        div[random_lastEl].textContent = 'O'

        zero.push(random_lastEl)
        errorArrays.push(random_lastEl)

        if (comparisons(zero)) {
            xbool = true
            setTimeout(() => {

                game.innerHTML = null
                statusH2.textContent = "Player 0 has won"
                alert("Player 0 has won")
            }, 100)
        }
    }

    user(data, bool) {
        if (bool) return

        if (errorArrays.includes(+data.dataset.cellIndex)) {
            return alert("Boshqasini bosing")
        }

        data.textContent = 'X'
        x.push(+data.dataset.cellIndex)
        errorArrays.push(+data.dataset.cellIndex)

        if (comparisons(x)) {
            zerobool = true
            setTimeout(() => {
                game.innerHTML = null
                statusH2.textContent = "Player X has won"
                alert("Player X has won")
            }, 100)
        }
    }
}

let tictac = new Tictac()


game.onclick = e => {

    tictac.user(e.target, xbool)

    if (errorArrays.length == 9 && !zerobool && !xbool) {
        setTimeout(() => {
            game.innerHTML = null
            statusH2.textContent = "Draw"
            alert("Draw")
        }, 100)
    }

    tictac.robot(zerobool)
    
}

