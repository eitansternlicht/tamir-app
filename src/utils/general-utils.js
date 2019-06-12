const entriesToObj = entries =>
  entries.reduce((prev, curr) => {
    const [key, val] = curr;
    return { ...prev, [key]: val };
  }, {});

const zip = (arr1, arr2) => arr1.map((elm, i) => [elm, arr2[i]]);

const addToEndIfDoesntExistAtEnd = (item, items) => {
  if (!items || items.length === 0) return [item];
  if (items[items.length - 1] === item) return items;
  return [...items, item];
};

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const removeKeys = (keys, obj) => {
  const objCopy = { ...obj };
  keys.forEach(k => delete objCopy[k]);
  return objCopy;
};

const difference = (objA, objB) => {
  const result = { ...objA };
  Object.keys(objB).forEach(k => delete result[k]);
  return result;
};

export { entriesToObj, zip, addToEndIfDoesntExistAtEnd, groupBy, removeKeys, difference };
