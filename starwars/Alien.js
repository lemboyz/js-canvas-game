class Alien {
    constructor(x,y) {
        this.x = x || canvas.width
        this.y = y || canvas.height * randomRange(1, 6) / 10
        this.velocity = {
            x: -10,
            y: 0
        }
        this.speed = 1
        this.size = 80
        this.text = "👾"
        this.timer = 0
        this.hp = 2 
        this.deleteFlag = false
    }
    getSize() {
        return this.size * this.y / canvas.height
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update(deltaTime) {
        this.timer += 1
        this.velocity.x = -deltaTime * this.speed * this.y / canvas.height
        this.velocity.y = Math.sin(this.timer*0.1) * 0.2 * deltaTime
        this.x += this.velocity.x
        this.y += this.velocity.y

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
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/10, this.velocity.x, this.velocity.y))
            if (Math.random()<0.1) {
                //all_objects.push(new PlayerHpItem(this.x, this.y))
            }
            return 2000
        }
        return 100
    }
}
