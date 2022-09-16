let sounds_cache = {}
function playSound(filename, volume) {
    if (!sounds_cache.hasOwnProperty(filename)) {
        let audio = new Audio(filename)
        audio.volume = volume || 1
        sounds_cache[filename] = audio
    }
    let audio = sounds_cache[filename]
    //audio.pause()
    audio.currentTime = 0
    audio.play()
}

function pauseSound(filename) {
    if (!sounds_cache.hasOwnProperty(filename)) {
      let audio = new Audio(filename)
      sounds_cache[filename] = audio
    }
    let audio = sounds_cache[filename]
    audio.pause()
}

function resumeSound(filename) {
  if (!sounds_cache.hasOwnProperty(filename)) {
    let audio = new Audio(filename)
    sounds_cache[filename] = audio
  }
  let audio = sounds_cache[filename]
  audio.play()
}

function distance(obj1, obj2) {
  const dx = obj1.x - obj2.x
  const dy = obj1.y - obj2.y
  return Math.sqrt(dx*dx + dy*dy)
}

function drawText(text, x, y, size) {
  x = Math.floor(x)
  y = Math.floor(y)
  size = Math.floor(size)
  ctx.save()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${size}px Verdana`
  ctx.fillText(text, x, y)
  ctx.restore()
}

function getObjectClassname(obj) {
  if (obj && obj.constructor && obj.constructor.toString()) {
    if(obj.constructor.name) {
     return obj.constructor.name;
    }
    var str = obj.constructor.toString();
    if(str.charAt(0) == '[')
    {
      var arr = str.match(/\[\w+\s*(\w+)\]/);
    } else {
      var arr = str.match(/function\s*(\w+)/);
    }
    if (arr && arr.length == 2) {
       return arr[1];
    }
   }
   return undefined; 
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

