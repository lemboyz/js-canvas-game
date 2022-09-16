class ScoreBoard {
    constructor() {
        this.x = 50
        this.y = 50
        this.score = 0
        this.deleteFlag = false
    }
    draw() {
        ctx.save()
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.font = `30px Verdana`
        ctx.fillStyle = 'white'
        ctx.fillText(`${this.score}`, this.x, this.y)
        ctx.restore()
    }
    update() {
    }
    addScore(score) {
        this.score += score
    }
}

class Score {
    constructor(x, y, size, score) {
        this.x = x
        this.y = y
        this.size = size
        this.score = score
        this.timer = 0
        this.deleteFlag = false
        //playSound('sounds/eatcoin2.mp3')
    }
    draw() {
        ctx.fillStyle = 'white'
        drawText(`${this.score}`, this.x, this.y, this.size)
    }
    update(deltaTime) {
        this.y -= 1
        this.timer += 1
        if (this.timer >= 30) {
            this.deleteFlag = true
        }
    }
}