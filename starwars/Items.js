class BaseItem {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
        }
        this.g = 0
        this.size = 80 
        this.text = 'undefined'
        this.deleteFlag = false
        this.timer = 0
        this.livingTime = 1200
    }
    getSize() {
        let size = this.size * this.y / canvas.height * Math.abs(Math.sin(timer*0.05))
        if (size < 20) {
            size = 20
        }
        return size
    }
    draw() {
        let livePercent = (this.livingTime - this.timer) / this.timer
        let alpha = 1
        if (livePercent < 0.3) {
            alpha = Math.abs(Math.sin(this.timer))
        }
        ctx.save()
        ctx.globalAlpha = alpha
        drawText(this.text, this.x, this.y, this.getSize())
        ctx.restore()
    }
    update() {
        this.timer += 1
        if (this.timer >= this.livingTime) {
            this.deleteFlag = true
        }
        this.velocity.y += this.g
        this.x += this.velocity.x
        this.y += this.velocity.y

        if (this.x < 0 || this.x > canvas.width) {
            this.velocity.x *= -1
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.velocity.y *= -1
        }
    }
}

class GunItem extends BaseItem {
    constructor(x, y) {
        super(x,y)
        this.text = '🔫'
    }
    update() {
        super.update()
        
        if (player && distance(this, player)<=player.getSize()/2) {
            playSound('sounds/powerup.mp3')
            player.addBulletLevel()
            this.deleteFlag = true
        }
    }
}

class RocketItem extends BaseItem {
    constructor(x, y) {
        super(x,y)
        this.text = "🚀"
    }
    update() {
        super.update()
        if (player && distance(this, player)<=player.getSize()/2) {
            playSound('sounds/powerup.mp3')
            player.addRocket()
            this.deleteFlag = true
        }
    }
}

class ScoreItem extends BaseItem {
    constructor(x, y) {
        super(x,y)
        this.text = '💎'
        this.g = 0.2
    }
    update() {
        this.timer += 1
        this.velocity.y += this.g
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.y > (canvas.height+this.getSize())) {
            this.deleteFlag = true
        }

        if (player && distance(this, player)<=player.getSize()/2) {
            this.deleteFlag = true
            let score = 1000
            scoreBoard.addScore(score)
            all_objects.push(new Score(this.x, this.y, this.getSize(), score))
            playSound('sounds/eatcoin2.mp3')
        }
    }
}

class SpeedItem extends BaseItem {
    constructor(x, y) {
        super(x,y)
        this.text = "🛢"
    }
    update() {
        super.update()

        if (player && distance(this, player) <= player.getSize()/2) {
            playSound('sounds/powerup.mp3')
            player.addSpeed()
            this.deleteFlag = true
        }
    }
}

class PlayerHpItem extends BaseItem {
    constructor(x, y) {
        super(x, y)
        this.text = '✈️'
    }
    update() {
        super.update()

        if (player && distance(this, player) <= player.getSize()/2) {
            playSound('sounds/1up.mp3')
            player.hp += 1
            this.deleteFlag = true
        }
    }
}
