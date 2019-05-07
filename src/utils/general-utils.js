const entriesToObj = entries => Object.fromEntries(new Map(entries));

const zip = (arr1, arr2) => arr1.map((elm, i) => [elm, arr2[i]]);

const addToEndIfDoesntExistAtEnd = (item, items) => {
  if (items.length === 0) return [item];
  if (items[items.length - 1] === item) return items;
  return [...items, item];
};

export { entriesToObj, zip, addToEndIfDoesntExistAtEnd };
