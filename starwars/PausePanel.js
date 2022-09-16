class PausePanel {
    constructor() {
        this.width = 160 * 2.5
        this.height = 90 * 2.5
        this.x = canvas.width/2 - this.width/2    // 外框左上角的x
        this.y = canvas.height/2 - this.height/2  // 外框左上角的y
    }
    show() {
        ctx.save()
        ctx.fillStyle = "#252526"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "#d3c6a0"
        drawText("PAUSE", canvas.width/2, canvas.height/2-30, 60)
        drawText("Press [SPACE] to Continue", canvas.width/2, canvas.height/2+30, 12)
        ctx.restore()
    }
}
