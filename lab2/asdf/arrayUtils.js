/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let mergeCommonElements = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  //error checking
  for (let i = 0; i < args.length; i++) {
    if (!(Array.isArray(args[i]))) {
      throw "Error: Not an array.";
    }
  }
  if (args.length < 2) {
    throw "Error: Need at least 2 arrays.";
  }
  for (let element of args) {
    if (element.length === 0) {
      throw "Error: Empty Array.";
    }
  }
  let tempArr = [];
  let finalArr = args[0];
  //flatten all arrays
  for (let x = 0; x < args.length; x++) {
    if (Array.isArray(args[x])) {
      tempArr.push(args[x].flat(Infinity));
    }
  }
  //go through other arrays
  for (let y = 1; y < args.length; y++) {
    const currArr = tempArr[y];
    finalArr = finalArr.filter((element) => currArr.includes(element));
  }
  finalArr = finalArr.sort((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    // Numbers come before strings
    return typeof a === 'number' ? -1 : 1;
  });
  return finalArr;
};

export let findTriangles = (arr) => {
  //define final array
  let array = {};
  //error catching
  for (let y = 0; y < arr.length; y++) {
    if (!Array.isArray(arr[y])) {
      throw "Error: Array is not a 2D array.";
    }
    if (arr[y].length != 3) {
      throw "Error: Subarray is not a valid triangle.";
    }
    for (let x = 0; x < arr.length; x++) {
      if ((typeof arr[y][x]) !== 'number') {
        throw "Error: Subarrays do not contain only numbers.";
      }
    }
    const [a, b, c] = arr[y];
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw "Error: Subarray is not a valid triangle.";
    }
    //math
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const perimeter = a + b + c;

    //triangle type
    let type = "scalene";
    if (a === b && b === c) {
      type = "equilateral";
    }
    else if (a === b || b === c || a === c) {
      type = "isosceles";
    }
    //add results to final array
    array[y] = [Math.round(area * 100) / 100, perimeter, type];
  }
  return array;
};

export let stringMetrics = (arr) => {
  //defining variables
  const vowels = ["A", "a", "E", "e", "I", "i", "O", "o", "U", "u"]
  let vowelCount = 0;
  let consonantCount = 0;
  let long = arr[0];
  let short = arr[0];
  let longArray = [];
  let shortArray = [];
  let lengthsArray = [];
  let array = {};
  if (!Array.isArray(arr)) {
    throw "Error: Argument is not an array.";
  }
  //error catching
  for (let x of arr) {
    if (arr.length < 2) {
      throw "Error: Need at least 2 strings.";
    }
    if ((typeof x) !== 'string') {
      throw "Error: Subarrays do not contain only strings.";
    }
    if (x.trim().length === 0) {
      throw "Error: Empty string."
    }
    //check for vowels/consonants
    for (let y of x) {
      if (vowels.indexOf(y) !== -1) {
        vowelCount++;
      }
      else {
        consonantCount++;
      }
    }
    //check for longest/shortest string 
    const currString = x;
    if (currString.length > long.length) {
      longArray[x] = currString;
    }
    if (currString.length === long.length) {
      long = currString;
    }
    if (currString.length < short.length) {
      short = currString;
    }
    else if (currString.length === short.length) {
      shortArray[x] = currString;
    }
    //add lengths to array
    lengthsArray[x] = x.length;
  }
  lengthsArray = Object.values(lengthsArray);
  let mean = 0;
  let median = 0;

  //calculate mean
  for (let i of lengthsArray) {
    mean += i;
  }
  mean = Math.round((mean / lengthsArray.length) * 100) / 100;

  //calculate median
  lengthsArray.sort((a, b) => a - b);
  const middle = Math.floor(lengthsArray.length / 2);
  if (lengthsArray.length % 2 === 0) {
    median = (lengthsArray[middle - 1] + lengthsArray[middle]) / 2;
  }
  else {
    median = lengthsArray[middle];
  }

  // calculating mode
  const strlengths = arr.map(item => item.length);
  // sorting the lengths
  strlengths.sort((a, b) => a - b);

  let maxFrequency = 0;
  let mode = [];
  let frequencyMap = {};

  for (let x of strlengths) {
    frequencyMap[x] = (frequencyMap[x] || 0) + 1;
    maxFrequency = Math.max(maxFrequency, frequencyMap[x]);
  }

  for (let x in frequencyMap) {
    if (frequencyMap[x] === maxFrequency) {
      mode.push(parseInt(x)); // Parse to integer if needed
    }
  }

  //adding key-value pairs
  array.vowels = vowelCount;
  array.consonants = consonantCount;
  longArray = Object.values(longArray);
  shortArray = Object.values(shortArray);
  if (longArray.length > 1) {
    array.longest = longArray;
  }
  else if (longArray.length < 2) {
    array.longest = long;
  }
  if (shortArray.length > 1) {
    array.shortest = shortArray;
  }
  else if (shortArray.length < 2) {
    array.shortest = short;
  }
  array.mean = mean;
  array.median = median;
  if (mode.length === arr.length) {
    array.mode = null;
  }
  else if (mode.length > 1) {
    array.mode = mode;
  }
  else if (mode.length < 2) {
    array.mode = mode[0];
  }
  return array;
};
