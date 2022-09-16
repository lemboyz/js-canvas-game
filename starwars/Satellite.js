function createSatelliteGroup() {
    const formation = [
        "******",
        "*    *",
        "******"
    ]
    let x = -canvas.width
    let y = canvas.height * Math.random() * 0.3
    for (let i=0; i<formation.length; i++) {
        let line = formation[i]
        console.log(line)
        x = -canvas.width
        for (let j=0; j<line.length; j++) {
            let c = line[j]
            if (c == "*") {
                all_objects.push(new Satellite(x, y))
            }
            x += 100
        }
        y += 100
    }
}

class Satellite {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || canvas.height * Math.random()* 0.7
        this.speed = 0.5 
        this.vx = 0
        this.text = "🛰️"
        this.size = 200
        this.deleteFlag = false
        this.timer = 0
        this.livingTime = 60*20
        this.hp = 3 
    }
    getSize() {
        return this.size*this.y/canvas.height
    }
    draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.timer*0.005)
        drawText(this.text, 0, 0, this.getSize())
        ctx.restore()
    }
    update(deltaTime) {
        this.timer++
        let vx = deltaTime * this.speed * this.y / canvas.height
        this.vx = vx < 1 ? 1 : vx
        this.x += this.vx
        if (this.timer > this.livingTime) {
            this.deleteFlag = true
            return
        }
        if (this.timer % 120 == 0 && Math.random() < 0.5) {
            all_objects.push(new Fire(this.x, this.y))
        }
    }
    hit() {
        if (this.hp > 0) {
            this.hp -= 1
            this.y -= 5
        }

        if (this.hp == 0) {
            this.deleteFlag = true
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/10, this.vx, 0))
            if (Math.random() < 0.5) {
                all_objects.push(new SpeedItem(this.x, this.y))
            }else{
                all_objects.push(new RocketItem(this.x, this.y))
            }
            return 500
        }
        return 100
    }
}
class Fire {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocity = {
            x: 0,
            y: 0.5
        }
        this.text = '🔥'
        this.size = 100
        this.deleteFlag = false
        this.timer = 0
        this.hp = 1
    }
    getSize() {
        return this.size * this.y / canvas.height
    }
    draw() {
        const size = this.getSize()
        ctx.save()
        ctx.font = `${size}px Georgia`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'red'
        ctx.translate(this.x, this.y)
        ctx.rotate(this.timer*0.1)
        ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
    update(deltaTime) {
        this.timer++
        this.x += this.velocity.x
        let speed = deltaTime * this.velocity.y * this.y / canvas.height
        this.y += speed
        if (this.y > (canvas.height + this.size)) {
            this.deleteFlag = true
        }

        if(player && distance(this, player)<this.getSize()/2) {
            player.hit(this.vx*10, this.vy*10)
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
