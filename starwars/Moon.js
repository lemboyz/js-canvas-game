class Moon {
    constructor() {
        this.x = canvas.width/2
        this.y = canvas.height/3
        this.initY = this.y
        this.text = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘']
        this.frame = 0
        this.speed = 0.4
        this.size = 300
        this.deleteFlag = false
        this.timer = 0
    }
    getSize() {
        return this.size * this.y / canvas.height
    }
    draw() {
        const size = this.getSize()
        let text = this.text[this.frame]
        drawText(text, this.x, this.y, size)
    }
    update(deltaTime) {
        this.timer += 1
        this.frame = Math.floor(this.timer*0.1) % 8
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x > canvas.width) {
            this.x = canvas.width
        }
        if (this.y < 0) {
            this.y = 0
        }
        if (this.y > canvas.height) {
            this.y = canvas.height
        }
        if (this.timer % 10 == 0) {
            this.y += 1
        }
        if (this.y >= this.initY) {
            this.y = this.initY
        }
        if (this.timer % 200 == 0) {
            /*
            for (let i=0; i<10; i++) {
                all_objects.push(new FallingBall(this.x, this.y))
            }*/
            this.throwFallingBall()
        }

        if(player && distance(this, player)<(this.getSize()+player.getSize())/2) {
            player.hit(0, 20)
            this.hit()
        }
    }
    hit() {
        this.y -= 2
        if (Math.random()<0.2) {
            all_objects.push(new ScoreItem(this.x, this.y))
        }
        return 100
    }
    throwFallingBall() {
        all_objects.push(new FallingBall(this.x, this.y, 0, 0))
        all_objects.push(new FallingBall(this.x, this.y, -1, 0))
        all_objects.push(new FallingBall(this.x, this.y, 1, 0))
    }
}

class FallingBall {
    constructor(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.velocity = {
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 10,
        }
        this.g = 0.2
        this.size = 20
        this.text = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘']
        this.frame = Math.floor(Math.random()*this.text.length)
        this.deleteFlag = false
        this.timer = 0
    }
    getSize() {
        return this.size * this.y / canvas.height
    }
    draw() {
        const text = this.text[this.frame]
        drawText(text, this.x, this.y, this.getSize())
    }
    update() {
        this.timer += 1
        this.frame = Math.floor(this.timer*0.5) % 8
        this.velocity.y += this.g
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.y > (canvas.height+this.getSize())) {
            this.deleteFlag = true
        }

        if (player && distance(this, player)<=player.getSize()/2) {
            this.deleteFlag = true
            player.hit(0, 20)
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/2, this.velocity.x, this.velocity.y))
        }
    }
}
