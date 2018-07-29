**Date Range Task**

*Requirements*

Create a Date Range model with the following behaviour...
1. Calculate days between : Number of days between the two dates in the date range model  e.g
(2010 09 01, 2010 09 15) => 15

2. Calculate months between : Number of months between the two dates  e.g
if the dates are exactly one month apart, return  1 (2010 09 01, 2010 10 01) => 1
If they are 1 and a half months apart it, return  1.5 (2010 09 01, 2010 10 15) => 1.5
if they are half a month between, return  0.5 (2010 09 01, 2010 09 15) => 0.5 Approximates are fine

3. Is between a supplied date : returns true if the passed is inside the date range

4. The model is only valid if it has both a start and end date

5. Truncate the dates to the day  e.g
2010 09 01 18:00 => 2010 09 01 00:00


*Constraints*

Do not use any external libraries, just core NodeJS.


*Notes*

Complete the task using  Javascript \
We’re looking for  Simplicity  and  Testing \
We are not looking for a running  application  of any kind, if anything, just a script to run the  Unit Tests.

**Run Tests**

`npm test`

✅ = good \
❌ = not so good