setEmojiFavicon('🎵')
const canvas = document.querySelector('#canvas1')
canvas.height = window.innerHeight
canvas.width = window.innerWidth > window.innerHeight ? window.innerHeight*0.46 : window.innerWidth 
const ctx = canvas.getContext('2d')
let timer = 0
let disc = null
let rotatingDisc = null
let buttons = []
let mp3Info = {
    size: 0,
    title: '',
    artist: '',
    album: '',
    picture: ''
}
let lastFetchResp = {
    url: '',
    filename: '',
    size: 0,
    idx: null
}
let titleBar = null
let artistBar = null
let progressBar = null
let downloadProgress = null
let soundVisualizer = null
const canvas2 = document.querySelector('#picture')
canvas2.width = canvas.width
canvas2.height = canvas2.width
const ctx2 = canvas2.getContext('2d')

document.body.onresize = function() {
    //canvas.width = window.innerWidth
    //canvas.height = window.innerHeight
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth > window.innerHeight ? window.innerHeight*0.46 : window.innerWidth 
}

let mouse = {x: null, y: null}
document.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
})

function getRandomMusic() {
    let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
    let n = Math.floor(Math.random()*arr.length)
    console.log('n = ' + n)
    let filename = n + '.mp3'
    console.log('filename: ' + filename)
    return filename
}

async function fetchRandomMp3() {
    const res = await fetch('/randommp3')
    const json_data = await res.json()
    console.log(json_data) // {url:url, filename:filename, size:size, idx:idx}
    lastFetchResp = json_data
    return json_data
}

async function fetchMp3ByIdx(idx) {
    console.log(`fetchMp3ByIdx(${idx})`)
    const args = {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `idx=${idx}`
    }
    const res = await fetch('/getmp3byidx', args)
    const json_data = await res.json()
    console.log(json_data) // {url:url, filename:filename, size:size, idx:idx}
    lastFetchResp = json_data
    return json_data
}

function showMp3Tags(filename) {
    ID3.loadTags(filename, function() {
        showTags(filename)
    }, {
        tags: ['title','artist','album','picture']
    })
}
function showTags(url) {
    var tags = ID3.getAllTags(url)
    console.log(tags)
    mp3Info.size = tags.size
    mp3Info.title = tags.title
    mp3Info.artist = tags.artist
    mp3Info.album = tags.album
    mp3Info.picture = tags.picture
    var image = tags.picture
    if (image) {
        var base64String = ''
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i])
        }
        var base64 = "data:" + image.format + ";base64," + window.btoa(base64String)
        const img = new Image()
        img.src = base64
        img.addEventListener('load', function() {
            console.log('img load finished')
            ctx2.imageSmoothingEnabled = true 
            ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height)
            /*
            let imageData = ctx2.getImageData(0,0,canvas2.width,canvas2.height)
            for (let i=0; i<imageData.data.length/4; i++) {
                let r = imageData.data[i*4]
                let g = imageData.data[i*4+1]
                let b = imageData.data[i*4+2]
                let alpha = imageData.data[i*4+3]
                imageData.data[i*4]   = r*0.272 + g*0.534 + b*0.131
                imageData.data[i*4+1] = r*0.349 + g*0.686 + b*0.168
                imageData.data[i*4+2] = r*0.393 + g*0.769 + b*0.189
            }
            console.log(imageData)
            ctx2.putImageData(imageData, 0, 0, 0, 0, canvas2.width, canvas2.height)
            */
            document.querySelector('#picture').style.display = 'block'
        })
    } else {
        document.querySelector('#picture').style.display = 'none'
    }
}


let sounds_cache = {}
let currentAudio = null
function playSound(filename, volume) {
    console.log(`filename: ${filename}`)
    if (!sounds_cache.hasOwnProperty(filename)) {
        let audio = new Audio(filename)
        audio.volume = volume || 1
        sounds_cache[filename] = audio
    }
    let audio = sounds_cache[filename]
    //audio.currentTime = 0
    audio.play()
    currentAudio = audio
    soundVisualizer = new SoundVisualizer(0, canvas.width*1.25, canvas.width, canvas.height*0.1, currentAudio)
}

function stopAllSounds() {
    for (let key in sounds_cache) {
        let audio = sounds_cache[key]
        audio.pause()
    }
}

