const DateRanger = require('./index')

const test = {
  requirements: {
    one() {
      console.log('=========================================================================================')
      console.log('1. Calculate days between : Number of days between the two dates in the date range model')
      console.log('=========================================================================================')
      const startDate = new Date(2010, 09, 01)
      const endDate = new Date(2010, 09, 15)
      const options = { type: 'days', startDate, endDate, includeEnd: true }
      const result = DateRanger.difference(options)
      console.log(options)
      const expectedResult = 15
      console.log({ expectedResult, result })
      console.log(result === expectedResult ? '✅' : '❌')
    },
    two() {
      const type = 'months', includeEnd = true
      const options = {
        '2.1': {
          rule: ':::: If the dates are exactly one month apart, return  1 :::::',
          diff: {
            type,
            startDate: new Date(2010, 09, 01),
            endDate: new Date(2010, 10, 01),
            includeEnd,
          },
          expectedResult: 1,
        },
        '2.2': {
          rule: ':::: If they are 1 and a half months apart it, return  1.5 ::::',
          diff: {
            type,
            startDate: new Date(2010, 09, 01),
            endDate: new Date(2010, 10, 15),
            includeEnd,
          },
          expectedResult: 1.5,
        },
        '2.3': {
          rule: ':::: If they are half a month between, return  0.5 ::::',
          diff: {
            type,
            startDate: new Date(2010, 09, 01),
            endDate: new Date(2010, 09, 15),
            includeEnd,
          },
          expectedResult: 0.5,
        },
      }
      const results = {
        '2.1': DateRanger.difference(options['2.1'].diff),
        '2.2': DateRanger.difference(options['2.2'].diff),
        '2.3': DateRanger.difference(options['2.3'].diff),
      }
  
      console.log('=========================================================================================')
      console.log('2. Calculate months between : Number of months between the two dates')
      console.log('=========================================================================================')
  
      for (const option of Object.keys(options)) {
        const { rule, diff, expectedResult } = options[option]
        console.log(rule)
        console.log(diff)
        console.log({ expectedResult, result: results[option] })
        console.log(results[option] === expectedResult ? '✅' : '❌')
      }
    },
    three() {
      console.log('=========================================================================================')
      console.log('3. Is between a supplied date : returns true if the passed is inside the date range')
      console.log('=========================================================================================')
      const date = new Date(2018, 02, 01)
      const startDate = new Date(2018, 01, 01)
      const endDate = new Date(2018, 03, 01)
      const options = { date, startDate, endDate }
      console.log(options)
      const isBetween = DateRanger.between(options)
      console.log({ expectedResult: true, result: isBetween })
      console.log(isBetween ? '✅' : '❌')
    },
    four() {
      console.log('=========================================================================================')
      console.log('4. The model is only valid if it has both a start and end date')
      console.log('=========================================================================================')
      const date = new Date(2018, 02, 01)
      const startDate = new Date(2018, 01, 01)
      const endDate = new Date(2018, 03, 01)
      const includeEnd = true
  
      // Test is successful if it errors... yep
      const log = (result) => {
        console.log(JSON.stringify(result))

        const errorTypes = result.errors.map(error => Object.keys(error))[0]
        const hasExpectedError = errorTypes.indexOf('missingFields') >= 0
        console.log(result.isValid === false && hasExpectedError ? '✅' : '❌')
      }
      const scenarios = {
        dayDiff_noStart: DateRanger.difference({ type: 'days', startDate: undefined, endDate, includeEnd }),
        dayDiff_noEnd: DateRanger.difference({ type: 'days', startDate, endDate: undefined, includeEnd }),
        monthDiff_noStart: DateRanger.difference({ type: 'months', startDate: undefined, endDate, includeEnd }),
        monthDiff_noEnd: DateRanger.difference({ type: 'months', startDate, endDate: undefined, includeEnd }),
        between_noStart: DateRanger.between({ date, startDate: undefined, endDate }),
        between_noEnd: DateRanger.between({ date, startDate, endDate: undefined }),
      }
      for (const scenario of Object.keys(scenarios)) {
        log(scenarios[scenario])
      }
    },
    five() {
      console.log('=========================================================================================')
      console.log('5. Truncate the dates to the day')
      console.log('=========================================================================================')
      // same logic used in model (not exported):
      const cloneAndTruncate = (date) => {
        const out = new Date(date)
        out.setHours(0, 0, 0, 0)      
        return out
      }
      const date = new Date(2018, 01, 02, 10, 25, 32, 44)
      const truncated = cloneAndTruncate(date)
      const results = {
        H: truncated.getHours(),
        M: truncated.getMinutes(),
        S: truncated.getSeconds(),
        MS: truncated.getMilliseconds(),
      }
      const { H, M, S, MS } = results
      console.log(`:: Pre :: H: ${date.getHours()} M: ${date.getMinutes()} S: ${date.getSeconds()} MS: ${date.getMilliseconds()}`)
      console.log(`:: Post :: H: ${H} M: ${M} S: ${S}, MS: ${MS}`)

      console.log( H + M + S + MS === 0 ? '✅' : '❌')
    }
  },
  validations: {
    difference(type, startDate, endDate, includeEnd, expectedDiff) {
      console.log('=========================================================================================')
      console.log(`The given startDate and endDate should return a difference of ${expectedDiff}`)
      console.log('=========================================================================================')
      const options = { type, startDate, endDate, includeEnd }
      console.log(options)
      const diff = DateRanger.difference(options)
      console.log({ diff })
      console.log(diff === expectedDiff ? '✅' : '❌')
    },
    between(date, startDate, endDate, expectedResult) {
      console.log('=========================================================================================')
      console.log(`Verify if the given date is between startDate and endDate or not.`)
      console.log('=========================================================================================')

      const options = { date, startDate, endDate }
      console.log(options)
      const isBetween = DateRanger.between(options)
      console.log({ expectedResult, result: isBetween })
      console.log(isBetween === expectedResult ? '✅' : '❌')
    },
    errorChecker(errorType, diffType, startDate, endDate) {
      console.log('=========================================================================================')
      console.log(`Ensure error type: ${errorType} is captured`)
      console.log('=========================================================================================')
      const includeEnd = true
      const result = DateRanger.difference({ type: diffType, startDate, endDate, includeEnd })
      console.log(JSON.stringify(result))
      if (!result.isValid) {
        const errorTypes = result.errors.map(error => Object.keys(error))[0]
        const hasExpectedError = errorTypes.indexOf(errorType) >= 0
        console.log(result.isValid === false && hasExpectedError ? '✅' : '❌')
      } else {
        console.log('❌')
      }
    },
  }
}

