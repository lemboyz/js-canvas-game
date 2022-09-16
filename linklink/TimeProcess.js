class TimeProcess {
    constructor(x, y, width, height) {
        this.x = x // 左上角的x
        this.y = y // 左上角的y
        this.width = width
        this.height = height
        this.totalTime = 12000
        this.remainTime = this.totalTime
    }
    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 3
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        
        ctx.globalAlpha = this.closeToOver() ? Math.abs(Math.sin(this.remainTime*0.1)) : 1
        const green_color = '#13a10e'
        const red_color = '#f03a17'
        ctx.fillStyle = this.closeToOver() ? red_color : green_color
        let width = this.width*this.remainTime/this.totalTime
        ctx.fillRect(this.x, this.y, width, this.height)
        ctx.closePath()
        ctx.restore()
    }
    update() {
        if(playing && this.remainTime > 0) {
            this.remainTime -= 1
            if(this.remainTime/this.totalTime == 0.3) {
                playSound('sounds/timealarm.mp3')
            }
        }
    }
    isTimeOver() {
        return this.remainTime <= 0
    }
    closeToOver() {
        return this.remainTime/this.totalTime < 0.3
    }
}

function createTimeProcess() {
    const timeProcess = new TimeProcess(80, 20, 80*10, 40)
    return timeProcess
}