class Block {
    constructor(valid, x,y,size, value, bgColor, i, j) {
        this.valid = valid
        this.x = x // 左上角的x 
        this.y = y // 左上角的y
        this.size = size // 边长
        this.value = value
        this.bgColor = bgColor
        this.i = i
        this.j = j

        this.selected = false
        this.elapsedTime = 0
    }
    centerX() {
        return this.x + this.size/2
    }
    centerY() {
        return this.y + this.size/2
    }
    vanish() {
        this.valid = false
    }
    isValid() {
        return this.valid == true
    }
    isSelected() {
        return this.isValid() && this.selected == true
    }
    draw() {
        if(!this.isValid()) { return }

        ctx.save()
        
        ctx.translate(this.centerX(), this.centerY())
        if (this.isUnderMouse()) {
            let scaleSize = 1 + Math.sin(this.elapsedTime*0.1)*0.08
            ctx.scale(scaleSize, scaleSize)
        }
        ctx.beginPath()
        ctx.fillStyle = this.selected ? "purple" : this.bgColor
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size)
        ctx.fill()

        ctx.strokeStyle = 'black'
        ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size)
        ctx.stroke()

        ctx.font = "45px Georgia"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillStyle = this.selected ? 'white' : 'blue'
        
        ctx.fillText(this.value, 0, 0)
        ctx.closePath()
        ctx.restore()
    }
    update() {
        this.elapsedTime += 1
    }
    rotate() {
        ctx.translate(this.x+this.size/2, this.y+this.size/2)
        ctx.rotate(Math.PI*2*Math.sin(this.elapsedTime*0.001))
    }
    onselect() {
        if(!this.isValid()) { return }

        this.selected = !this.selected
        //playSound('sounds/click.mp3', 0.5)
        playSound('sounds/poping.mp3', 0.5)
    }
    isUnderMouse() {
        if(!this.isValid()) { return false}

        let mouseX = mouse.x
        let mouseY = mouse.y
        return mouseX>this.x && 
              mouseX<this.x+this.size && 
              mouseY>this.y && 
              mouseY<this.y+this.size 
    }
}

