const entriesToObj = entries => Object.fromEntries(new Map(entries));

const zip = (arr1, arr2) => arr1.map((elm, i) => [elm, arr2[i]]);

export { entriesToObj, zip };
