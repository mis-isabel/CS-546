/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import { mergeCommonElements, findTriangles, stringMetrics } from "./arrayUtils.js";
import { emojiCounter, sortStockPrices, mashUp } from "./stringUtils.js";
import { solvePuzzles, evaluatePokerHand, combineObjects } from "./objUtils.js";

try {
    console.log(mergeCommonElements([3, 8, 1, -2, -4], [3, 45, 1, 24, -4], [112, "-4", 0, 1, 3,]));
    console.log("merge successful");
}
catch (e) {
    console.error("merge failed");
}
try {
    console.log(mergeCommonElements([4, [5, "apple"], 3], [3, 4, [5, "apple"]], " "));
    console.log("merge successful");
}
catch (e) {
    console.error("merge failed");
}

try {
    console.log(findTriangles([[3, 3, 3], [5, 5, 7], [5, 4, 2]]));
    console.log("found triangles");
}
catch (e) {
    console.error("no triangles");
}
try {
    console.log(findTriangles([[10, 4, 4], [8, 9, 10], [3, 3, 4]]));
    console.log("found triangles");
}
catch (e) {
    console.error("no triangles");
}

try {
    console.log(stringMetrics(["soobin", "taehyun", "yeonjun", "hyuka", "beomgyu"]));
    console.log("string metrics successful");
}
catch (e) {
    console.error("string metrics failed");
}
try {
    console.log(stringMetrics(["a", ""]));
    console.log("string metrics successful");
}
catch (e) {
    console.error("string metrics failed");
}

try {
    console.log(mashUp("isabel", "sutedjo"));
    console.log("mashup successful");
}
catch (e) {
    console.error("mashup failed");
}
try {
    console.log(mashUp("no", "work"));
    console.log("mashup successful");
}
catch (e) {
    console.error("mashup failed");
}

let lastStocks = `AAPL,130.25|goog,10.40|AMZN,10.00`;
let currStocks = `AAPL,190.12|amzn,136.75|GOOG,235.60`;
try {
    console.log(sortStockPrices(lastStocks, currStocks));
    console.log("sort stock successful");
}
catch (e) {
    console.error("sort stock failed");
}
lastStocks = `GME,187.25|AMC, 10.40|PFE, 34.00`;
currStocks = `amc, 4.75|GME, 22.80|AAL, 93.32`;
try {
    console.log(sortStockPrices(lastStocks, currStocks));
    console.log("sort stock successful");
}
catch (e) {
    console.error("sort stock failed");
}


try {
    console.log(combineObjects(
        [{ a: 3, b: 8, c: 2, d: 6 },
        { d: false, e: 9, a: "banana" },
        { a: 8, d: 7 }]
    ));
    console.log("combine objects successful");
}
catch (e) {
    console.error("combine objects failed");
}
try {
    console.log(combineObjects("peepee"
    ));
    console.log("combine objects successful");
}
catch (e) {
    console.error("combine objects failed");
}


try {
    console.log(solvePuzzles([{ a: 9, b: 44 }, { b: 17, d: 7, e: "bye" }], { a: 45, b: 99, c: -3, d: -8, e: 12 }));
    console.log("puzzles solved successful");
}
catch (e) {
    console.error("puzzles solved failed");
}
try {
    console.log(solvePuzzles([], { a: 83, b: 27, d: 88, e: 1 }));
    console.log("puzzles solved successful");
}
catch (e) {
    console.error("puzzles solved failed");
}

try {
    console.log(emojiCounter(":ghost::clown::yo:"));
    console.log("emoji counter successful");
}
catch (e) {
    console.error("emoji counter failed");
} try {
    console.log(emojiCounter("     "));
    console.log("emoji counter successful");
}
catch (e) {
    console.error("emoji counter failed");
}
let hand = [{ suit: 'hearts', value: '2' }, { suit: 'hearts', value: '3' }];
let communityCards = [
    { suit: 'hearts', value: '1' },
    { suit: 'hearts', value: '2' },
    { suit: 'hearts', value: '3' }
];
try {
    console.log(evaluatePokerHand(hand, communityCards));
    console.log("poker hand successful");
}
catch (e) {
    console.error("poker hand failed");
}
hand = [{ suit: 'hearts', value: '3' }, { suit: 'hearts', value: '9' }];
communityCards = [
    { suit: 'diamonds', value: '4' },
    { suit: 'spades', value: '5' },
    { suit: 'hearts', value: '6' },
    { suit: 'clubs', value: '7' },
    { suit: 'diamonds', value: '8' }
];
try {
    console.log(evaluatePokerHand(hand, communityCards));
    console.log("poker hand successful");
}
catch (e) {
    console.error("poker hand failed");
}