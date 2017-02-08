var domify = require('domify')
var fs = require('fs')
var EventEmitter = require('events').EventEmitter
var assign = require('lodash.assign')
var insertCss = require('insert-css')
var dateFunctions = require('../common/date-functions')

var css = fs.readFileSync(__dirname + '/styles.css', 'utf8') // eslint-disable-line 
insertCss(css)

var pikoroTemplate = fs.readFileSync(__dirname + '/template.html', 'utf8') // eslint-disable-line 

function Input (initDate) {
  // Variables
  var selectedDate
  var currentDate
  var root
  var emitter = new EventEmitter()

  // Methods
  var selectDate = function (date) {
    selectedDate = dateFunctions.normalizeDate(date)
    updateComponent()
  }

  var updateComponent = function () {
    if (!dateFunctions.isSameDay(selectedDate, currentDate)) {
      root.querySelector('.pk-text-input').value = selectedDate.toISOString()
      emitter.emit('change', selectedDate)
      currentDate = selectedDate
    }
  }

  var initializeNodes = function () {
    root = domify(pikoroTemplate)
    root.querySelector('.pk-text-input').addEventListener('blur', onBlur)
  }

  var onBlur = function (event) {
    var selected = new Date(event.target.value)
    selectDate(selected)
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

module.exports = Input
