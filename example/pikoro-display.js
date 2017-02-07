var Pikoro = require('../')
var display = new Pikoro.Display()
console.log(display.getComponent())

display.on('change', console.log.bind(console))

document.body.appendChild(display.getComponent())
