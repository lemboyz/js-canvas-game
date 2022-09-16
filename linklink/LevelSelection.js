const emoji = {
    bug: ['🐞','🐌','🦋','🐛','🐜','🐝','🦗','🕷️','🕸️','🦂','🦟','🦠'],
    vegetable: ['🍆','🍅','🥔','🥕','🌽','🌶️','🥒','🥬','🥦','🧄','🧅'],
    zodiacanimal: ['🐁','🐂','🐅','🐇','🐉','🐍','🐎','🐐','🐒','🐓','🐕','🐖'],
    resort: ['🏜️','🌋','🏖️','🏝️','🏛️','🏰','🛕','⛩️','👺','🗿','🗼','🗽','🏯'],
    mahjong: ['🀄','🎲','🀨','🀥','🀧','🀣','🀢','🀦','🀩','🀤','🀪','🃏','🔮','🎴'],

    sweet: ['🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯'],
    home: ['🚪','🚽','🚿','🛁','🛒','🧯','🧴','🧷','🧹','🧺','🧻','🧼','🧽','🪑','🪒'],
    office: ['📌','💼','📁','📅','📆','📇','📈','📉','📊','📍','📎','📏','📐','🔑','🔒','🔒'],
    bird: ['🦉','🦆','🐧','🐦','🦩','🐓','🦚','🦜','🦢','🦅','🕊️','🐣','🐤','🐔','🦃','🐥'],
    music: ['🎻','🎧','🎼','🎹','🎵','🎶','🪕','🎺','🥁','🎷','🎸','📯','🎤','🎙️','🔔','📻'],

    drink: ['🍼','🥛','☕','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃','🥤','🧃','🧉','🧊'],
    fish: ['🐬','🦈','🐟','🐠','🐡','🐢','🐋','🐳','🐙','🐚','🦀','🦞','🦐','🦑','🐊','🐉','🦪'],
    fruit: ['🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓','🥝','🥥','🥑'],
    animal: ['🦨','🦔','🐫','🐪','🦌','🐈','🦧','🦍','🐕‍🦺','🦙','🐏','🐆','🧸','🐘','🐿️','🐄','🦘'],
    heart: ['💘','💝','💖','💞','💕','❣️','💔','💟','🧡','💛','💚','💙','💜','🤎','🖤','🤍','♠️','♦️','♣️'],

    animalface: ['🙉','🙊','🐶','🐺','😸','😹','😻','🐯','🐮','🐷','🐗','🐭','🐹','🐰','🐻','🐨','🐼','🐸'],
    weather: ['⛅','☁️','⛈️','🌤️','🌦️','🌧️','🌩️','🌪️','🌀','🌫️','🌬️','🌈','☂️','☔','⛱','🌂','⚡','❄️'],
    event: ['🎃','🎄','🎆','🎇','🧨','✨','🎈','🎉','🎊','🎋','🎍','🎎','🎏','🎐','🎑','🧧','🎀','🎁','🎫'],
    food: ['🥐','🍕','🥮','🍤','🍼','☕','🍱','🌭','🥪','🍔','🍗','🍖','🥩','🧀','🥗','🥫','🍡','🧆','🍟','🥣','🥞'],
    plant: ['💐','🌸','🏵️','🌹','🥀','🌺','🌻','🌼','🌷','🌱','🌲','🌳','🌴','🌵','🌾','🌿','🍀','🍁','🍂','🍃','🍄'],

    head: ['🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','👽','👾','🤖','🎃','😺','😻','🥶','🥳','😄','🥵','😴','🤪'],
    tool: ['⌚️','📱','📲','💻','⌨️','💽','💾','💿','📀','📼','📸','📹','🎥','📞','☎️','📟','📠','📺','📻','🧭','⏱','⏲','⏰'],
    simple: ['🔲','🔶','🔷','🔺','🔻','🔴','🟠','🟡','🟢','🔵','🟣','🟤','⚫','⚪','🟥','🟧','🟨','🟩','🟦','🟪','🟫','⬛','⬜'],
    job: ['👮🏻‍♀️','👮🏻','👷🏻‍♀️','👷🏻','💂🏻‍♀️','🕵🏻','👩🏻‍⚕️','👩🏻‍🌾','👩🏻‍🍳','👩🏻‍🎓','👩🏻‍🎤','👩🏻‍🏫','👩🏻‍🏭','👩🏻‍💻','👩🏻‍💼','👩🏻‍🔧','👩🏻‍🔬','👩🏻‍🎨','👩🏻‍🚒','👨🏻‍✈️','👩🏻‍🚀','👨🏻‍⚖️','👰🏻','🤵🏻','🤴🏻'],
    ghost: ['🧝🏻‍♀️','🧝🏻','👸','🤴','🦸','🦸‍♂️','🦹','🦹‍♂️','🤶','🧑','🎅','🧙‍♀️','🧙‍♂️','🧝‍♀️','🧝','🧝‍♂️','🧛','🧟‍♀️','🧟','🧞‍♀️','🧞','🧜','🧜‍♂️','🧚','🧚‍♂️','👼'],

    vehicle: ['🚙','🚁','🚌','🚝','🚕','🚜','🚑','🚚','🚖','🏎️','🚃','🚓','🚗','🚊','🚒','⛽','🚸','👮','👮‍♀️','🛺','🛴','🛵','🏍️','🚦','🚥','🚧'],
    cloth: ['👓','🕶️','🥽','🥼','🦺','👔','👕','👖','🧤','🧥','🧦','👗','👘','🥻','🩱','🩳','👙','👚','👟','🥿','👞','👠','👡','👢','👒','🎓','💍'],
    sport: ['⚾','🎯','🤸‍♀️','🤸‍♂️','🏌️‍♀️','🏌️','🏇','⛷️','🥇','🥈','🥉','🏐','🚲','🏆','🚴','🥏','⛸️','🤼','🥊','🏋️','🏊‍♀️','🏈','🏀','⚽','🥎','🎳','🏓','🏸'],
    body: ['👋','🖐','🖖','👌','🤟','👆','👇','👍','👎','👊','👏','🙌','🙏','💅','🤳','💪','🦵','🦶','👣','🦻','👃','🧠','🦷','🦴','👀','👅','👄','💋'],
    ball: ['🌍','🌐','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌝','🏐','🏀','⚽','🥎','⚾','🎃','🍪','📀','🔵','😄','🍊','🎯','🧭']
}

// 选关界面
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
        this.passed = false // 本关是否已通过
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