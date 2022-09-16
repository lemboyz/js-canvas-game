class BulletHitEffect {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.text = '✨'
        this.deleteFlag = false
        this.timer = 0
        playSound('sounds/hit.mp3', this.y/canvas.height)
    }
    draw() {
        drawText(this.text, this.x, this.y, this.size)
    }
    update(deltaTime) {
        this.timer += 1
        if (this.timer >= 10) {
            this.deleteFlag = true
        }
    }
}


class Bullet {
    constructor(x, y, vx, vy) {
        this.x = x
        this.y = y
        //this.text = "⚾"
        //this.text = "|"
        this.text = "💧"
        this.size = 30
        this.velocity = {
            x: vx || 0,
            y: vy || -2
        }
        this.deleteFlag = false
        this.timer = 0
        playSound('sounds/laser2.mp3', 0.5*this.y/canvas.height)
    }
    draw() {
        const size = this.size * this.y / canvas.height
        ctx.fillStyle = 'gray'
        drawText(this.text, this.x, this.y, size)
    }
    update(deltaTime) {
        this.timer += 1
        this.x += this.velocity.x * deltaTime
        let vy = this.velocity.y * deltaTime * this.y / canvas.height
        if(Math.abs(vy) < 0.2) {
            this.deleteFlag = true
            return
        }
        this.y += vy
        if (this.y < 0 || this.y > canvas.height || this.timer >= 600) {
            this.deleteFlag = true
            return
        }
        for (let i=0; i<all_objects.length; i++) {
            let obj = all_objects[i]
            if (typeof(obj.hit) === 'function' && typeof(obj.getSize) === 'function') { 
                if (distance(this, obj) <= obj.getSize()/2) {
                    let score = obj.hit()
                    scoreBoard.addScore(score)
                    all_objects.push(new Score(this.x, this.y, this.size, score))
                    this.deleteFlag = true
                    all_objects.push(new BulletHitEffect(this.x, this.y, this.size))
                    break
                }
            }
        }
    }
}
