class BoundingBox {
    constructor(x,y,w,h,color) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }
    draw() {
        ctx.save()
        
        ctx.lineWidth = 4
        ctx.strokeStyle = this.color
        ctx.strokeRect(this.x, this.y, this.w, this.h)
        ctx.stroke()
        ctx.restore()
    }
    update() {

    }
}

function createBoundingBox() {
    let box = new BoundingBox(80,80,800,800,'white')
    return box
}