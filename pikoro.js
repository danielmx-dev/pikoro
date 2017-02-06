var domify = require('domify')
var fs = require('fs')
var getWeekdays = require('./lib/get-weekdays')
var buildWeeksHtml = require('./lib/build-weeks-html')

var equalsMonth = function (date1, date2) {
  if (!date1 || !date2) {
    return false
  }
  return date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
}

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
var printMonth = function (date) {
  return monthNames[date.getMonth()]
}

var pikoroTemplate = fs.readFileSync(__dirname + '/pikoro.html', 'utf8') // eslint-disable-line 

function Pikoro (initDate) {
  // Variables
  var monthChanged
  var selectedDate
  var displayYear
  var displayMonth
  var root

  // Methods
  var selectDate = function (date) {
    monthChanged = !equalsMonth(selectedDate, date)
    selectedDate = date
    updateComponent()
  }

  var updateComponent = function () {
    var weekdays = getWeekdays(selectedDate)
    root.querySelector('.pk-current-month').innerHTML = printMonth(selectedDate)
    root.querySelector('.pk-days-container').innerHTML = buildWeeksHtml(weekdays)
  }

  var initializeNodes = function () {
    root = domify(pikoroTemplate)
  }

  var getComponent = function () {
    return root
  }

  // Initialization
  initDate = initDate || new Date()
  initializeNodes()
  selectDate(initDate)


  return {
    selectDate: selectDate,
    getComponent: getComponent
  }
}

Pikoro.prototype.render = function () { }

module.exports = Pikoro
