
class ExplosionParticle {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.g = 0.5
        this.size = size
        this.deleteFlag = false
        this.velocity = {
            x: Math.random()*10*(Math.random()<0.5?1:-1),
            y: Math.random()*10*(Math.random()<0.5?1:-1)
        }
        this.speed = Math.random()*5
        this.timer = 0
        this.livingTime = 10
        this.text = Math.random()<0.5?'*':'💥'
    }
    draw() {
        drawText(this.text, this.x, this.y, this.size)
    }
    update() {
        this.timer += 1
        this.velocity.y += this.g
        this.x += this.velocity.x * this.speed
        this.y += this.velocity.y * this.speed
        if (this.timer >= this.livingTime) {
            this.deleteFlag = true
        }
    }
}

class ExplosionEffect {
    constructor(x, y, size, vx, vy) {
        this.x = x
        this.y = y
        this.size = size
        this.vx = vx || 0
        this.vy = vy || 0
        this.deleteFlag = false
        this.timer = 0
        playSound('sounds/exploded.mp3', this.y/canvas.height)
    }
    draw() {
    }
    update() {
        this.timer += 1
        if (this.timer <= 20) {
            this.x += this.vx
            this.y += this.vy
            all_objects.push(new ExplosionParticle(this.x, this.y, this.size))
        }else{
            this.deleteFlag = true
        }
    }
}