class Disc {
    constructor() {
        this.x = canvas.width/2
        this.y = canvas.height/3.5
        this.r = canvas.width/3
        this.r2 = this.r * 0.9
        this.r3 = this.r * 0.6
        this.color = '#554a4e'
        this.color2 = '#1c1c1c'
        this.color3 = '#e3dbd9'
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = this.color2
        ctx.arc(this.x, this.y, this.r2, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = this.color3
        ctx.arc(this.x, this.y, this.r3, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()
    }
    update() {
    }
}
disc = new Disc()

class RotatingDisc {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.text = '📀'
        //this.text = '💿'
        this.timer = 0
        this.speed = 0.03
        this.state = 'stop' // stop, playing
    }
    draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.timer * this.speed)
        let fontSize = canvas.height * 0.2
        ctx.font = `${fontSize}px Arial`
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
    update() {
        if (this.state == 'playing') {
            this.timer++
        }
    }
    stop() {
        this.state = 'stop'
    }
    play() {
        this.state = 'playing'
    }
}
//rotatingDisc = new RotatingDisc(disc.x, disc.y)

class GoldenDisc {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r || canvas.width / 6 
        this.timer = 0
        this.state = 'stop'
    }
    draw() {
        ctx.save()

        let data = [
            {color:'black', r:this.r*1.15, start:0, end:Math.PI*2},

            {color:'#fce100', r:this.r    , start:0, end:Math.PI*2},
            {color:'#c19c00', r:this.r*0.9, start:0, end:Math.PI/180*35},
            {color:'#fce100', r:this.r*0.9, start:Math.PI/180*35, end:Math.PI/180*50},
            {color:'#dfbe00', r:this.r*0.9, start:Math.PI/180*50, end:Math.PI/180*180},
            {color:'#fce100', r:this.r*0.9, start:Math.PI/180*180, end:Math.PI/180*215},
            {color:'#c19c00', r:this.r*0.9, start:Math.PI/180*215, end:Math.PI/180*230},
            {color:'#dfbe00', r:this.r*0.9, start:Math.PI/180*230, end:Math.PI/180*360},

            {color:'#c19c00', r:this.r*0.38, start:0, end:Math.PI*2},
            {color:'#fce100', r:this.r*0.30, start:0, end:Math.PI*2},
            {color:'black', r:this.r*0.14, start:0, end:Math.PI*2},
        ]
        ctx.translate(this.x, this.y)
        ctx.rotate(this.timer*0.01)
        for (let i=0; i<data.length; i++) {
            let color = data[i].color
            let r     = data[i].r
            let start = data[i].start
            let end   = data[i].end
            ctx.beginPath()
            ctx.fillStyle = color
            ctx.moveTo(0, 0)
            ctx.arc(0, 0, r, start, end)
            ctx.closePath()
            ctx.fill()
        }

        ctx.restore()
    }
    update() {
        if (this.state == 'playing') {
            this.timer++
        }
    }
    stop() {
        this.state = 'stop'
    }
    play() {
        this.state = 'playing'
    }
}
rotatingDisc = new GoldenDisc(disc.x, disc.y)

class Button {
    constructor(x, y, size, bgcolor, fontSize) {
        this.x = x
        this.y = y
        this.size = size || canvas.width/5
        this.bgcolor = bgcolor || 'darkblue'
        this.fontSize = fontSize || this.size*0.8
        this.text = '▶️'
        this.timer = 0
    }
    draw() {
        ctx.save()

        ctx.beginPath()
        ctx.fillStyle = this.bgcolor
        ctx.fillRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size)

        let fontSize = Math.abs(Math.sin(this.timer*0.05)) * 10 + this.fontSize
        ctx.font = `${fontSize}px Georgia`
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(this.text, this.x, this.y)
        
        ctx.restore()
    }
    update() {
        this.timer++
    }
    isUnderMouse() {
        return mouse.x > this.x-this.size/2 &&
               mouse.x < this.x + this.size/2 &&
               mouse.y > this.y-this.size/2 &&
               mouse.y < this.y + this.size/2
    }
    onclick() {
        console.log(`${this.text} pressed`)
    }
}

