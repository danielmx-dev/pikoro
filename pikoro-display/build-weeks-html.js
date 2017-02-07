var getWeekdays = require('./get-weekdays')

module.exports = function (year, month) {
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

    html += '<span class="pk-date ' + classes.join(' ') + '" data-timestamp="' + date.getTime() + '">' + date.getDate() + '</span>'
    if (date.getDay() === 6) {
      html += '</div>'
    }
  })

  return html
}
