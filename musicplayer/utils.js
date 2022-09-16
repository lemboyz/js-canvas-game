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
    //ctx.fillText(emoji, 0, size);
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText(emoji, size/2, size/2);

    const url = canvas.toDataURL();
    setFavicon(url);
}

function log(str) {
    const args = {
        method: 'POST',
        body: String(str)
    }
    fetch('/log', args)
}
