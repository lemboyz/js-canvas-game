const emoji = {
    bug: ['๐','๐','๐ฆ','๐','๐','๐','๐ฆ','๐ท๏ธ','๐ธ๏ธ','๐ฆ','๐ฆ','๐ฆ '],
    vegetable: ['๐','๐','๐ฅ','๐ฅ','๐ฝ','๐ถ๏ธ','๐ฅ','๐ฅฌ','๐ฅฆ','๐ง','๐ง'],
    zodiacanimal: ['๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐'],
    resort: ['๐๏ธ','๐','๐๏ธ','๐๏ธ','๐๏ธ','๐ฐ','๐','โฉ๏ธ','๐บ','๐ฟ','๐ผ','๐ฝ','๐ฏ'],
    mahjong: ['๐','๐ฒ','๐จ','๐ฅ','๐ง','๐ฃ','๐ข','๐ฆ','๐ฉ','๐ค','๐ช','๐','๐ฎ','๐ด'],

    sweet: ['๐ฆ','๐ง','๐จ','๐ฉ','๐ช','๐','๐ฐ','๐ง','๐ฅง','๐ซ','๐ฌ','๐ญ','๐ฎ','๐ฏ'],
    home: ['๐ช','๐ฝ','๐ฟ','๐','๐','๐งฏ','๐งด','๐งท','๐งน','๐งบ','๐งป','๐งผ','๐งฝ','๐ช','๐ช'],
    office: ['๐','๐ผ','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐'],
    bird: ['๐ฆ','๐ฆ','๐ง','๐ฆ','๐ฆฉ','๐','๐ฆ','๐ฆ','๐ฆข','๐ฆ','๐๏ธ','๐ฃ','๐ค','๐','๐ฆ','๐ฅ'],
    music: ['๐ป','๐ง','๐ผ','๐น','๐ต','๐ถ','๐ช','๐บ','๐ฅ','๐ท','๐ธ','๐ฏ','๐ค','๐๏ธ','๐','๐ป'],

    drink: ['๐ผ','๐ฅ','โ','๐ต','๐ถ','๐พ','๐ท','๐ธ','๐น','๐บ','๐ป','๐ฅ','๐ฅ','๐ฅค','๐ง','๐ง','๐ง'],
    fish: ['๐ฌ','๐ฆ','๐','๐ ','๐ก','๐ข','๐','๐ณ','๐','๐','๐ฆ','๐ฆ','๐ฆ','๐ฆ','๐','๐','๐ฆช'],
    fruit: ['๐','๐','๐','๐','๐','๐','๐','๐ฅญ','๐','๐','๐','๐','๐','๐','๐ฅ','๐ฅฅ','๐ฅ'],
    animal: ['๐ฆจ','๐ฆ','๐ซ','๐ช','๐ฆ','๐','๐ฆง','๐ฆ','๐โ๐ฆบ','๐ฆ','๐','๐','๐งธ','๐','๐ฟ๏ธ','๐','๐ฆ'],
    heart: ['๐','๐','๐','๐','๐','โฃ๏ธ','๐','๐','๐งก','๐','๐','๐','๐','๐ค','๐ค','๐ค','โ ๏ธ','โฆ๏ธ','โฃ๏ธ'],

    animalface: ['๐','๐','๐ถ','๐บ','๐ธ','๐น','๐ป','๐ฏ','๐ฎ','๐ท','๐','๐ญ','๐น','๐ฐ','๐ป','๐จ','๐ผ','๐ธ'],
    weather: ['โ','โ๏ธ','โ๏ธ','๐ค๏ธ','๐ฆ๏ธ','๐ง๏ธ','๐ฉ๏ธ','๐ช๏ธ','๐','๐ซ๏ธ','๐ฌ๏ธ','๐','โ๏ธ','โ','โฑ','๐','โก','โ๏ธ'],
    event: ['๐','๐','๐','๐','๐งจ','โจ','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐งง','๐','๐','๐ซ'],
    food: ['๐ฅ','๐','๐ฅฎ','๐ค','๐ผ','โ','๐ฑ','๐ญ','๐ฅช','๐','๐','๐','๐ฅฉ','๐ง','๐ฅ','๐ฅซ','๐ก','๐ง','๐','๐ฅฃ','๐ฅ'],
    plant: ['๐','๐ธ','๐ต๏ธ','๐น','๐ฅ','๐บ','๐ป','๐ผ','๐ท','๐ฑ','๐ฒ','๐ณ','๐ด','๐ต','๐พ','๐ฟ','๐','๐','๐','๐','๐'],

    head: ['๐ค','๐ค ','๐','๐ฟ','๐น','๐บ','๐คก','๐ฉ','๐ป','๐ฝ','๐พ','๐ค','๐','๐บ','๐ป','๐ฅถ','๐ฅณ','๐','๐ฅต','๐ด','๐คช'],
    tool: ['โ๏ธ','๐ฑ','๐ฒ','๐ป','โจ๏ธ','๐ฝ','๐พ','๐ฟ','๐','๐ผ','๐ธ','๐น','๐ฅ','๐','โ๏ธ','๐','๐ ','๐บ','๐ป','๐งญ','โฑ','โฒ','โฐ'],
    simple: ['๐ฒ','๐ถ','๐ท','๐บ','๐ป','๐ด','๐ ','๐ก','๐ข','๐ต','๐ฃ','๐ค','โซ','โช','๐ฅ','๐ง','๐จ','๐ฉ','๐ฆ','๐ช','๐ซ','โฌ','โฌ'],
    job: ['๐ฎ๐ปโโ๏ธ','๐ฎ๐ป','๐ท๐ปโโ๏ธ','๐ท๐ป','๐๐ปโโ๏ธ','๐ต๐ป','๐ฉ๐ปโโ๏ธ','๐ฉ๐ปโ๐พ','๐ฉ๐ปโ๐ณ','๐ฉ๐ปโ๐','๐ฉ๐ปโ๐ค','๐ฉ๐ปโ๐ซ','๐ฉ๐ปโ๐ญ','๐ฉ๐ปโ๐ป','๐ฉ๐ปโ๐ผ','๐ฉ๐ปโ๐ง','๐ฉ๐ปโ๐ฌ','๐ฉ๐ปโ๐จ','๐ฉ๐ปโ๐','๐จ๐ปโโ๏ธ','๐ฉ๐ปโ๐','๐จ๐ปโโ๏ธ','๐ฐ๐ป','๐คต๐ป','๐คด๐ป'],
    ghost: ['๐ง๐ปโโ๏ธ','๐ง๐ป','๐ธ','๐คด','๐ฆธ','๐ฆธโโ๏ธ','๐ฆน','๐ฆนโโ๏ธ','๐คถ','๐ง','๐','๐งโโ๏ธ','๐งโโ๏ธ','๐งโโ๏ธ','๐ง','๐งโโ๏ธ','๐ง','๐งโโ๏ธ','๐ง','๐งโโ๏ธ','๐ง','๐ง','๐งโโ๏ธ','๐ง','๐งโโ๏ธ','๐ผ'],

    vehicle: ['๐','๐','๐','๐','๐','๐','๐','๐','๐','๐๏ธ','๐','๐','๐','๐','๐','โฝ','๐ธ','๐ฎ','๐ฎโโ๏ธ','๐บ','๐ด','๐ต','๐๏ธ','๐ฆ','๐ฅ','๐ง'],
    cloth: ['๐','๐ถ๏ธ','๐ฅฝ','๐ฅผ','๐ฆบ','๐','๐','๐','๐งค','๐งฅ','๐งฆ','๐','๐','๐ฅป','๐ฉฑ','๐ฉณ','๐','๐','๐','๐ฅฟ','๐','๐ ','๐ก','๐ข','๐','๐','๐'],
    sport: ['โพ','๐ฏ','๐คธโโ๏ธ','๐คธโโ๏ธ','๐๏ธโโ๏ธ','๐๏ธ','๐','โท๏ธ','๐ฅ','๐ฅ','๐ฅ','๐','๐ฒ','๐','๐ด','๐ฅ','โธ๏ธ','๐คผ','๐ฅ','๐๏ธ','๐โโ๏ธ','๐','๐','โฝ','๐ฅ','๐ณ','๐','๐ธ'],
    body: ['๐','๐','๐','๐','๐ค','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐คณ','๐ช','๐ฆต','๐ฆถ','๐ฃ','๐ฆป','๐','๐ง ','๐ฆท','๐ฆด','๐','๐','๐','๐'],
    ball: ['๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','๐','โฝ','๐ฅ','โพ','๐','๐ช','๐','๐ต','๐','๐','๐ฏ','๐งญ']
}