class ButtonVolume extends Button {
    constructor(x, y, size, bgcolor) {
        super(x,y,size,bgcolor)
        this.texts = ['🔇','🔈','🔉','🔊']
        this.frame = 3
        this.text = this.texts[this.frame]
    }
    update() {
        this.text = this.texts[this.frame]
    }
    async onclick() {
        if (currentAudio) {
            this.frame = (this.frame + 1) % this.texts.length
            if (this.frame == 0) {
                currentAudio.volume = 0
            } else if (this.frame == 1) {
                currentAudio.volume = 0.25
            } else if (this.frame == 2) {
                currentAudio.volume = 0.75
            } else if (this.frame == 3) {
                currentAudio.volume = 1
            }
        }
    }
}
let buttonVolume = new ButtonVolume(canvas.width/8*7, canvas.height*0.8)
buttons.push(buttonVolume)

class ButtonPlay extends Button{
    constructor(x, y, size, bgcolor) {
        super(x, y, size, bgcolor)
        this.state = 'stop' // stop, playing
        this.texts = {
            stop: '▶️',
            playing: '⏸️'
        }
        this.text = this.texts[this.state]
    }
    update() {
        super.update()
        this.text = this.texts[this.state]
    }
    async onclick() {
        switch (this.state) {
            case 'stop':
                if (currentAudio == null) {
                    //const musicfile = 'sounds/' + getRandomMusic()
                    //const musicfile = 'sounds/canon_in_d.mp3'
                    const json_data = await fetchRandomMp3()
                    let musicfile = json_data.url
                    playSound(`${musicfile}`)
                    showMp3Tags(musicfile)
                } else {
                    currentAudio.play()
                }
                this.state = 'playing'
                rotatingDisc.play()
                break
            case 'playing':
                stopAllSounds()
                this.state = 'stop'
                rotatingDisc.stop()
        }
    }
}
let buttonPlay = new ButtonPlay(canvas.width/8*3, canvas.height*0.8)
buttons.push(buttonPlay)

class ButtonNext extends Button{
    constructor(x, y, size, bgcolor) {
        super(x,y,size,bgcolor)
        this.text = '⏭️'
    }
    async onclick() {
        if (lastFetchResp.idx && lastFetchResp.url != '') {
            stopAllSounds()
            let idx = lastFetchResp.idx + 1
            console.log(`idx = ${idx}`)
            let json_data = await fetchMp3ByIdx(idx)
            let url = json_data.url
            playSound(url)
            showMp3Tags(url)
            rotatingDisc.play()
        }
    }
}
let buttonNext = new ButtonNext(canvas.width/8*5, canvas.height*0.8)
buttons.push(buttonNext)

class ButtonRefresh extends Button {
    constructor(x,y,size,bgcolor) {
        super(x,y,size,bgcolor)
        this.text = '🔄'
    }
    async onclick() {
        stopAllSounds()
        //let filename = getRandomMusic()
        //playSound(`sounds/${filename}`)
        let json_data = await fetchRandomMp3()
        let filename = json_data.url
        playSound(filename)
        showMp3Tags(filename)
        rotatingDisc.play()
    }
}
let buttonRefresh = new ButtonRefresh(canvas.width*0.25/2, canvas.height*0.8)
buttons.push(buttonRefresh)

document.onmouseup = function(event) {
    let x = event.x
    let y = event.y
    mouse.x = x
    mouse.y = y
    if (buttonPlay.isUnderMouse()) {
        buttonPlay.onclick()
    }
    if (buttonNext.isUnderMouse()) {
        buttonNext.onclick()
    }
    if (buttonRefresh.isUnderMouse()) {
        buttonRefresh.onclick()
    }
    if (buttonVolume.isUnderMouse()) {
        buttonVolume.onclick()
    }
    if (progressBar.isUnderMouse()) {
        progressBar.onclick()
    }
}


