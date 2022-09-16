class ScoreBoard {
    constructor() {
        this.x = 80*14
        this.y = 80
        this.width = 80*7
        this.height = 800
        this.bestRecords = this.loadBestRecords()
        /*
        this.bestRecords = [
            {dateTime:'2021-08-18 09:01', blockValue:'🐥', seconds: 70},
            {dateTime:'2021-08-17 09:01', blockValue:'🐲', seconds: 75},
            {dateTime:'2021-08-16 09:01', blockValue:'🏀', seconds: 80},
            {dateTime:'2021-08-15 09:01', blockValue:'🐠', seconds: 85},
            {dateTime:'2021-08-14 09:01', blockValue:'🌹', seconds: 90},
            {dateTime:'2021-08-14 09:01', blockValue:'🏝️', seconds: 95},
            {dateTime:'2021-08-14 09:01', blockValue:'🐌', seconds: 96},
            {dateTime:'2021-08-14 09:01', blockValue:'🏆', seconds: 120},
            {dateTime:'2021-08-14 09:01', blockValue:'🎃', seconds: 130}
        ]
        */
        
    }
    draw() {
        ctx.save()
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 5
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        
        ctx.font = "40px Georgia"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'left' //'center'
        ctx.fillStyle = 'white'
        ctx.fillText('     🏆Best Records🏆', this.x+this.width*0.1, this.y+40)
        for (let i=0; i<this.bestRecords.length && i<9; i++) {
            let record = this.bestRecords[i]
            let dateTime = record.dateTime
            let blockValue = record.blockValue
            let seconds = record.seconds
            ctx.fillText(`${dateTime} ${blockValue} ${seconds}`, this.x + this.width*0.1, this.y+40+80*(i+1))
        }
        ctx.fill()

        ctx.restore()
    }
    update() {

    }
    loadBestRecords() {
        let bestRecords = localStorage.getItem('bestRecords')
        if (bestRecords) {
            bestRecords = JSON.parse(bestRecords)
        } else {
            bestRecords = []
        }
        return bestRecords
    }
    addNewRecord(blockValue, seconds) {
        this.bestRecords.push({dateTime:getDateTime(), blockValue:blockValue, seconds:seconds})

        function sortby(record1, record2) {
            return record1.seconds - record2.seconds
        }
        this.bestRecords = this.bestRecords.sort(sortby)

        localStorage.setItem('bestRecords', JSON.stringify(this.bestRecords))
    }
}

// yyyy-mm-dd HH:MM
function getDateTime() {
    function fillZero(s) {
        if(2 > s.length) {
            addLen = 2 - s.length
            return '0'.repeat(addLen) + s
        }
        return s
    }
    let dt = new Date()
    let out = dt.getFullYear()+'-'+fillZero(dt.getMonth()+1+'')+'-'+fillZero(dt.getDate()+'') + ' ' + fillZero(dt.getHours()+'')+':'+fillZero(dt.getMinutes()+'')
    return out
}