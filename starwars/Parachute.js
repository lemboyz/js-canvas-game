class Parachute {
    constructor() {
        this.x = canvas.width * Math.random()
        this.y = 1
        this.speed = 0.5
        this.vy = 0
        this.size = 100
        this.text = '🪂'
        this.deleteFlag = false
        this.rotation = 0
        this.timer = 0
        this.hp = 1
    }
    getSize() {
        return this.size*this.y/canvas.height
    }
    draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        drawText(this.text, 0, 0, this.getSize())
        ctx.restore()
    }
    update(deltaTime) {
        this.timer++
        this.rotation = Math.sin(this.timer*0.05) * Math.PI/180 * 20
        this.vy = deltaTime * this.speed * this.y / canvas.height
        this.y += this.vy
        if (this.y > (canvas.height + this.size)) {
            this.deleteFlag = true
        }
    }
    hit() {
        if (this.hp > 0) {
            this.hp -= 1
            this.y -= 5
        }

        if (this.hp <= 0) {
            this.deleteFlag = true
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/10, 0, this.vy))
            all_objects.push(new GunItem(this.x, this.y))
            return 500
        }
        return 500
    }
}