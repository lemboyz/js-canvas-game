function setFavicon (url) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = url;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = url;
      document.head.appendChild(link);
    }
}
  
function setEmojiFavicon (emoji) {
    const canvas = document.createElement('canvas');
    const size = 64
    canvas.height = size;
    canvas.width = size;
  
    const context = canvas.getContext('2d');
    context.font = `${size}px serif`;
    context.fillText(emoji, 0, size);
  
    const url = canvas.toDataURL();
    setFavicon(url);
}

let sounds_cache = {}
function playSound(filename, volume) {
    if (!sounds_cache.hasOwnProperty(filename)) {
        let audio = new Audio(filename)
        audio.volume = volume || 1
        sounds_cache[filename] = audio
    }
    let audio = sounds_cache[filename]
    audio.currentTime = 0
    audio.play()
}

function getRandomFromArray(arr) {
    let n = Math.random() * arr.length
    n = Math.floor(n)
    return arr[n]
}

// 圆角矩形 
// x:左上角x坐标 y：左上角y坐标 
// w：宽度 h: 高度
// r: 圆角的半径
function fillRoundRect(ctx, x, y, w, h, r, color) {
    ctx.beginPath()
    ctx.fillRect(x+r,y,w-2*r,h)
    ctx.fillRect(x,y+r,w,h-2*r)
    ctx.arc(x+r,y+r,r,0,Math.PI*2) // 左上角的圆形
    ctx.arc(x+w-r,y+r,r,0,Math.PI*2) // 右上角的圆形
    ctx.arc(x+r,y+h-r,r,0,Math.PI*2) // 左下角的圆形
    ctx.arc(x+w-r,y+h-r,r,0,Math.PI*2) // 右小角的圆形
    ctx.closePath()
    ctx.fillStyle = color || 'black'
    ctx.fill()
}

// ctx.strokeStyle = 'black'
// ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size)
// ctx.stroke()
function strokeRoundRect(ctx, x, y, w, h, r) {
    console.log(`strokeRoundRect(ctx,${x},${y},${w},${h},${r})`)
    // 上边
    ctx.beginPath()
    ctx.moveTo(x+r,y)
    ctx.lineTo(x+w-r,y)
    ctx.closePath()
    ctx.stroke()

    // 右边
    ctx.beginPath()
    ctx.moveTo(x+w,y+r)
    ctx.lineTo(x+w,y+h-r)
    ctx.closePath()
    ctx.stroke()

    // 下边
    ctx.beginPath()
    ctx.moveTo(x+r, y+h)
    ctx.lineTo(x+w-r, y+h)
    ctx.closePath()
    ctx.stroke()

    // 左边
    ctx.beginPath()
    ctx.moveTo(x,y+r)
    ctx.lineTo(x,y+h-r)
    ctx.closePath()
    ctx.stroke()

    // 左上角弧形
    ctx.beginPath()
    ctx.arc(x+r,y+r,r,Math.PI,Math.PI/2*3)
    ctx.closePath()
    ctx.stroke()

    // 右上角弧形
    ctx.beginPath()
    ctx.arc(x+w-r,y+r,r,Math.PI/2*3,Math.PI/2*4)
    ctx.closePath()
    ctx.stroke()

    // 右下角弧形
    ctx.beginPath()
    ctx.arc(x+w-r,y+h-r,r,0,Math.PI/2)
    ctx.closePath()
    ctx.stroke()

    // 左下角弧形
    ctx.beginPath()
    ctx.arc(x+r,y+h-r,r,Math.PI/2,Math.PI)
    ctx.closePath()
    ctx.stroke()
}