const emoji_bug = ['🐞','🐌','🦋','🐛','🐜','🐝','🦗','🕷️','🕸️','🦂','🦟','🦠']
const emoji_vegetable = ['🍆','🍅','🥔','🥕','🌽','🌶️','🥒','🥬','🥦','🧄','🧅']
const emoji_12animal = ['🐁','🐂','🐅','🐇','🐉','🐍','🐎','🐐','🐒','🐓','🐕','🐖']
const emoji_resort = ['🏜️','🌋','🏖️','🏝️','🏛️','🏰','🛕','⛩️','👺','🗿','🗼','🗽','🏯'] 
const emoji_mahjong = ['🀄','🎲','🀨','🀥','🀧','🀣','🀢','🀦','🀩','🀤','🀪','🃏','🔮','🎴']
const emoji_sweet = ['🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯']
const emoji_home = ['🚪','🚽','🚿','🛁','🛒','🧯','🧴','🧷','🧹','🧺','🧻','🧼','🧽','🪑','🪒']
const emoji_office = ['💼','📁','📅','📆','📇','📈','📉','📊','📌','📍','📎','📏','📐','🔑','🔒']
const emoji_bird = ['🦉','🦆','🐧','🐦','🦩','🐓','🦚','🦜','🦢','🦅','🕊️','🐣','🐤','🐔','🦃','🐥']
const emoji_music = ['🎧','🎼','🎹','🎵','🎶','🪕','🎺','🎻','🥁','🎷','🎸','📯','🎤','🎙️','🔔','📻']
const emoji_drink = ['🍼','🥛','☕','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃','🥤','🧃','🧉','🧊']
const emoji_fish = ['🐬','🦈','🐟','🐠','🐡','🐢','🐋','🐳','🐙','🐚','🦀','🦞','🦐','🦑','🐊','🐉','🦪']
const emoji_fruit = ['🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓','🥝','🥥','🥑']
const emoji_animal = ['🦨','🦔','🐫','🐪','🦌','🐈','🦧','🦍','🐕‍🦺','🦙','🐏','🐆','🧸','🐘','🐿️','🐄','🦘']
const emoji_heart = ['💘','💝','💖','💞','💕','❣️','💔','💟','🧡','💛','💚','💙','💜','🤎','🖤','🤍','♠️','♦️','♣️']
const emoji_animalface = ['🙉','🙊','🐶','🐺','😸','😹','😻','🐯','🐮','🐷','🐗','🐭','🐹','🐰','🐻','🐨','🐼','🐸']
const emoji_weather = ['☁️','⛅','⛈️','🌤️','🌦️','🌧️','🌩️','🌪️','🌀','🌫️','🌬️','🌈','☂️','☔','🌂','⚡','❄️']
const emoji_event = ['🎃','🎄','🎆','🎇','🧨','✨','🎈','🎉','🎊','🎋','🎍','🎎','🎏','🎐','🎑','🧧','🎀','🎁','🎗','🎟','🎫']
const emoji_food = ['🥐','🍕','🥮','🍤','🍼','☕','🍱','🌭','🥪','🍔','🍗','🍖','🥩','🧀','🥗','🥫','🍡','🧆','🍟','🥣','🥞']
const emoji_plant = ['💐','🌸','🏵️','🌹','🥀','🌺','🌻','🌼','🌷','🌱','🌲','🌳','🌴','🌵','🌾','🌿','🍀','🍁','🍂','🍃','🍄']
const emoji_head = ['🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','👽','👾','🤖','🎃','😺','😻','🥶','🥳','😄','🥵','😴','🤪']
const emoji_tool = ['⌚️','📱','📲','💻','⌨️','💽','💾','💿','📀','📼','📸','📹','🎥','📞','☎️','📟','📠','📺','📻','🧭','⏱','⏲','⏰']
const emoji_simple = ['🔲','🔶','🔷','🔺','🔻','🔴','🟠','🟡','🟢','🔵','🟣','🟤','⚫','⚪','🟥','🟧','🟨','🟩','🟦','🟪','🟫','⬛','⬜']
const emoji_job = ['👮🏻‍♀️','👮🏻','👷🏻‍♀️','👷🏻','💂🏻‍♀️','🕵🏻','👩🏻‍⚕️','👩🏻‍🌾','👩🏻‍🍳','👩🏻‍🎓','👩🏻‍🎤','👩🏻‍🏫','👩🏻‍🏭','👩🏻‍💻','👩🏻‍💼','👩🏻‍🔧','👩🏻‍🔬','👩🏻‍🎨','👩🏻‍🚒','👨🏻‍✈️','👩🏻‍🚀','👨🏻‍⚖️','👰🏻','🤵🏻','🤴🏻']
const emoji_ghost = ['🧝🏻‍♀️','🧝🏻','👸','🤴','🦸','🦸‍♂️','🦹','🦹‍♂️','🤶','🧑','🎅','🧙‍♀️','🧙‍♂️','🧝‍♀️','🧝','🧝‍♂️','🧛','🧟‍♀️','🧟','🧞‍♀️','🧞','🧜','🧜‍♂️','🧚','🧚‍♂️','👼']
const emoji_vehicle = ['🚙','🚁','🚌','🚝','🚕','🚜','🚑','🚚','🚖','🏎️','🚃','🚓','🚗','🚊','🚒','⛽','🚸','👮','👮‍♀️','🛺','🛴','🛵','🏍️','🚦','🚥','🚧']
const emoji_cloth = ['👓','🕶️','🥽','🥼','🦺','👔','👕','👖','🧤','🧥','🧦','👗','👘','🥻','🩱','🩳','👙','👚','👟','🥿','👞','👠','👡','👢','👒','🎓','💍']
const emoji_sport = ['⚾','🎯','🤸‍♀️','🤸‍♂️','🏌️‍♀️','🏌️','🏇','⛷️','🥇','🥈','🥉','🏐','🚲','🏆','🚴','🥏','⛸️','🤼','🥊','🏋️','🏊‍♀️','🏈','🏀','⚽','🥎','🎳','🏓','🏸']
const emoji_body = ['👋','🖐','🖖','👌','🤟','👆','👇','👍','👎','👊','👏','🙌','🙏','💅','🤳','💪','🦵','🦶','👣','🦻','👃','🧠','🦷','🦴','👀','👁','👅','👄','💋']


function chooseRandomEmoji() {
    let arr = [emoji_bird,emoji_animal, emoji_sport, emoji_vehicle, emoji_fruit,emoji_food,emoji_sweet,emoji_drink,emoji_fish,emoji_plant,
        emoji_weather,emoji_cloth,emoji_heart,emoji_simple,emoji_mahjong,emoji_bug,emoji_resort,emoji_music,emoji_office,emoji_home,emoji_event,emoji_ghost,emoji_body,emoji_head,emoji_job,emoji_tool]

    let n = Math.floor(Math.random() * arr.length)
    return arr[n]
}

function createRandomCouples(arrayData, num) {
    let output = []
    for(let i=0; i<num; i++) {
        let n = Math.floor(Math.random()*arrayData.length)
        let item = arrayData[n]
        output.push(item)
        output.push(item)
    }
    return output
}