// ้ๅณ็้ข
class LevelSelection {
    constructor() {
        this.visible = true
        this.levelBlocks = this.createLevelBlocks()
        this.selectedLevel = null
    }
    loadMaxPassedLevel() {
        let maxPassedLevel = localStorage.getItem('maxPassedLevel')
        if (maxPassedLevel) {
            maxPassedLevel = parseInt(maxPassedLevel)
        } else {
            maxPassedLevel = 0
        }
        return maxPassedLevel
    }
    saveMaxPassedLevel() {
        if (this.selectedLevel > this.loadMaxPassedLevel()) {
            localStorage.setItem('maxPassedLevel', this.selectedLevel)
        }
    }
    createLevelBlocks() {
        const levelData = [
            [emoji.bug         ,'sounds/bgm/1.mp3'],
            [emoji.vegetable   ,'sounds/bgm/2.mp3'],
            [emoji.zodiacanimal,'sounds/bgm/3.mp3'],
            [emoji.resort      ,'sounds/bgm/4.mp3'],
            [emoji.mahjong     ,'sounds/bgm/5.mp3'],

            [emoji.sweet       ,'sounds/bgm/6.mp3'],
            [emoji.home        ,'sounds/bgm/7.mp3'],
            [emoji.office      ,'sounds/bgm/8.mp3'],
            [emoji.bird        ,'sounds/bgm/9.mp3'],
            [emoji.music       ,'sounds/bgm/10.mp3'],

            [emoji.drink       ,'sounds/bgm/11.mp3'],
            [emoji.fish        ,'sounds/bgm/12.mp3'],
            [emoji.fruit       ,'sounds/bgm/13.mp3'],
            [emoji.animal      ,'sounds/bgm/14.mp3'],
            [emoji.heart       ,'sounds/bgm/15.mp3'],

            [emoji.animalface  ,'sounds/bgm/16.mp3'],
            [emoji.weather     ,'sounds/bgm/17.mp3'],
            [emoji.event       ,'sounds/bgm/18.mp3'],
            [emoji.food        ,'sounds/bgm/19.mp3'],
            [emoji.plant       ,'sounds/bgm/20.mp3'],

            [emoji.head        ,'sounds/bgm/21.mp3'],
            [emoji.tool        ,'sounds/bgm/22.mp3'],
            [emoji.simple      ,'sounds/bgm/23.mp3'],
            [emoji.job         ,'sounds/bgm/24.mp3'],
            [emoji.ghost       ,'sounds/bgm/25.mp3'],

            [emoji.vehicle     ,'sounds/bgm/26.mp3'],
            [emoji.cloth       ,'sounds/bgm/27.mp3'],
            [emoji.sport       ,'sounds/bgm/28.mp3'],
            [emoji.body        ,'sounds/bgm/29.mp3'],
            [emoji.ball        ,'sounds/bgm/30.mp3'],
        ]
        let levelBlocks = []
        let initX = 80
        let initY = 80
        let size = 80
        let n = 0
        for (let i=0; i<levelData.length; i++) {
            let x = initX + size*(i%5)*2
            let y = initY + +size*(Math.floor(i/5.0))*2
            let b = new LevelBlock(n, x, y, size, levelData[i][0], levelData[i][1], this)
            n += 1
            levelBlocks.push(b)
        }
        return levelBlocks
    }
    draw() {
        if (!this.visible) {return}
        // console.log('LevelSelection draw()')
        
        this.levelBlocks.forEach(b => {
            b.draw()
        })
    }
    update() {
        if (!this.visible) {return}
        // console.log('LevelSelection update()')
        this.levelBlocks.forEach(b => {
            b.update()
        })
    }
}

