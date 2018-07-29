const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d.getTime())
}

const isValidType = (validTypes, type) => {
  if (!validTypes) { return true }
  if (!validTypes[type]) { return false }

  return true
}

const validate = (props, validTypes) => {
  const { type, startDate, endDate } = props
  const out = { isValid: false, errors: [] }
  
  // check for valid type: ['months', 'days']
  const typeIsValid = isValidType(validTypes, type)
  if (!typeIsValid) {
    out.errors.push({
      invalidType: {
        message: `Invalid Type supplied: ${type}`,
        detail: `Valid types: ${Object.keys(validTypes).join()}`
      }
    })
    return out
  }

  // check for required args
  if (!startDate || !endDate) {
    out.errors.push({
      missingFields: {
        message: 'Missing required fields',
        detail: `Fields supplied: ${JSON.stringify({ startDate, endDate })}`
      }
    })
    return out
  }

  // check for valid dates
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    out.errors.push({
      invalidDate: {
        message: 'Invalid date',
        detail: `Dates supplied: ${JSON.stringify({ startDate, endDate })}`
      }
    })
    return out
  }

  // check for inverted start and end
  if (startDate > endDate) {
    out.errors.push({
      invertedDates: {
        message: 'startDate cannot be greater than endDate',
        detail: `Dates supplied: ${JSON.stringify({ startDate, endDate })}`
      }
    })
  }

  out.isValid = out.errors.length === 0

  return out
}

module.exports = { validate }