class ProgressBar {
    constructor(x,y) {
        this.x = x  // pivot x
        this.y = y  // pivot y
        this.width = canvas.width
        this.height = canvas.height*0.04
        this.color = 'coral'
        this.progress = 0
        this.timeStr = ''
    }
    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height)

        ctx.beginPath()
        ctx.fillStyle = 'white'
        let h = this.height/2 
        ctx.shadowColor = 'black'
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1
        ctx.fillRect(this.x-this.width/2, this.y-h/2, parseInt(this.width*this.progress/100), h)

        ctx.fillStyle = 'black'
        ctx.font = '30px Arial'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.shadowColor = 'white'
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1
        ctx.shadowBlur = 0
        ctx.fillText(this.timeStr, this.x, this.y)
        
        ctx.restore()
    }
    update() {
        if (currentAudio != null) {
            this.progress = currentAudio.currentTime/currentAudio.duration*100
            if (currentAudio && currentAudio.duration) {
                let totalTime = this.secondsToMinSec(currentAudio.duration)
                let currentTime = this.secondsToMinSec(currentAudio.currentTime)
                this.timeStr = `${currentTime}/${totalTime}`
            }
        }
    }
    secondsToMinSec(seconds) {
        let n = parseInt(seconds)
        let minute = parseInt(n/60)
        let second = n%60 + ''
        if (second.length == 1) {
            second = '0' + second
        }
        let str = minute + ":" + second
        return str
    }
    isUnderMouse() {
        return mouse.x > this.x-this.width/2 &&
               mouse.x < this.x + this.width/2 &&
               mouse.y > this.y-this.height/2 &&
               mouse.y < this.y + this.height/2
    }
    onclick() {
        console.log(`progressBar onclick()`)
        console.log(`x:${mouse.x}, y:${mouse.y}`)
        if (currentAudio && currentAudio.duration) {
            const currentTime = mouse.x/this.width*currentAudio.duration
            console.log(`currentTime: ${currentTime}`)
            currentAudio.currentTime = currentTime
        }
    }
}
progressBar = new ProgressBar(canvas.width/2, canvas.height*0.9)

class DownloadProgress {
    constructor() {
        this.width = 0
        this.height = 10 
        this.x = 0
        //this.y = canvas.height - this.height
        this.y = canvas.width
        this.color = '#c70c0c' // red
    }
    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore()
    }
    update() {
        this.width = 0
        if (currentAudio && currentAudio.buffered && currentAudio.buffered.length>0) {
            let timeRanges = currentAudio.buffered
            let pct = timeRanges.end(timeRanges.length - 1) / currentAudio.duration
            this.width = canvas.width * pct
        }
    }
    
}
downloadProgress = new DownloadProgress()

class TextBar {
    constructor(x, y, fontSize, fontColor) {
        this.x = x
        this.y = y
        this.fontSize = fontSize
        this.fontColor = fontColor
        this.text = ''
        this.timer = 0
    }
    draw() {
        if (this.text == '') { return }
        ctx.save()
        ctx.font = `${this.fontSize}px Georgia`
        ctx.fillStyle = this.fontColor
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.shadowColor = 'black'
        ctx.shadowOffsetX = 3
        ctx.shadowOffsetY = 3
        ctx.shadowBlur = 0
        ctx.fillText(this.text, this.x, this.y)
        ctx.restore()
    }
    update() {
        ctx.save()
        ctx.font = `${this.fontSize}px Georgia`
        let textWidth = ctx.measureText(this.text).width
        if (textWidth > canvas.width) {
            this.x -= 1
            if (this.x < -(textWidth/2)) {
                this.x = canvas.width + textWidth/2
            }
        }else{
            this.x = canvas.width/2
        }
        ctx.restore()
    }
}

class TitleBar extends TextBar{
    constructor() {
        super(canvas.width/2, canvas.width*1.1, 50, 'coral')
    }
    update() {
        this.text = mp3Info.title
        if (this.text == '') {
            return
        }
        super.update()
    }
}
titleBar = new TitleBar()

class ArtistBar extends TextBar {
    constructor() {
        super(canvas.width/2, canvas.width*1.2, 50, 'white')
    }
    update() {
        if (mp3Info.artist) {
            this.text = mp3Info.artist
        }
        super.update()
    }
}
artistBar = new ArtistBar()

function createBackground() {
    let grd = ctx.createLinearGradient(0,0,0,canvas.height)
    grd.addColorStop(0, 'black')
    grd.addColorStop(0.4, "MidnightBlue")
    grd.addColorStop(0.6, "DarkSlateBlue")
    grd.addColorStop(1, "black")
    return grd
}

function animate(){
    timer++
    ctx.fillStyle = createBackground()
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    disc.draw()
    disc.update()

    rotatingDisc.draw()
    rotatingDisc.update()

    buttons.forEach(btn => {
        btn.draw()
        btn.update()
    })

    progressBar.draw()
    progressBar.update()

    titleBar.draw()
    titleBar.update()

    artistBar.draw()
    artistBar.update()

    downloadProgress.draw()
    downloadProgress.update()

    if (soundVisualizer) {
        soundVisualizer.draw()
        soundVisualizer.update()
    }

    requestAnimationFrame(animate)
}
try {
    animate()
}catch(e) {
    log(String(e))
}
