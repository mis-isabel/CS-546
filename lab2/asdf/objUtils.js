/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let solvePuzzles = (puzzles, pieces) => {
      //error checking
      //regex for letters a-e
      const regex = /^[a-e]$/i;
      if (!Array.isArray(puzzles)) {
            throw "Error: Puzzles is not an array.";
      }
      if (puzzles.length === 0) {
            throw "Error: Puzzles is an empty array.";
      }
      for (let object of puzzles) {
            if (Object.keys(object).length < 2) {
                  throw "Error: Puzzles require at least 1 key/value."
            }
            const keys = Object.keys(object);
            if ((keys.every((element) => regex.test(element))) === false) {
                  throw ("Error: Puzzle Keys are not a-e.")
            }
      }
      if (Object.keys(pieces).length < 2) {
            throw "Error: Pieces require at least 1 key/value."
      }
      const keys = Object.keys(pieces);
      if ((keys.every((element) => regex.test(element))) === false) {
            throw ("Error: Pieces Keys are not a-e.")
      }

      //array
      let finalArr = [];
      //object
      let finalObj = {};
      //initializing keys
      for (let letter of ("abcde")) {
            finalObj[letter] = [];
      }
      for (let object of puzzles) {
            //reset object for next one
            finalObj = {};
            for (let letter of "abcde") {
                  if (object.hasOwnProperty(letter)) {
                        finalObj[letter] = (object[letter]);
                  }
                  else {
                        finalObj[letter] = (pieces[letter]);
                  }
            }
            finalArr.push(finalObj);
      }
      return finalArr;
};

export let evaluatePokerHand = (hand, communityCards) => {
      //error checking
      if (hand.length != 2) {
            throw ("Error: Need 2 cards in hand.")
      }
      if ((communityCards < 3 && communityCards > 5)) {
            throw ("Error: Community Cards needs 3-5 cards.")
      }
      const suits = ['hearts', 'clubs', 'diamonds', 'spades'];
      const value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      for (let card of hand) {
            if (suits.includes(card.suit) !== true) {
                  throw ("Error: Invalid suit.")
            }
            if (value.includes(card.value) !== true) {
                  throw ("Error: Invalid value.")
            }
      }
      for (let card of communityCards) {
            if (suits.includes(card.suit) !== true) {
                  throw ("Error: Invalid suit.")
            }
            if (value.includes(card.value) !== true) {
                  throw ("Error: Invalid value.")
            }
      }
      //combining hand and community cards
      let combineHand = [];
      for (let card of hand) {
            combineHand.push(card);
      }
      for (let card of communityCards) {
            combineHand.push(card);
      }
      //checking for straight flush

      //checking for pairs and 3 of a kind
      let type = 0;
      for (let card of combineHand) {
            let checkVal = card;
            for (let cards of combineHand) {
                  if ((checkVal.value === cards.value) && ((card.value !== cards.value) && (card.suit !== cards.suit))) {
                        type++;
                  }
            }
            if (type >= 2) {
                  return "Pair"
            }
            else if (type >= 3) {
                  return "Three of a Kind"
            }
      }
      return "High Card"
};

export let combineObjects = (arr) => {
      let final = {};
      //error checking
      if (!Array.isArray(arr)) {
            throw "Error: Not an array."
      }
      if (arr.length < 2) {
            throw "Error: At least 2 objects required."
      }
      for (let object of arr) {
            if (object.length < 1) {
                  throw "Error: At least 1 key/value required."
            }
      }
      //gets first key of first object
      const firstArrKey = Object.keys(arr[0]);

      //get common keys
      const comKeys = firstArrKey.reduce((finalTemp, key) => {
            //check exists in all objects
            if (arr.every(obj => obj.hasOwnProperty(key))) {
                  finalTemp.push(key);
            }
            return finalTemp;
      }, []);

      //initializing keys
      for (let key of comKeys) {
            final[key] = [];
      }

      for (let object of arr) {
            for (let key of comKeys) {
                  final[key].push(object[key]);
            }
      }
      return final;
};
