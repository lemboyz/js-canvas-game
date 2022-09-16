class SoundVisualizer {
    constructor(x, y, width, height, audioElement) {
        this.x = x // left bottom x
        this.y = y // left bottom y
        this.width = width
        this.height = height
        this.audioElement = audioElement
        if (this.audioElement == null) { return }

        //this.audioCtx = new AudioContext()
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        this.analyser = this.audioCtx.createAnalyser()
        this.source = this.audioCtx.createMediaElementSource(this.audioElement)
        this.source.connect(this.analyser)
        this.analyser.connect(this.audioCtx.destination)
        this.analyser.fftSize = 128
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
    }
    draw() {
        if (this.audioElement == null) { return }
        let dataArray = this.dataArray
        const bar_w = canvas.width / this.bufferLength
        ctx.save()
        for (let i=0; i<this.bufferLength; i++) {
            let bar_x = i*bar_w
            let bar_h = dataArray[i]/255 * this.height
            let bar_y = this.y - bar_h
            let color = `hsl(${255-dataArray[i]},100%,50%)`
            ctx.fillStyle = color
            ctx.globalAlpha = 0.5
            ctx.fillRect(bar_x, bar_y, bar_w, bar_h)
        }
        ctx.restore()
    }
    update() {
        if (this.audioElement == null) { return }
        this.analyser.getByteFrequencyData(this.dataArray)
    }
}

//let soundVisualizer = new SoundVisualizer(0, 0, canvas.width, canvas.height, audioElement)
