class Keyboard {
    constructor() {
        this.width = canvas.width * 0.25
        this.height = this.width * 9 / 16
        this.x = canvas.width * 0.5 - this.width/2 
        this.y = canvas.height* 0.5 - this.height
        this.deleteFlag = false
    }
    draw() {
        ctx.save()
        ctx.fillStyle = "#efefef"
        //ctx.fillRect(this.x, this.y, this.width, this.height)
        this.drawAllKeys()
        ctx.restore()
    }
    drawAllKeys() {
        let formation = [
            " W     ",
            "ASD  JK"
        ]
        const keySize = this.width*0.15
        let x = this.x + keySize/2
        let y = this.y + keySize/2
        for (let i=0; i<formation.length; i++) {
            x = this.x + keySize/2
            let line = formation[i]
            for (let j=0; j<line.length; j++) {
               let key = line[j]
               if (key != " ") {
                   drawKey(x, y, keySize, key) 
               }
               x += keySize
            }
            y += keySize
        }
    }
    update() {
    }
}

function drawKey(x, y, size, key) {
    drawText("⬜", x, y, size)
    ctx.fillStyle = "black"
    drawText(key, x, y, size*0.7)
}

