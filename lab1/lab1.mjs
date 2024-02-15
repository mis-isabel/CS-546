export const questionOne = (arr) => {
  //variables
  let index = 0;
  let index_letter = 0;
  let vowel = 0;

  //iterate through array then through string length
  while (index < arr.length) {
    index_letter = 0;
    while (index_letter < arr[index].length) {
      //checks for vowels regardless of case
      if (arr[index][index_letter] == 'a' || arr[index][index_letter] == 'e' || arr[index][index_letter] == 'i' || arr[index][index_letter] == 'o' || arr[index][index_letter] == 'u' || arr[index][index_letter] == 'A' || arr[index][index_letter] == 'E' || arr[index][index_letter] == 'I' || arr[index][index_letter] == 'O' || arr[index][index_letter] == 'U') {
        vowel++;
      }
      index_letter++;
    }
    index++;
  }

  //checks for even/odd total vowel count
  let parity = false;
  if (vowel % 2 == 0) {
    parity = true;
  }
  return [vowel, parity]; //return result
};

export const questionTwo = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const nonDuplicates = [];

  // check non duplicates
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      nonDuplicates.push(key);
    }
  }

  // check non duplicates in other array
  for (const key of keys2) {
    if (!keys1.includes(key) && !nonDuplicates.includes(key)) {
      nonDuplicates.push(key);
    }
  }

  //sort array
  let sorted = nonDuplicates.sort();
  sorted = nonDuplicates.sort();
  return sorted;
};


export const questionThree = (arr) => {
  //define final array
  let array = {};

  //go through given array
  for (let x = 0; x < arr.length; x++) {
    //calculate area and perimeter
    const s = (arr[x][0] + arr[x][1] + arr[x][2]) / 2;
    const area = Math.sqrt(s * (s - arr[x][0]) * (s - arr[x][1]) * (s - arr[x][2]));
    const perimeter = arr[x][0] + arr[x][1] + arr[x][2];
    //add results to final array
    array[x] = [Math.round(area * 100) / 100, perimeter];
  }
  return array; //return result
};

export const questionFour = (string) => {
  //csv into array, create empty final array
  const arr = string.split(",");
  let swap = [];

  //splits word and attaches end then first half
  for (let x = 0; x < arr.length; x++) {
    //accounts for odd word lengths
    if ((arr[x].length % 2) == 0) {
      swap[x] = arr[x].slice((arr[x].length) / 2);
      swap[x] += arr[x].slice(0, ((arr[x].length) / 2));
    }
    else {
      swap[x] = arr[x].slice(Math.round((arr[x].length) / 2) - 1);
      swap[x] += arr[x].slice(0, ((arr[x].length) / 2));
    }
  }
  return swap; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Isabel',
  lastName: 'Sutedjo',
  studentId: '20006618'
};
