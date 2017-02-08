var dateFunctions = require('../common/date-functions')
var TOTAL_NUMBER_OF_DAYS = 42

module.exports = function (year, month) {
  var startOfMonth = new Date(year, month, 1)
  var startDate = getAbsoluteStartDate(startOfMonth)

  return generateDates(startDate, TOTAL_NUMBER_OF_DAYS)
}

var getAbsoluteStartDate = function (startOfMonth) {
  var startDayOfWeek = startOfMonth.getDay()
  return dateFunctions.moveDate(startOfMonth, -startDayOfWeek)
}

var generateDates = function (date, numberOfDays) {
  var pivot = date
  var dates = [pivot]
  while (--numberOfDays) {
    pivot = dateFunctions.moveDate(pivot, 1)
    dates.push(pivot)
  }
  return dates
}
