"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {  // DO NOT MODIFY

  /* YOU MAY MODIFY THE LINES BELOW */
  const wordArray = word?.toLowerCase().split('');
  const guessArray = guess?.toLowerCase().split('');
  if (!wordArray || !guessArray) return 0;
  let count = 0;
  const countMap = {};
  for (let item of guessArray) {
    if (countMap[item]) {
      countMap[item] += 1;
    } else {
      countMap[item] = 1;
    }
  }
  for (let item of wordArray) {
    if (countMap[item]) {
      countMap[item] -= 1;
      count += 1;
    }
  }

  return count;
}