class LevelBlock {
    constructor(n, x, y, size, emoji_array, bgm, parent_pointer) {
        // console.log(`x:${x}, y:${y}, size:${size}, emoji_array:${emoji_array}, bgm:${bgm}`)
        this.n = n
        this.x = x
        this.y = y
        this.size = size
        this.emoji_array = emoji_array
        this.current_emoji = this.emoji_array[0]
        this.current_idx = 0
        this.bgm = bgm
        this.passed = false // ๆฌๅณๆฏๅฆๅทฒ้่ฟ
        this.elapsedTime = 0
        this.parent_pointer = parent_pointer
        this.sparkParticles = []
    }
    centerX() {
        return this.x + this.size/2
    }
    centerY() {
        return this.y + this.size/2
    }
    isValid() {
        return this.n <= 1 || (this.n-1 == this.parent_pointer.loadMaxPassedLevel()) || this.n<=this.parent_pointer.loadMaxPassedLevel()
    }
    draw() {
        if(!this.parent_pointer.visible) {return}
        ctx.save()
        
        ctx.translate(this.centerX(), this.centerY())
        if (this.isValid() && this.isUnderMouse()) {
            let scaleSize = 1 + Math.sin(this.elapsedTime*0.1)*0.1
            ctx.scale(scaleSize, scaleSize)
            ctx.shadowBlur = 20
            ctx.shadowColor = 'pink'

            if (this.elapsedTime % 5 == 0) {
                // this.current_emoji = this.emoji_array[this.elapsedTime % this.emoji_array.length]   
                this.current_idx = (this.current_idx + 1) % this.emoji_array.length
                this.current_emoji = this.emoji_array[this.current_idx]
            }
        }
        ctx.beginPath()
        ctx.fillStyle = this.isValid() ? "coral" : "gray"
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size)
        ctx.fill()

