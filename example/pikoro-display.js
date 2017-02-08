var Pikoro = require('../')
var display = new Pikoro.Display()
console.log(display.getComponent())

display.on('change', console.log.bind(console, 'displayChange'))

document.body.appendChild(display.getComponent())

var input = new Pikoro.Input()
console.log(input.getComponent())

input.on('change', console.log.bind(console, 'inputChange'))

document.body.appendChild(input.getComponent())
