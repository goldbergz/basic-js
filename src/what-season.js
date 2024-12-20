const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (!date) return 'Unable to determine the time of year!';
  if (
    Object.prototype.toString.call(date) !== '[object Date]' ||
    isNaN(date.getTime()) ||
    typeof date.getTime !== 'function'
  ) {
    throw new Error("Invalid date!");
  }
  let result;
  const seasons = [
    [11, 0, 1],
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10]
  ];
  const mounthNumber = date.getMonth();
  for (let i = 0; i < seasons.length; i++) {
    if (seasons[i].includes(mounthNumber)) {
      result = i;
    }
  }
  switch (result) {
    case 0:
      return 'winter';
    case 1:
      return 'spring';
    case 2:
      return 'summer';
    case 3:
      return 'autumn';
  }
}

module.exports = {
  getSeason
};
