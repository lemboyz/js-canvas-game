function random(min, max) {
    if (arguments.length < 2) {
        max = min
        min = 0
    }
    if (min > max) {
        let hold = max
        max = min
        min = hold
    }
    return Math.floor(Math.random()*(max - min + 1)) + min
}

function maxOrbit(x, y, movrange) {
    let max = Math.max(x, y)
    let diameter = Math.round(Math.sqrt(max*max + max*max))
    return diameter / movrange
}

function starsky(id, starscolor, starsamount, starsradius, movrange, speed, trailing) {
    "use strict";
    let canvas = document.getElementById(id)
    let ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    let hue = starscolor // 230
    let stars = []
    let count = 0
    let maxStars = starsamount

    let canvas2 = document.createElement('canvas')
    let ctx2 = canvas2.getContext('2d')
    canvas2.width = 100
    canvas2.height = 100
    let half = canvas2.width/2
    let gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
    gradient2.addColorStop(0.025, '#ccc')
    gradient2.addColorStop(0.1 , `hsl(${hue}, 61%, 33%)`)
    gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`)
    gradient2.addColorStop(1, 'transparent')

    ctx2.fillStyle = gradient2
    ctx2.beginPath()
    ctx2.arc(half, half, half, 0, Math.PI*2)
    ctx2.fill()


    var Star = function() {
        this.orbitRadius = random(maxOrbit(w, h, movrange))
        this.radius = random(starsradius, this.orbitRadius) / 8
        this.orbitX = w/2
        this.orbitY = h/2
        this.timePassed = random(0, maxStars)
        this.speed = random(this.orbitRadius) / speed
        this.alpha = random(2, 10) / 10

        stars[count] = this
        count++
    }

    Star.prototype.draw = function() {
        let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
        let y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
        let twinkle = random(10)

        if (twinkle == 1 && this.alpha > 0) {
            this.alpha -= 0.05
        }else if (twinkle == 2 && this.alpha < 1) {
            this.alpha += 0.05
        }

        ctx.globalAlpha = this.alpha
        ctx.drawImage(canvas2, x-this.radius/2, y-this.radius/2, this.radius, this.radius)
        this.timePassed += this.speed
    }

    for (let i=0; i<maxStars; i++) {
        new Star()
    }

    function animation() {
        console.log('animation()')
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = trailing
        ctx.fillStyle = `hsla(${hue}, 64%, 6%, 2)`
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter'
        for (let i=0; i<stars.length; i++) {
            stars[i].draw()
        }

        requestAnimationFrame(animation)
    }

    animation()
}

let canvasId = "starsky"
let color = 230
let starsamount = 100
let starsradius = 60
let movrange = 2
let speed = 1000000
let trailing = 0.5
starsky(canvasId, color, starsamount, starsradius, movrange, speed, trailing)
