// 道具按钮

// 爆炸火光
class BlastFire {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = 10
        this.initR = this.r
        this.velocity = {
            x: Math.random()*4 - 2,
            y: Math.random()*4 - 2
        }
    }
    isValid() {
        return this.r > 0
    }
    draw() {
        if(!this.isValid()) {return}
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = Math.random()<0.8 ? 'red' : 'white'
        ctx.globalAlpha = this.r/this.initR
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
    update() {
        if(!this.isValid()) {return}

        this.r -= 0.3
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}
class Bomb {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.value = '💣'
        this.bgColor = '#dddddd'
        this.count = 2
        this.mouseHover = false
        this.blastFires = []
    }
    isValid() {
        return this.count > 0
    }
    draw() {
        ctx.save()
        // 背景方块
        ctx.fillStyle = this.mouseHover ? 'purple' : this.bgColor
        ctx.fillRect(this.x, this.y, this.size, this.size)
        ctx.fill()

        // 边框
        ctx.strokeStyle = 'black'
        ctx.strokeRect(this.x, this.y, this.size, this.size)
        ctx.stroke()

        // 炸弹
        ctx.font = "45px Georgia"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(this.value, this.x+this.size/2, this.y+this.size/2)

        // 炸弹剩余数量
        ctx.font = "16px Georgia"
        ctx.fillStyle = "black"
        ctx.fillText(this.count, this.x+this.size*0.8, this.y+this.size*0.8)
        ctx.restore()

        this.blastFires.forEach(obj => {
            obj.draw()
        })
    }
    update() {
        if (this.isMouseHover()) {
            this.mouseHover = true
        } else {
            this.mouseHover = false
        }

        this.blastFires.forEach(obj => {
            obj.update()
        })
        this.blastFires = this.blastFires.filter(
            function(obj) {
                return obj.isValid()
            }
        )
    }
    isMouseHover() {
        return mouse.x > this.x && mouse.x < this.x+this.size && 
               mouse.y > this.y && mouse.y < this.y+this.size
    }
    onclick() {
        if (!this.isValid()) {return}

        let currentBlockValue = ''
        for (let n=0; n<blocks.length; n++) {
            let block = blocks[n]
            let value = block.value
            if (block.isValid()) {
                this.createBlastFire(block.centerX(), block.centerY())
                block.vanish()
                currentBlockValue = block.value
                for (let m=n+1; m<blocks.length; m++) {
                    let b = blocks[m]
                    if (b.isValid() && b.value == value) {
                        this.createBlastFire(b.centerX(), b.centerY())
                        b.vanish()
                        break
                    }
                }
                this.count -= 1
                break
            }
        }
        return currentBlockValue
    }
    createBlastFire(x, y) {
        for (let i=0; i<50; i++) {
            this.blastFires.push(new BlastFire(x, y))
        }
        playSound('sounds/blast.mp3')
    }
}

// 打乱按钮
class Shuffle {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.value = '♻️'
        this.bgColor = '#dddddd'
        this.count = 2
        this.mouseHover = false
    }
    isValid() {
        return this.count > 0
    }
    draw() {
        ctx.save()
        // 背景方块
        ctx.fillStyle = this.mouseHover ? 'purple' : this.bgColor
        ctx.fillRect(this.x, this.y, this.size, this.size)
        ctx.fill()

        // 边框
        ctx.strokeStyle = 'black'
        ctx.strokeRect(this.x, this.y, this.size, this.size)
        ctx.stroke()

        // 打乱图案
        ctx.font = "45px Georgia"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(this.value, this.x+this.size/2, this.y+this.size/2)

        // 剩余数量
        ctx.font = "16px Georgia"
        ctx.fillStyle = "black"
        ctx.fillText(this.count, this.x+this.size*0.8, this.y+this.size*0.8)
        ctx.restore()
    }
    update() {
        if (this.isMouseHover()) {
            this.mouseHover = true
        } else {
            this.mouseHover = false
        }
    }
    isMouseHover() {
        return mouse.x > this.x && mouse.x < this.x+this.size && 
               mouse.y > this.y && mouse.y < this.y+this.size
    }
    onclick() {
        if (!this.isValid()) {return}
        
        playSound('sounds/shuffle.mp3')
        this.count -= 1
        const validBlocks = []
        for (let n=0; n<blocks.length; n++) {
            let block = blocks[n]
            if (block.isValid()) {
                validBlocks.push(block)
            }
        }
        for (let n=0; n<validBlocks.length; n++) {
            let block1 = validBlocks[n]
            let x = Math.floor(Math.random()*validBlocks.length)
            let block2 = validBlocks[x]
            let tmp_value = block1.value
            block1.value = block2.value
            block2.value = tmp_value
        }
    }
}

// 背景音乐开关
class BgmSwitch {
    constructor(x,y,size) {
        this.x = x
        this.y = y
        this.size = size
        this.value = '🎵'
        this.bgColor = '#dddddd'
        this.mouseHover = false
    }
    draw() {
        // 背景方块
        ctx.fillStyle = this.mouseHover ? 'purple' : this.bgColor
        ctx.fillRect(this.x, this.y, this.size, this.size)
        ctx.fill()

        // 边框
        ctx.strokeStyle = 'black'
        ctx.strokeRect(this.x, this.y, this.size, this.size)
        ctx.stroke()

        // 图案
        ctx.font = "45px Georgia"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(this.value, this.x+this.size/2, this.y+this.size/2)
        if (!bgmAudio || bgmAudio.volume == 0) {
            ctx.fillText("❌", this.x+this.size/2, this.y+this.size/2)
        }
    }
    update() {
        if (this.isMouseHover()) {
            this.mouseHover = true
        } else {
            this.mouseHover = false
        }
    }
    isMouseHover() {
        return mouse.x > this.x && mouse.x < this.x+this.size && 
               mouse.y > this.y && mouse.y < this.y+this.size
    }
    onclick() {
        playSound('sounds/bgmswitch.mp3')
        switchBgm()
    }
}