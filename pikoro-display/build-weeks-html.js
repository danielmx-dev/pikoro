var getWeekdays = require('./get-weekdays')
var isSameDay = require('./is-same-day')

module.exports = function (year, month, selected) {
  var html = ''
  var weekdays = getWeekdays(year, month)
  weekdays.forEach(function (date) {
    if (date.getDay() === 0) {
      html += '<div>'
    }

    var classes = []
    if (date.getMonth() !== month) {
      classes.push('another')
    }
    if (isSameDay(date, selected)) {
      classes.push('selected')
    }

    html += '<span class="pk-date ' + classes.join(' ') + '" data-timestamp="' + date.getTime() + '">' + date.getDate() + '</span>'
    if (date.getDay() === 6) {
      html += '</div>'
    }
  })

  return html
}
