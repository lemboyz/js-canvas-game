function createUfoGroup() {
    const formation = [
        "*****",
        "*   *",
        "*****"
    ]
    let x = canvas.width
    let y = canvas.height * Math.random() * 0.3
    for (let i=0; i<formation.length; i++) {
        let line = formation[i]
        console.log(line)
        x = canvas.width
        for (let j=0; j<line.length; j++) {
            let c = line[j]
            if (c == "*") {
                all_objects.push(new Ufo(x, y))
            }
            x += 100
        }
        y += 100
    }
}

class Ufo {
    constructor(x, y) {
        this.x = x || canvas.width
        this.y = y || canvas.height * Math.random() * 0.6
        this.speed = 1
        this.velocity = {
            x: 0,
            y: 0
        }
        this.size = 100
        this.text = '🛸'
        this.deleteFlag = false
        this.timer = 0
        this.hp = 5
    }
    getSize() {
        return this.size*this.y/canvas.height
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update(deltaTime) {
        this.timer++
        this.velocity.x = -deltaTime * this.speed * this.y / canvas.height

        this.x += this.velocity.x
        if (this.x < -this.size) {
            this.deleteFlag = true
        }
        if (this.timer % 240 == 0) {
            all_objects.push(new ElectricSparkle(this.x, this.y))
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
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/10, this.velocity.x, this.velocity.y))
            if (Math.random()<0.1) {
                all_objects.push(new PlayerHpItem(this.x, this.y))
            }
            return 1000
        }
        return 100
    }
}
class ElectricSparkle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.text = '⚡'
        this.size = 40
        let speed = 0.005
        this.velocity = {
            x: (player.x - this.x) * speed,
            y: (player.y - this.y) * speed
        }
        this.deleteFlag = false
        this.hp = 1
    }
    getSize() {
        let randomInt = 4 * (Math.random())
        return this.size * this.y / canvas.height * randomInt
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update(deltaTime) {
        this.x += this.velocity.x * deltaTime*0.1
        this.y += this.velocity.y * deltaTime*0.1
        if (this.x < 0 || this.x > canvas.width) {
            this.deleteFlag = true
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.deleteFlag = true
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
            return 100
        }
        return 100
    }
}
