import _ from 'lodash'
import moment from 'moment'

const calWaitTime = (departureDate) => {
  var today = new Date()
  var currentDate =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  var startTime = moment(currentDate, 'HH:mm:ss')
  var endTime = moment(departureDate, 'HH:mm:ss')
  var min = moment.utc(endTime.diff(startTime)).format('mm')
  return [min] + ' ' + 'min'
}
const calDelyedTime = (realDeparture, sheduledDeparture) => {
  const timeDiff =
    new Date(sheduledDeparture).getHours() * 60 +
    new Date(sheduledDeparture).getMinutes() -
    new Date(realDeparture).getHours() * 60 -
    new Date(realDeparture).getMinutes()
  if (timeDiff === 0) return 'Ontime'

  if (timeDiff.toString().includes('-')) return timeDiff + ' min ' + 'Delayed'
  else return timeDiff + ' min ' + 'Earlier'
}
function renderCell(stopInfo, column) {
  if (column.refId === 'time') {
    return new Date(_.get(stopInfo, column.path) * 1000)
      .toISOString()
      .substr(11, 5)
  }
  if (column.refId === 'delay') {
    const realDeparture = _.get(stopInfo, column.path[0]) * 1000
    const sheduledDeparture = _.get(stopInfo, column.path[1]) * 1000
    return calDelyedTime(realDeparture, sheduledDeparture)
  }
  if (column.refId === 'dueIn') {
    const departureDate = new Date(_.get(stopInfo, column.path) * 1000)
      .toISOString()
      .substr(11, 8)
    return calWaitTime(departureDate)
  }
  return _.get(stopInfo, column.path)
}

export default renderCell
