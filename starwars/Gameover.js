class Gameover {
    constructor(score) {
        this.score = score || 0
        this.width = 160 * 2
        this.height = 90 * 2
        this.x = canvas.width/2 - this.width/2    // 外框左上角的x
        this.y = canvas.height/2 - this.height/2  // 外框左上角的y
    }
    show() {
        playSound('sounds/gameover.mp3')
        ctx.save()
        ctx.fillStyle = "#252526"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "#d3c6a0"
        drawText("GAME OVER", canvas.width/2, canvas.height/2-30, 30)
        drawText('🏆 '+this.score+' 🏆', canvas.width/2, canvas.height/2+30, 30)
        ctx.restore()
    }
}