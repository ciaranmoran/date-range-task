const validator = require('./validator')

const cloneAndTruncate = (startDate, endDate) => {
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)

  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)

  return { start, end }
}

const toDays = (days = 0) => {
  return days / 24 / 60 / 60 / 1000
}

const getDaysInMonth = (month, year) => {
  return toDays(Date.UTC(year, month + 1, 1) - Date.UTC(year, month, 1))
}

const TYPES = {
  days: {
    getDifference: (startDate, endDate, includeEnd) => {
      const { start, end } = cloneAndTruncate(startDate, endDate)
      const diff = end.getTime() - start.getTime()

      const additionValue = includeEnd ? 1 : 0
      // 86400000 = 1000 * 60 * 60 * 24 (ms -> secs -> mins -> hrs ... days)
      // round the result (we don't do half days) + end day if required
      return Math.round(diff / 86400000) + additionValue
    }
  },
  months: {
    getDifference: (startDate, endDate, includeEnd) => {
      const { start, end } = cloneAndTruncate(startDate, endDate)

      if (includeEnd) {
        end.setDate(end.getDate() + 1)
      }

      const yearDiff = end.getFullYear() - start.getFullYear()
      const monthDiff = end.getMonth() - start.getMonth()
      const dayDiff = end.getDate() - start.getDate()

      const days = getDaysInMonth(endDate.getMonth(), endDate.getFullYear())
      const diff = 1 * (yearDiff * 12 + monthDiff + dayDiff / days)

      // round to the nearest quarter to satisfy all conditions:
      // exactly 1 month apart, 0.5 months difference etc.
      // "approximates are fine"
      return (Math.round(diff * 4) / 4)
    }
  }
}

module.exports = {
  difference(props) {
    // basic sanity checks
    const validationResult = validator.validate(props, TYPES)
    if (!validationResult.isValid) {
      return validationResult
    }
    // all good, let's go
    const { type, startDate, endDate, includeEnd } = props

    if (startDate.getTime() === endDate.getTime()) { return 0 }

    return TYPES[type].getDifference(startDate, endDate, includeEnd)
  },
  between(props) {
    // basic sanity checks
    const validationResult = validator.validate(props)
    if (!validationResult.isValid) {
      return validationResult
    }

    const { date, startDate, endDate } = props
    return date > startDate && date < endDate
  }
}