        ctx.strokeStyle = 'white'
        ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size)
        ctx.stroke()

        ctx.font = "45px Georgia"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        if (!this.isValid()) {
            ctx.globalAlpha = 0.2
        }
        
        ctx.fillText(this.current_emoji, 0, 0)
        ctx.closePath()
        ctx.restore()

        if (this.isValid() && this.isUnderMouse()) {
            if (this.elapsedTime % 10 == 0) {
                const sp = new SparkParticle(this.centerX(), this.centerY(), this.current_emoji)
                this.sparkParticles.push(sp)
            }
            this.sparkParticles.forEach(obj => {
                obj.draw()
            })
        }
    }
    update() {
        if(!this.parent_pointer.visible) {return}
        this.elapsedTime += 1

        this.sparkParticles.forEach(obj => {
            obj.update()
        })
        this.sparkParticles = this.sparkParticles.filter(obj => {
            return obj.isValid()
        })
    }
    isUnderMouse() {
        if(!this.parent_pointer.visible) {return}
        let mouseX = mouse.x
        let mouseY = mouse.y
        return mouseX>this.x && 
              mouseX<this.x+this.size && 
              mouseY>this.y && 
              mouseY<this.y+this.size 
    }
    onclick() {
        if(!this.parent_pointer.visible) {return}
        if(!this.isValid()) {
            playSound('sounds/invalid.mp3')
            return
        }
        console.log(`levelBlock onclick(): this.emoji_array:${this.emoji_array}, this.bgm:${this.bgm}`)
        initGameData(createBlocks(this.emoji_array), this.bgm)
        this.parent_pointer.visible = false
        this.parent_pointer.selectedLevel = this.n
    }
}

class SparkParticle {
    constructor(x, y, emoji_value) {
        this.x = x
        this.y = y
        this.emoji_value = emoji_value

        this.velocity = {
            x: (Math.random()<0.5 ? -1 : 1) * Math.random() * 3,
            y: (Math.random()<0.5 ? -1 : 1) * Math.random() * 3
        }
        this.alpha = 1
    }
    isValid() {
        return this.alpha > 0
    }
    draw() {
        if(!this.isValid()) {return}
        ctx.restore()
        ctx.save()
        ctx.font = `45px Georgia`
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.globalAlpha = this.alpha
        ctx.fillText(this.emoji_value, this.x, this.y)
        ctx.restore()
    }
    update() {
        if(!this.isValid()) {return}
        this.alpha -= 0.02
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}