function disorderArray(arr) {
    let output = arr
    for(let i=0; i<arr.length; i++) {
        let currentValue = output[i]
        let idx = Math.floor(Math.random()*arr.length)
        output[i] = output[idx]
        output[idx] = currentValue
    }
    return output
}

function createBlocks(arr) {
    let size = 80
    let startx = 0
    let starty = 0

    let emoji_chars = createRandomCouples(arr, 50)
    emoji_chars = disorderArray(emoji_chars)

    let blocks = []
    let n = 0
    let bgColor = getRandomFromArray(['coral','lightblue','white','lightyellow','#7fdcfe','#02ff70','#dddddd'])
    for (let i=0; i<12; i++) {
        for (let j=0; j<12; j++) {
            let x = startx+size*j
            let y = starty+size*i
            let valid = false
            if(i>0 && i<11 && j>0 && j<11) {
                blocks.push(new Block(true,x,y,size,emoji_chars.pop(),bgColor,i,j))
            }else{
                emoji_value = ''
                nocolor = ''
                blocks.push(new Block(false,x,y,size,emoji_value,nocolor,i,j))
            }
            
            n++
        }
    }
    return blocks
}

function getBlock(i, j) {
    for(let x=0; x<blocks.length; x++) {
        let block = blocks[x]
        if(block.i==i && block.j==j) {
            return block
        }
    }
    return null
}

// 水平方向连通
function isHorizonLink(block1, block2) {
    if (block1.i != block2.i) {
        return false
    }
    if (block1.i==block2.i && block1.j==block2.j) {
        return false
    }

    let b1 = block1.j < block2.j ? block1 : block2
    let b2 = block1.j < block2.j ? block2 : block1

    let i = block1.i
    for (let j=b1.j+1; j<b2.j; j++) {
        let block = getBlock(i, j)
        if (block.isValid()) {
            return false
        }
    }
    return true
}

// 垂直方向连通
function isVerticalLink(block1, block2) {
    if (block1.j != block2.j) {
        return false
    }
    if (block1.i==block2.i && block1.j==block2.j) {
        return false
    }

    let b1 = block1.i < block2.i ? block1 : block2
    let b2 = block1.i < block2.i ? block2 : block1

    let j = block1.j
    for (let i=b1.i+1; i<b2.i; i++) {
        let block = getBlock(i, j)
        if (block.isValid()) {
            return false
        }
    }
    return true
}

function oneLineLink(b1, b2) {
    let ok = isHorizonLink(b1, b2) || isVerticalLink(b1, b2)
    if (ok) {
        return [b1, b2]
    }
    return null
}

// 获取所有未选中的block
function getVanishedBlocksWithoutSelected(selectedBlocks) {
    let out = []
    for (let x=0; x<blocks.length; x++) {
        let block = blocks[x]
        let isSelected = false
        for (let n=0; n<selectedBlocks.length; n++) {
            if (block.i==selectedBlocks[n].i && block.j==selectedBlocks[n].j) {
                isSelected = true
                break
            }
        }
        if (!block.isValid() && isSelected==false) {
            out.push(block)
        }
    }
    return out
}

function twoLinesLink(b1, b2) {
    let vanishedBlocks = getVanishedBlocksWithoutSelected([b1,b2])
    for (x=0; x<vanishedBlocks.length; x++) {
        let block = vanishedBlocks[x]
        if (oneLineLink(block, b1) && oneLineLink(block, b2)) {
            return [b1, block, b2]
        }
    }
    return null
}

function threeLinesLink(b1, b2) {
    let vanishedBlocks = getVanishedBlocksWithoutSelected([b1,b2])
    for (n=0; n<vanishedBlocks.length; n++) {
        let block1 = vanishedBlocks[n]
        for (m=n+1; m<vanishedBlocks.length; m++) {
            let block2 = vanishedBlocks[m]
            if (oneLineLink(b1,block1) && oneLineLink(block1, block2) && oneLineLink(block2, b2)) {
                return [b1, block1, block2, b2]
            }
            if (oneLineLink(b2,block1) && oneLineLink(block1, block2) && oneLineLink(block2, b1)) {
                return [b2, block1, block2, b1]
            }
        }
    }
    return null
}

function getLinkedEndpoints(b1, b2) {
    let endpoints = oneLineLink(b1, b2)
    if (endpoints != null) {
        return endpoints
    }

    endpoints = twoLinesLink(b1, b2)
    if (endpoints != null) {
        return endpoints
    }

    endpoints = threeLinesLink(b1, b2)
    if (endpoints != null) {
        return endpoints
    }

    return null
}
