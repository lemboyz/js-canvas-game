function createShootingStarGroup() {
    let x = canvas.width * randomRange(3,10) / 10
    let y = canvas.height * randomRange(1,5) / 10
    all_objects.push(new ShootingStar(x, y))
    all_objects.push(new ShootingStar(x+100, y))
    all_objects.push(new ShootingStar(x+200, y))
    all_objects.push(new ShootingStar(x, y+100))
}

class ShootingStar { 
    constructor(x, y) {
        this.x = x || canvas.width
        this.y = y || canvas.height * Math.random() + 1
        this.speed = 0.5 
        this.velocity = {
            x: 0,
            y: 0
        }
        this.size = 100
        //this.text = '🌠'
        this.text = '☄️'
        this.deleteFlag = false
        this.hp = 1
    }
    getSize() {
        return this.size*this.y/canvas.height
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = this.y/canvas.height
        drawText(this.text, this.x, this.y, this.getSize())
        ctx.restore()
    }
    update(deltaTime) {
        this.velocity.x = -deltaTime * this.speed * this.y / canvas.height
        this.velocity.y = -this.velocity.x
        this.x += this.velocity.x
        this.y += this.velocity.y

        if (this.x < (-this.size) || this.y > (canvas.height+this.size)) {
            this.deleteFlag = true
            return
        }

        if(player && distance(this, player)<this.getSize()/2) {
            player.hit(this.velocity.x*10, this.velocity.y*10)
            this.hit()
        }
    }
    hit() {
        if (this.hp > 0) {
            this.hp -= 1
            this.y -= 5
        }

        if (this.hp <= 0) {
            this.deleteFlag = true
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/10))
            return 5000
        }
        return 0
    }
}
