export const compare = (key, direction) => {
  return (a, b) => {
    let aVal = a[key];
    let bVal = b[key];

    if (isNaN(aVal)) {
      aVal = aVal.toUpperCase();
      bVal = bVal.toUpperCase();
    } else {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    let comparison = 0;

    if (!isNaN(aVal)) {
      comparison = bVal - aVal;
    } else {
      if (aVal > bVal) {
        comparison = 1;
      }

      if (aVal < bVal) {
        comparison = -1;
      }
    }

    return (direction === 'ASC') ? (comparison * -1) : comparison;
  }
};