// hardcoded tests for the given requirements
test.requirements.one()
test.requirements.two()
test.requirements.three()
test.requirements.four()
test.requirements.five()

// run some validation tests
test.validations.difference('months', new Date(2018, 11, 01), new Date(2019, 0, 01), true,  1)
test.validations.difference('days', new Date(2018, 01, 01), new Date(2018, 01, 01), true,  0)
test.validations.difference('months', new Date(2018, 01, 01), new Date(2018, 01, 15), true,  0.5)
test.validations.difference('days', new Date(2018, 01, 01), new Date(2018, 01, 02), true,  2)
test.validations.difference('days', new Date(2019, 01, 01), new Date(2020, 01, 01), false, 365)
test.validations.between(new Date(2018, 02, 01), new Date(2018, 01, 01), new Date(2018, 03, 01), true)
test.validations.between(new Date(2018, 01, 02), new Date(2018, 01, 01), new Date(2018, 01, 03), true)
test.validations.between(new Date(2018, 01, 01), new Date(2017, 01, 01), new Date(2019, 01, 01), true)
test.validations.between(new Date(2018, 02, 01), new Date(2018, 03, 01), new Date(2018, 04, 01), false)
test.validations.errorChecker('invalidType', 'Trousers', new Date(2019, 01, 01), new Date(2020, 01, 01))
test.validations.errorChecker('invalidDate', 'days', 'Mickey Mouse', new Date(2020, 01, 01))
test.validations.errorChecker('invertedDates', 'days', new Date(2020, 01, 01), new Date(2019, 01, 01))