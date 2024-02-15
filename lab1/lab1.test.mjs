import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

//lab1 tests
console.log(lab1.questionOne(["Hello", "good", "weather", "today"])); // returns [9, false] 
console.log(lab1.questionOne(["I", "love", "CS 546.", "Best class ever."])); // returns [7, false] 
console.log((lab1.questionOne(["Ths s nrdbl", "grd"]))); // returns [0, true] 
console.log((lab1.questionOne(["Why", "am", "I", "cS", "major"]))); // returns [4, false] 
console.log((lab1.questionOne(["hELp", "me"]))); // returns [2, even] 

//lab2 tests
console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })) // returns ["d","e"] 
console.log(lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })) // returns ["a","b","c","d","e","f"]
console.log(lab1.questionTwo({ '1': true, a: 5, '2': 'hi' }, { '3': true, b: 5, '44': "hi", '4': "bye", '5': 8 })) // returns ['1', '2', '3', '4', '5', '44', 'a', 'b'] 
console.log(lab1.questionTwo({ '1.5': "m", a: "adf", '2': 'lkj' }, { a: true, 9: 5, '7': "hi", 'adf': "bye", '5': 8 })) // returns ['1.5', '2', '5', '7', '9', 'adf'] 
console.log(lab1.questionTwo({ '3hi8': "m", l: "adf", '9': 'lkj' }, { 3: true, "bye": 5, '9': "m", 'adf': "adf", '5': 8 })) // returns ['3', '3hi8', '5', 'adf', 'bye', 'l'] 

//lab3 tests
console.log(lab1.questionThree([[3, 3, 3], [3, 3, 4], [5, 4, 2]]))   // returns {'0': [3.9,9], '1': [4.47,10], '2': [3.8,11]} 
console.log(lab1.questionThree([[7, 5, 5], [2, 4, 3], [8, 5, 6], [12, 12, 11]]))   // returns {'0': [12.5, 17], '1': [2.9,9], '2': [14.98,19], '3': [58.66,35]} 
console.log(lab1.questionThree([[4, 4, 4], [8, 12, 10]]))   // returns {'0': [6.93, 12], '1': [39.69,30]} 
console.log(lab1.questionThree([[7, 4, 10], [2, 9, 10], [6, 2, 5], [12, 12, 11]]))   // returns {'0': [10.93, 21], '1': [8.18,21], '2': [4.68,13], '3': [58.66,35]} 
console.log(lab1.questionThree([[30, 7, 28], [2, 4, 3], [8, 5, 6], [5, 28, 26]]))   // returns {'0': [96.56, 65], '1': [2.9,9], '2': [14.98,19], '3': [61.6,59]} 

//lab4 tests
console.log(lab1.questionFour('patrick,hill,trees,home'));  //should return and then log ['rickpat', 'llhi', 'eestr', 'meho'] 
console.log(lab1.questionFour('joseph,ball,square,pencil'));  //should return and then log ['ephjos', 'llba', 'aresqu', 'cilpen'] 
console.log(lab1.questionFour('cslay,kslay,fast,sase,esc'));  //should return and then log ['laycs', 'layks', 'stfa', 'sesa', 'sce'] 
console.log(lab1.questionFour('help,me,class,hard'));  //should return and then log ['lphe', 'em', 'asscl', 'rdha'] 
console.log(lab1.questionFour('i,am,sleepy,want'));  //should return and then log ['i', 'ma', 'epysle', 'ntwa'] 

//ta tests that were wrong
console.log("ta tests");
console.log(lab1.questionTwo({ 'pineapple': 'on pizza', 'happy': false, [8002]: 'in the future' }, { [8002]: false, 'happy': true, [8]: 8, [4]: 'four', [8001]: 'not yet', 'cheese': 'please', [9]: 999 }));
console.log(lab1.questionTwo({ [1]: 3, [2]: 2, [3]: 1, [11]: 12 }, { [6]: 3, [5]: 2, [4]: 1, [3]: 4, 'forks': 'spoons' })); 