const assert = require('assert')
const Pikoro = require('./pikoro')

describe('Pikoro', () => {
  it('prints the selected days', () => {
    var pikoro = new Pikoro()
    console.log(pikoro.getComponent())
  })
})
