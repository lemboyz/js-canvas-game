class MouseEffect {
    constructor(mouse) {
        this.mouse = mouse
        this.elapsedTime = 0
        this.radius = 30
    }
    draw() {
        ctx.save()
        const x = this.mouse.x
        const y = this.mouse.y
        let r = this.radius * Math.abs(Math.sin(this.elapsedTime*0.1))
        ctx.fillStyle = 'coral'
        ctx.globalAlpha = 0.5
        ctx.arc(x,y,r,0,Math.PI*2)
        ctx.fill()
        ctx.restore()
    }
    update() {
        this.elapsedTime += 1
    }
}