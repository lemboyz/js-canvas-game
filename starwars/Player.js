class Player {
    constructor() {
        this.x = canvas.width/2
        this.y = canvas.height * 0.90 
        this.text = "✈️"
        this.speed = 0.4
        this.size = 80
        this.deleteFlag = false
        this.fireInterval = 0
        this.rocketInterval = 0
        this.timer = 0
        this.hp = 3
        this.bulletLevel = 1 
        this.rocketCount = 3
        this.up_pressing_timer = 0
        this.shakingTime = 0
    }
    getSize() {
        return this.size * this.y / canvas.height
    }
    drawHp() {
        for (let i=0; i<this.hp; i++) {
            drawText("✈️", 50*i+50, canvas.height - 80, 30)
        }
    }
    drawRocketCount() {
        for (let i=0; i<this.rocketCount; i++) {
            let x = canvas.width - 50 - 50*i
            drawText("🚀", x, canvas.height - 80, 30)
        }
    }
    draw() {
        this.drawHp()
        this.drawRocketCount()
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
        this.drawTailFire()
        
    }
    drawTailFire() {
        if (this.up_pressing_timer<=0) {
            return
        }
        if (this.up_pressing_timer%2==0) {
            if (this.up_pressing_timer > 0) {
                drawText("💥", this.x-this.getSize()/18, this.y+this.getSize()*0.5, this.getSize()/2)
            }
            if (this.up_pressing_timer > 30) {
                drawText("💥", this.x-this.getSize()/18, this.y+this.getSize()*0.7, this.getSize()/3)
            }
            if (this.up_pressing_timer > 60) {
                drawText("💥", this.x-this.getSize()/18, this.y+this.getSize()*0.9, this.getSize()/4)
            }
        }
    }
    update(deltaTime) {
        this.timer++
        this.fireInterval += 1
        this.rocketInterval += 1
        if (this.shakingTime > 0) {
            this.shakingTime -= 1
            this.y += Math.sin(this.shakingTime)*3
            return
        }
        const distance = deltaTime * this.speed * this.y/canvas.height
        if (pressed_keys['a'] || pressed_keys['A']) {
            this.x -= distance
        }
        if (pressed_keys['d'] || pressed_keys['D']) {
            this.x += distance
        }
        if (pressed_keys['w'] || pressed_keys['W']) {
            this.y -= distance
            this.up_pressing_timer += 1
        }else{
            this.up_pressing_timer -= 1
            if (this.up_pressing_timer < 0) {
                this.up_pressing_timer = 0
            }
        }
        if (pressed_keys['s'] || pressed_keys['S']) {
            this.y += distance
        }
        if (pressed_keys['j']==1 || pressed_keys['J']) {
            this.shootBullet()
        }
        if ((pressed_keys['k']==1 || pressed_keys['K']) && this.rocketInterval>=30) {
            console.log('ready to launchRocket()')
            this.rocketInterval = 0
            this.launchRocket()
        }

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
        }else if (this.bulletLevel == 5) {
            if (this.fireInterval >= 10) {
                all_objects.push(new Bullet(this.x-this.getSize()*0.4, this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.3, this.y-40))
                all_objects.push(new Bullet(this.x-this.getSize()*0.6, this.y-40, -0.1))
                all_objects.push(new Bullet(this.x+this.getSize()*0.5, this.y-40, 0.1))
                this.fireInterval = 0
            }
        }else if (this.bulletLevel == 6) {
            if (this.fireInterval >= 10) {
                all_objects.push(new Bullet(this.x-this.getSize()*0.6, this.y-40, -0.1))
                all_objects.push(new Bullet(this.x-this.getSize()*0.4, this.y-40))
                all_objects.push(new Bullet(this.x                   , this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.3, this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.5, this.y-40, 0.1))
                this.fireInterval = 0
            }
        }else if (this.bulletLevel >= 7) {
            if (this.fireInterval >= 8) {
                all_objects.push(new Bullet(this.x-this.getSize()*0.8, this.y-40, -0.1))
                all_objects.push(new Bullet(this.x-this.getSize()*0.6, this.y-40, -0.1))
                all_objects.push(new Bullet(this.x-this.getSize()*0.4, this.y-40))
                all_objects.push(new Bullet(this.x                   , this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.3, this.y-40))
                all_objects.push(new Bullet(this.x+this.getSize()*0.5, this.y-40, 0.1))
                all_objects.push(new Bullet(this.x+this.getSize()*0.7, this.y-40, 0.1))
                this.fireInterval = 0
            }
        }
    }
    launchRocket() {
        if (this.rocketCount >= 1) {
            this.rocketCount -= 1
            all_objects.push(new Rocket(this.x, this.y))
        }else{
            playSound("sounds/norocket.mp3")
        }
    }
    addSpeed() {
        if (this.speed <= 0.8) {
            this.speed *= 1.1
        }else{
            scoreBoard.addScore(2000)
            all_objects.push(new Score(this.x, this.y, this.getSize()/2, 2000))
        }
    }
    addBulletLevel() {
        this.bulletLevel += 1
        if (this.bulletLevel > 5) {
            scoreBoard.addScore(2000)
            all_objects.push(new Score(this.x, this.y, this.getSize()/2, 2000))
        }
    }
    addRocket() {
        this.rocketCount += 1
        if (this.rocketCount > 5) {
            this.rocketCount = 5
            scoreBoard.addScore(5000)
            all_objects.push(new Score(this.x, this.y, this.getSize()/2, 5000))
        }
    }
    hit(vx, vy) {
        this.x += (vx || 0)
        this.y += (vy || 20)
        this.hp -= 1
        if (this.hp <= 0) {
            this.deleteFlag = true
            return
        }
        this.shakingTime = 30
    }
}
