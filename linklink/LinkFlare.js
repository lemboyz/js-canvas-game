class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.totalTime = 20
        this.remainTime = this.totalTime
        this.initR = 10
        this.r = this.initR
    }
    isValid() {
        return this.remainTime > 0
    }
    draw() {
        if(!this.isValid()) {return}
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = "red"
        //ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        //ctx.fill()
        ctx.font = `${this.r*3}px nsimsun`
        ctx.fillText('💥' , this.x, this.y)
        ctx.closePath()
        ctx.restore()
    }
    update() {
        if(!this.isValid()) {return}

        this.remainTime -= 1
        this.r = this.initR * this.remainTime / this.totalTime
    }
}

class LinkFlare {
    constructor(ep1, ep2) {
        this.x1 = ep1.centerX()
        this.y1 = ep1.centerY()

        this.x2 = ep2.centerX()
        this.y2 = ep2.centerY()

        this.particles = []
        if (this.x1 == this.x2) {
            let min_y = Math.min(this.y1, this.y2)
            let max_y = Math.max(this.y1, this.y2)
            for (let y=min_y; y<max_y; y=y+10) {
                this.particles.push(new Particle(this.x1, y))
            }
            return
        }
        if (this.y1 == this.y2) {
            let min_x = Math.min(this.x1, this.x2)
            let max_x = Math.max(this.x1, this.x2)
            for (let x=min_x; x<max_x; x=x+10) {
                this.particles.push(new Particle(x, this.y1))
            }
            return
        }
    }
    isValid() {
        return this.particles.length > 0
    }
    draw() {
        if (!this.isValid()) {return}
        this.particles.forEach(obj => {
            obj.draw()
        })
    }
    update() {
        if(!this.isValid()) {return}

        this.particles.forEach(obj => {
            obj.update()
        })
        this.particles = this.particles.filter(obj => {
            return obj.isValid()
        })
    }
}
