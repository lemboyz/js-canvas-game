class Rocket {
    constructor(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.velocity = {
            x: vx || 0,
            y: vy || -1
        }
        this.speed = 2
        this.text = '🚀'
        this.size = 80
        this.deleteFlag = false
        playSound('sounds/rocket.mp3', 0.5)
    }
    draw() {
        ctx.save()
        const size = this.size*this.y/canvas.height
        ctx.font = `${size}px Georgia`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'red'
        ctx.translate(this.x, this.y)
        ctx.rotate(-45*Math.PI/180)
        ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
    update(deltaTime) {
        let vy = deltaTime * this.velocity.y * this.speed * this.y / canvas.height
        if (vy > -1) {
            vy = -1
        }
        this.y += vy
        if (this.y < 0) {
            this.deleteFlag = true
            return
        }
        for (let i=0; i<all_objects.length; i++) {
            let obj = all_objects[i]
            if (getObjectClassname(obj) != "Player" && 
                  typeof(obj.hit) === 'function' && typeof(obj.getSize) === 'function') {
                if (distance(this, obj) < obj.getSize()/2) {
                    obj.hit()
                    this.explode()
                    this.deleteFlag = true
                    break
                }
            }
        }
    }
    explode() {
        for (let i=0; i<50; i++) {
            all_objects.push(new RocketPiece(this.x, this.y, this.size/5))
        }
    }
}


class RocketPiece {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.velocity = {
            x: Math.random()*20 - 10,
            y: Math.random()*20 - 10
        }
        this.g = 0 
        this.size = size * Math.random() + 5 
        this.color = Math.random()<0.5 ? "red" : "gray"
        this.deleteFlag = false
        this.timer = 0
        this.livingTime = 60 * 2 
        this.text = "🔥"
    }
    getRotateValue() {
        //let value = -Math.PI/2 - Math.atan(-this.velocity.y/this.velocity.x)
        let value = -Math.PI/2 + Math.atan2(this.velocity.y, this.velocity.x) 
        return value
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = (this.livingTime - this.timer)/this.timer
        ctx.translate(this.x, this.y)
        //ctx.rotate(this.timer*0.1)
        ctx.rotate(this.getRotateValue())
        drawText(this.text, 0, 0, this.size)
        ctx.restore()
    }
    update() {
        this.timer += 1
        if (this.timer > this.livingTime) {
            this.deleteFlag = true
            return
        }
        this.velocity.y += this.g
        this.x += this.velocity.x
        this.y += this.velocity.y
        for (let i=0; i<all_objects.length; i++) {
            let obj = all_objects[i]
                if (obj != player  &&
                  typeof(obj.hit) === 'function' && typeof(obj.getSize) === 'function') {
                if (distance(this, obj) < obj.getSize()/2) {
                    obj.hit()
                    this.deleteFlag = true
                    break
                }
            }
        }
    }
}
