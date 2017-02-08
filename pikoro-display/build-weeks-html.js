var getWeekdays = require('./get-weekdays')
var buildDateHtml = require('./build-date-html')
var chunk = require('lodash.chunk')
var reduce = require('lodash.reduce')

module.exports = function (year, month) {
  var weekdays = getWeekdays(year, month)

  return reduce(chunk(weekdays, 7), function (html, week) {
    var daySpans = reduce(week, function (daysHtml, date) {
      return daysHtml + buildDateHtml(date, month)
    }, '')
    return html + '<div>' + daySpans + '</div>'
  }, '')
}
