var domify = require('domify')
var fs = require('fs')
var buildWeeksHtml = require('./build-weeks-html')
var EventEmitter = require('events').EventEmitter
var assign = require('lodash.assign')
var insertCss = require('insert-css')
var dateFunctions = require('../common/date-functions')

var css = fs.readFileSync(__dirname + '/styles.css', 'utf8') // eslint-disable-line 
insertCss(css)

var pikoroTemplate = fs.readFileSync(__dirname + '/template.html', 'utf8') // eslint-disable-line 

function Display (initDate) {
  // Variables
  var selectedDate
  var displayYear
  var displayMonth
  var currentMonth
  var currentYear
  var currentDate
  var root
  var emitter = new EventEmitter()

  // Methods
  var selectDate = function (date) {
    selectedDate = dateFunctions.normalizeDate(date)
    displayYear = date.getFullYear()
    displayMonth = date.getMonth()
    updateComponent()
  }

  var updateComponent = function () {
    if (currentMonth !== displayMonth || currentYear !== displayYear) {
      updateDisplayedMonth()
    }

    if (!dateFunctions.isSameDay(selectedDate, currentDate)) {
      updateSelectedDateElement()
    }
  }

  var updateDisplayedMonth = function () {
    root.querySelector('.pk-current-month').innerHTML = dateFunctions.getMonthName(displayMonth) + ' ' + displayYear
    root.querySelector('.pk-days-container').innerHTML = buildWeeksHtml(displayYear, displayMonth)

    currentMonth = displayMonth
    currentYear = displayYear
  }

  var updateSelectedDateElement = function () {
    var container = root.querySelector('.pk-days-container')
    var selectedElement = container.querySelector('.selected')
    if (selectedElement) {
      selectedElement.classList.remove('selected')
    }
    container.querySelector('.pk-date[data-timestamp="' + selectedDate.getTime() + '"]').classList.add('selected')
    currentDate = selectedDate
    emitter.emit('change', selectedDate)
  }

  var initializeNodes = function () {
    root = domify(pikoroTemplate)
    root.querySelector('.pk-days-container').addEventListener('click', onDateClick)
    root.querySelector('.pk-previous-month').addEventListener('click', displayPreviousMonth)
    root.querySelector('.pk-next-month').addEventListener('click', displayNextMonth)
  }

  var onDateClick = function (event) {
    if (!event.target.classList.contains('pk-date')) {
      return
    }
    var selected = new Date(Number(event.target.dataset.timestamp))
    selectDate(selected)
  }

  var displayNextMonth = function () {
    if (displayMonth === 11) {
      displayMonth = 0
      displayYear++
    } else {
      displayMonth++
    }
    updateComponent()
  }

  var displayPreviousMonth = function () {
    if (displayMonth === 0) {
      displayMonth = 11
      displayYear--
    } else {
      displayMonth--
    }
    updateComponent()
  }

  var getComponent = function () {
    return root
  }

  // Initialization
  initDate = initDate || new Date()
  initializeNodes()
  selectDate(initDate)

  // Module exports
  return assign(emitter, {
    selectDate: selectDate,
    getComponent: getComponent
  })
}

module.exports = Display
