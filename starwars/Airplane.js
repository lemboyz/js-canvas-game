class Airplane {
    constructor() {
        this.x = 0
        this.y = canvas.height * Math.random()
        this.speed = 1 
        this.size = 80
        this.text = '🛩️'
        this.deleteFlag = false
    }
    getSize() {
        return this.size*this.y/canvas.height
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update(deltaTime) {
        let vx = deltaTime * this.speed * this.y / canvas.height
        if (vx < 1) {
            vx = 1
        }
        let vy = -vx
        this.x += vx
        this.y += vy

        if (this.x > canvas.width+this.size || this.y < 0) {
            this.deleteFlag = true
        }
    }
}