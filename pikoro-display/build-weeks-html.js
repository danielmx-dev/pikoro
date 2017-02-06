var getWeekdays = require('./get-weekdays')

var isSameDay = function (date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

module.exports = function (year, month, selected) {
  var html = ''
  var weekdays = getWeekdays(year, month)
  weekdays.forEach(function (date) {
    if (date.getDay() === 0) {
      html += '<div>'
    }

    var style = 'style="display:inline-block;width:2em;'
    if (date.getMonth() !== month) {
      style += 'color: lightgray;'
    }
    if (isSameDay(date, selected)) {
      style += 'color: red;'
    }
    style += '"'

    html += '<span class="pk-date"' + style + ' data-timestamp="' + date.getTime() + '">' + date.getDate() + '</span>'
    if (date.getDay() === 6) {
      html += '</div>'
    }
  })

  return html
}
