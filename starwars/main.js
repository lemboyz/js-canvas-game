const canvas = document.querySelector('#canvas1') 
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
const all_objects = []
const blocks = []
let pageIcon = null
let scoreBoard = null
let player = null
let moon = null
let timer = 0
let pause = true
const pausePanel = new PausePanel()
const pressed_keys = {}
document.onkeydown = function(e) {
    if (e.key == ' ') {
        pause = !pause
        pausePanel.show()
        return
    }
    pressed_keys[e.key] = 1 
}
document.onkeyup = function(e) {
    pressed_keys[e.key] = false
}
document.body.onresize = function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function getClassnameCount() {
    const out = {}
    for (let i=0; i<all_objects.length; i++) {
        let obj = all_objects[i]
        let typename = getObjectClassname(obj)
        if (out.hasOwnProperty(typename)) {
            out[typename] = out[typename] + 1
        }else{
            out[typename] = 1
        }
    }
    return out
}

function createBackground() {
    //let grd = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
    const grd = ctx.createLinearGradient(0,0,0,canvas.height)
    grd.addColorStop(0, 'black')
    grd.addColorStop(0.7, "MidnightBlue")
    grd.addColorStop(0.8, "coral")
    grd.addColorStop(1, "white")
    return grd
}

function createStartButton() {
    const btn = document.createElement("input")
    btn.type = "button"
    btn.value = "Click to start"
    btn.style.backgroundColor = 'white'
    btn.style.color = 'black'
    btn.style.fontSize = '2em'
    btn.style.width = '300px'
    btn.style.height = '100px'
    btn.style.position = "absolute"
    let left = canvas.width/2 - parseInt(btn.style.width)/2
    let top = canvas.height/2 - parseInt(btn.style.height)/2
    btn.style.left = left + 'px'
    btn.style.top = top + 'px'
    btn.style.zIndex = 999999999
    btn.addEventListener("click", function() {
        pause = false
        this.style.display = 'none'
        //playSound('sounds/victory.mp3')
        playSound('sounds/SunRisesAgain.mp3')
        //canvas.requestFullscreen()
    })
    document.body.appendChild(btn)
    btn.focus()
}

function showAllKeys() {
    const kb = new Keyboard()
    kb.draw()
}

function init() {
    //ctx.fillStyle = createBackground()
    //ctx.fillRect(0, 0, canvas.width, canvas.height)

    showAllKeys()
    createStartButton()

    scoreBoard = new ScoreBoard()
    all_objects.push(scoreBoard)

    player = new Player()
    all_objects.push(player)

    moon = new Moon()
    all_objects.push(moon)

    pageIcon = new PageIcon()
    all_objects.push(pageIcon)

    const size = 40
    for (let x=size/2; x<canvas.width; x+=size*1.5) {
        all_objects.push(new IceBlock(x, canvas.height-size, size))
    }
}
init()

let lastTime = 0
function gameloop(timeStamp) {
    if (!pause && player.hp>0) {
        let deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        //resumeSound('sounds/victory.mp3')
        resumeSound('sounds/SunRisesAgain.mp3')
        timer++
        //ctx.fillStyle = createBackground()
        //ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.clearRect(0,0,canvas.width,canvas.height)

        if (timer % (60*4) == 0) {
            all_objects.push(new ShootingStar())
            all_objects.push(new Satellite())
            all_objects.push(new Parachute())
            all_objects.push(new Ufo())
            all_objects.push(new Airplane())
            all_objects.push(new Alien())
        }
        if (timer % 1200 == 0) {
            createUfoGroup()
        }
        if (timer % 1300 == 0) {
            createSatelliteGroup()
        }
        if (timer % 170 == 0) {
            createShootingStarGroup()
        }

        all_objects.forEach(obj => {
            obj.draw()
            obj.update(deltaTime)
        })
        //all_objects = all_objects.filter(obj => obj.deleteFlag == false)
        all_objects.map((obj, idx) => {
            if (obj.deleteFlag == true) {
                all_objects.splice(idx, 1)
            }
        })
        if (timer % 600 == 0) {
            console.log(`all_objects.length: ${all_objects.length}`)
            console.log(getClassnameCount())
        }

        if (player && player.hp <= 0) {
            const gameover = new Gameover(scoreBoard.score)
            gameover.show()
        }
    }else{
        //pauseSound('sounds/victory.mp3')
        pauseSound('sounds/SunRisesAgain.mp3')
    }
    requestAnimationFrame(gameloop)
}
gameloop()
