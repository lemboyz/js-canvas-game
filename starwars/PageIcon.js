class PageIcon {
    constructor() {
        this.timer = 0
        this.text = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘']
        this.frame = 0
        this.deleteFlag = false
    }
    draw() {
        setEmojiFavicon(this.text[this.frame])
    }
    update() {
        this.timer++
        if (this.timer > 30) {
            this.frame += 1
            if (this.frame > this.text.length-1) {
                this.frame = 0
            }
            this.timer = 0
        }
    }
}

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
    const size = 16 
    canvas.height = size;
    canvas.width = size;

    const ctx = canvas.getContext('2d');
    ctx.font = `${size}px serif`;
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText(emoji, size/2, size/2);

    const url = canvas.toDataURL();
    setFavicon(url);
}