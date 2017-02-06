const assert = require('assert')
const getWeekDays = require('../get-weekdays')

describe('get-weekdays', () => {
  it('returns the proper array of days for each week', () => {
    const weekdays = getWeekDays(new Date(2017, 1, 5))
    assert.equal(weekdays.length, 42, 'always returns 42 days (6 weeks)')
    assert.equal(weekdays[0].getDate(), 29, 'provides the proper start of the dates')
    assert.equal(weekdays[0].getMonth(), 0, 'provides the proper start of the months')
    assert.equal(weekdays[41].getDate(), 11, 'provides the proper end of the dates')
    assert.equal(weekdays[41].getMonth(), 2, 'provides the proper end of the months')
  })
})
