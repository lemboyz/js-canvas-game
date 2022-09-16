
class IceBlock {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.text = '🧊'
        this.deleteFlag = false
        this.timer = 0
        this.initDirection = Math.random()<0.5 ? 1 : -1
        this.hp = 5
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = this.hp / 5
        drawText(this.text, this.x, this.y, this.size)
        ctx.restore()
    }
    update(deltaTime) {
        this.timer += 1
        this.y += Math.sin(this.timer*0.1)*0.5*this.initDirection
    }
    hit() {
        this.hp -= 1
        if (this.hp <= 0) {
            this.deleteFlag = true
        }
    }
}