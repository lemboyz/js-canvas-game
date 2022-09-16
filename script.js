const canvas = document.querySelector('#canvas1') 
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
let all_objects = []
const blocks = []
let pageIcon = null
let scoreBoard = null
let player = null
let moon = null
let timer = 0
let pause = false
let pressed_keys = {}
document.onkeydown = function(e) {
    if (e.key == ' ') {
        pause = !pause
        return
    }
    pressed_keys[e.key] = 1 
}
document.onkeyup = function(e) {
    delete pressed_keys[e.key]
}
document.body.onresize = function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function distance(obj1, obj2) {
    const dx = obj1.x - obj2.x
    const dy = obj1.y - obj2.y
    return Math.sqrt(dx*dx + dy*dy)
}

function drawText(text, x, y, size) {
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${size}px Verdana`
    ctx.fillText(text, x, y)
    ctx.restore()
}

class ScoreBoard {
    constructor() {
        this.x = 50
        this.y = 50
        this.score = 0
        this.deleteFlag = false
    }
    draw() {
        ctx.save()
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.font = `30px Verdana`
        ctx.fillStyle = 'white'
        ctx.fillText(`${this.score}`, this.x, this.y)
        ctx.restore()
    }
    update() {
    }
    addScore(score) {
        this.score += score
    }
}

class ExplosionParticle {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.deleteFlag = false
        this.velocity = {
            x: Math.random()*10*(Math.random()<0.5?1:-1),
            y: Math.random()*10*(Math.random()<0.5?1:-1)
        }
        this.speed = Math.random()*5
        this.timer = 0
        //this.text = Math.random()<0.5?'*':'+'
        this.text = Math.random()<0.5?'*':'💥'
    }
    draw() {
        drawText(this.text, this.x, this.y, this.size)
    }
    update() {
        this.timer += 1
        this.x += this.velocity.x * this.speed
        this.y += this.velocity.y * this.speed
        if (this.timer >= 30) {
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

class Score {
    constructor(x, y, size, score) {
        this.x = x
        this.y = y
        this.size = size
        this.score = score
        this.timer = 0
        this.deleteFlag = false
        //playSound('sounds/eatcoin2.mp3')
    }
    draw() {
        ctx.fillStyle = 'white'
        drawText(`${this.score}`, this.x, this.y, this.size)
    }
    update(deltaTime) {
        this.y -= 1
        this.timer += 1
        if (this.timer >= 30) {
            this.deleteFlag = true
        }
    }
}

class Bullet {
    constructor(x, y, vx, vy) {
        this.x = x
        this.y = y
        //this.text = "⚾"
        this.text = "|"
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
        ctx.fillStyle = "yellow"
        drawText(this.text, this.x, this.y, size)
    }
    update(deltaTime) {
        this.x += this.velocity.x * deltaTime
        this.y += this.velocity.y * deltaTime * this.y / canvas.height
        if (this.x < 0 || this.x > canvas.width) {
            this.deleteFlag = true
            return
        }
        if (this.y < 0 || this.y > canvas.height) {
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
                }
            }
        }
    }
}

class Player {
    constructor() {
        this.x = canvas.width/2
        this.y = canvas.height * 0.90 
        this.text = "✈️"
        this.speed = 0.4
        this.size = 80
        this.deleteFlag = false
        this.fireInterval = 0
        this.timer = 0
        this.hp = 1
        this.bulletLevel = 1 
    }
    getSize() {
        return this.size * this.y / canvas.height
    }
    draw() {
        if (this.y>canvas.height*0.7) {
            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = 'gray'
            ctx.globalAlpha = 0.2
            ctx.ellipse(this.x-4, this.y+70, this.size/2, this.size/7, 0, 0, Math.PI*2) 
            ctx.fill()
            ctx.restore()
        }
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(-45*Math.PI/180)
        drawText(this.text, 0, 0, this.getSize())
        ctx.restore()
    }
    update(deltaTime) {
        this.timer++
        this.fireInterval += 1
        const distance = deltaTime * this.speed * this.y/canvas.height
        if (pressed_keys['a']) {
            this.x -= distance
        }
        if (pressed_keys['d']) {
            this.x += distance
        }
        if (pressed_keys['w']) {
            this.y -= distance
        }
        if (pressed_keys['s']) {
            this.y += distance
        }
        if (pressed_keys['j']==1) {
            this.shootBullet()
        }
        if (pressed_keys['k']==1 && this.fireInterval>=40) {
            all_objects.push(new Rocket(this.x, this.y))
            this.fireInterval = 0
        }

        //this.y += Math.sin(this.timer*0.1)*0.5
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
    }
    shootBullet() {
        if (this.bulletLevel == 1) {
            if (this.fireInterval >= 20) {
                all_objects.push(new Bullet(this.x, this.y-40))
                this.fireInterval = 0
            }
        }else if (this.bulletLevel == 2) {
            if (this.fireInterval >= 15) {
                all_objects.push(new Bullet(this.x-this.getSize()*0.6, this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.5, this.y-40))
                this.fireInterval = 0
            }
        }else if (this.bulletLevel == 3) {
            if (this.fireInterval >= 15) {
                all_objects.push(new Bullet(this.x-this.getSize()*0.1, this.y-40))
                all_objects.push(new Bullet(this.x-this.getSize()*0.8, this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.6, this.y-40))
                this.fireInterval = 0
            }
        }else if (this.bulletLevel == 4) {
            if (this.fireInterval >= 15) {
                all_objects.push(new Bullet(this.x-this.getSize()*0.4, this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.3, this.y-40))
                all_objects.push(new Bullet(this.x-this.getSize()*0.6, this.y-40, -0.1))
                all_objects.push(new Bullet(this.x+this.getSize()*0.5, this.y-40, 0.1))
                this.fireInterval = 0
            }
        }else if (this.bulletLevel >= 5) {
            if (this.fireInterval >= 10) {
                all_objects.push(new Bullet(this.x-this.getSize()*0.4, this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.3, this.y-40))
                all_objects.push(new Bullet(this.x-this.getSize()*0.6, this.y-40, -0.1))
                all_objects.push(new Bullet(this.x+this.getSize()*0.5, this.y-40, 0.1))
                this.fireInterval = 0
            }
        }
    }
    addSpeed() {
        if (this.speed <= 0.8) {
            this.speed *= 1.1
        }
    }
    hit() {
        this.hp -= 1
        if (this.hp <= 0) {
            this.deleteFlag = true
        }
    }
}

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
        if (this.timer % 100 == 0) {
            this.y += 1
        }
        if (this.y >= this.initY) {
            this.y = this.initY
        }
    }
    hit() {
        this.y -= 2
        if (Math.random()<0.3) {
            all_objects.push(new ScoreItem(this.x, this.y))
        }
        return 100
    }
}

class Satellite {
    constructor() {
        this.x = 0
        this.y = canvas.height * Math.random()* 0.7
        this.speed = 0.5 
        this.vx = 0
        this.text = "🛰️"
        this.size = 200
        this.deleteFlag = false
        this.timer = 0
        this.hp = 5
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
        if (this.x < 0 || this.x > (canvas.width+this.size)) {
            this.deleteFlag = true
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

        if (this.hp <= 0) {
            this.deleteFlag = true
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/10, this.vx, 0))
            all_objects.push(new SpeedItem(this.x, this.y))
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

class Rocket {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width
        this.y = y || canvas.height 
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
        let vy = deltaTime * this.speed * this.y / canvas.height
        if (vy < 1) {
            vy = 1
        }
        this.y -= vy
        if (this.y < 0) {
            this.deleteFlag = true
        }
    }
}

class Ufo {
    constructor() {
        this.x = canvas.width
        this.y = canvas.height * Math.random() * 0.6
        this.speed = 1
        this.vx = 0
        this.size = 100
        this.text = '🛸'
        this.deleteFlag = false
        this.timer = 0
        this.hp = 10
    }
    getSize() {
        return this.size*this.y/canvas.height
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update(deltaTime) {
        this.timer++
        let vx = -deltaTime * this.speed * this.y / canvas.height
        this.vx = vx
        this.x += this.vx
        if (this.x < -this.size) {
            this.deleteFlag = true
        }
        if (this.timer % 360 == 0) {
            all_objects.push(new ElectricSparkle(this.x, this.y))
        }
    }
    hit() {
        if (this.hp > 0) {
            this.hp -= 1
            this.y -= 5
        }

        if (this.hp <= 0) {
            this.deleteFlag = true
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/10, this.vx, 0))
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
        this.size = 80
        let speed = Math.random() * 0.01
        speed = speed < 0.5 ? 0.001 : speed
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

class ShootingStar { 
    constructor() {
        this.x = canvas.width
        this.y = canvas.height * Math.random() + 1
        this.speed = 1
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
        let vx = deltaTime * this.speed * this.y / canvas.height
        let vy = vx
        this.x -= vx
        this.y += vy

        if (this.x < (0-this.size) || this.y > (canvas.height+this.size)) {
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
            all_objects.push(new ExplosionEffect(this.x, this.y, this.size/10))
            return 5000
        }
        return 0
    }
}

class Airplane {
    constructor() {
        this.x = 0
        this.y = canvas.height * Math.random()
        this.speed = 1 
        this.size = 80
        this.text = '🛩️'
        this.deleteFlag = false
    }
    getSize() {
        return this.size*this.y/canvas.height
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update(deltaTime) {
        let vx = deltaTime * this.speed * this.y / canvas.height
        if (vx < 1) {
            vx = 1
        }
        let vy = -vx
        this.x += vx
        this.y += vy

        if (this.x > canvas.width+this.size || this.y < 0) {
            this.deleteFlag = true
        }
    }
}

class IceBlock {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.text = '🧊'
        this.deleteFlag = false
        this.timer = 0
        this.initDirection = Math.random()<0.5 ? 1 : -1
        this.hp = 5
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = this.hp / 5
        drawText(this.text, this.x, this.y, this.size)
        ctx.restore()
    }
    update(deltaTime) {
        this.timer += 1
        this.y += Math.sin(this.timer*0.1)*0.5*this.initDirection
    }
    hit() {
        this.hp -= 1
        if (this.hp <= 0) {
            this.deleteFlag = true
        }
    }
}

class PageIcon {
    constructor() {
        this.timer = 0
        this.text = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘']
        this.frame = 0
        this.deleteFlag = false
    }
    draw() {
        setEmojiFavicon(this.text[this.frame])
    }
    update() {
        this.timer++
        if (this.timer > 30) {
            this.frame += 1
            if (this.frame > this.text.length-1) {
                this.frame = 0
            }
            this.timer = 0
        }
    }
}

class GunItem {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
        }
        this.size = 80 
        this.text = '🔫'
        this.deleteFlag = false
        this.timer = 0
    }
    getSize() {
        let size = this.size * this.y / canvas.height
        if (size < 10) {
            size = 10
        }
        return size
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update() {
        this.timer += 1
        if (this.timer >= 1200) {
            this.deleteFlag = true
        }
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.x < 0 || this.x > canvas.width) {
            this.velocity.x *= -1
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.velocity.y *= -1
        }
        
        if (player && distance(this, player)<=this.getSize()/2) {
            playSound('sounds/powerup.mp3')
            player.bulletLevel += 1
            this.deleteFlag = true
        }
    }
}

class ScoreItem {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocity = {
            x: (Math.random()-0.5)*10,
            y: -Math.random()*10
        }
        this.size = 80
        this.level = Math.floor(Math.random()*10)
        this.text = '💎'
        this.timer = 0
        this.deleteFlag = false
    }
    getSize() {
        let size = this.size * this.y / canvas.height
        if (size < 20) {
            size = 20
        }
        return size
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update() {
        this.timer += 1
        this.velocity.y += 0.2
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.y > (canvas.height+this.getSize())) {
            this.deleteFlag = true
        }

        if (player && distance(this, player)<=this.getSize()/2) {
            this.deleteFlag = true
            let score = 1000
            scoreBoard.addScore(score)
            all_objects.push(new Score(this.x, this.y, this.getSize(), score))
            playSound('sounds/eatcoin2.mp3')
        }
    }
}

class SpeedItem {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
        }
        this.size = 80
        this.text = '🌀'
        this.deleteFlag = false
        this.timer = 0
    }
    getSize() {
        let size = this.size * this.y / canvas.height
        return size < 10 ? 10 : size
    }
    draw() {
        drawText(this.text, this.x, this.y, this.getSize())
    }
    update() {
        this.timer += 1
        if (this.timer >= 1200) {
            this.deleteFlag = true
        }
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.x < 0 || this.x > canvas.width) {
            this.velocity.x *= -1
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.velocity.y *= -1
        }

        if (player && distance(this, player) <= this.getSize()/2) {
            playSound('sounds/powerup.mp3')
            player.addSpeed()
            this.deleteFlag = true
        }
    }
}

function createBackground() {
    //let grd = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
    let grd = ctx.createLinearGradient(0,0,0,canvas.height)
    grd.addColorStop(0, 'black')
    grd.addColorStop(0.7, "MidnightBlue")
    grd.addColorStop(0.8, "coral")
    grd.addColorStop(1, "white")
    return grd
}

let lastTime = 0
function gameloop(timeStamp) {
    if (!pause) {
        timer++
        let deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.fillStyle = createBackground()
        ctx.fillRect(0, 0, canvas.width, canvas.height)
 
        if (scoreBoard == null) {
            scoreBoard = new ScoreBoard()
            all_objects.push(scoreBoard)
        }

        if (player == null) {
            player = new Player()
            all_objects.push(player)
        }
        if (moon == null) {
            moon = new Moon()
            all_objects.push(moon)
        }
        if (pageIcon == null) {
            pageIcon = new PageIcon()
            all_objects.push(pageIcon)
        }
        if (timer == 1) {
            const size = 40
            for (let x=size/2; x<canvas.width; x+=size*1.5) {
                all_objects.push(new IceBlock(x, canvas.height-size, size))
            }
        }

        if (timer % 240 == 0) {
            all_objects.push(new ShootingStar())
            all_objects.push(new Satellite())
            all_objects.push(new Parachute())
            all_objects.push(new Ufo())
            all_objects.push(new Airplane())
        }

        all_objects.forEach(obj => {
            obj.draw()
            obj.update(deltaTime)
        })
        all_objects = all_objects.filter(obj => obj.deleteFlag == false)
        if (timer % 1000 == 0) {
            console.log(`all_objects.length: ${all_objects.length}`)
        }
    }
    requestAnimationFrame(gameloop)
}
gameloop()
