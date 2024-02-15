/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let emojiCounter = (message) => {
      //error checking
      if ((typeof message) !== 'string') {
            throw "Error: Not a string."
      }
      //no colons in string
      if (!/:/.test(message)) {
            throw "Error: Only Whitespace";
      }
      //regex for :emoji:
      const regex = /:(\w+):/g;
      const emoji = [...message.matchAll(regex)];
      return emoji.length;
};

export let sortStockPrices = (lastStocks, currStocks) => {
      //error checking
      if ((typeof lastStocks) !== 'string' || (typeof currStocks !== 'string')) {
            throw "Error: Not a string."
      }
      let last = lastStocks.trim().split('|');
      let curr = currStocks.trim().split('|');
      //sorting to get equal strings
      last = last.sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase()));
      curr = curr.sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase()));
      let lastStockTick = [];
      let currStockTick = [];

      for (const x of last) {
            const section = x.split(',');
            //checking for format 2 parts
            if (section.length !== 2) {
                  throw "Error: Wrong format";
            }
            const [ticks, price] = section;
            //using regex for checking stock ticker validity
            if (!/^[a-z]{1,5}$/i.test(ticks)) {
                  throw "Error: Wrong format."
            }
            //checking if price is valid number after conversion
            const prices = parseFloat(price);
            if (((typeof prices) !== 'number') || prices <= 0) {
                  throw "Error: Price is not a number"
            }
      }

      for (const x of curr) {
            const sectionCurr = x.split(',');
            //checking for format 2 parts
            if (sectionCurr.length !== 2) {
                  throw "Error: Wrong format";
            }
            const [ticksCurr, priceCurr] = sectionCurr;
            //using regex for checking stock ticker validity
            if (!/^[a-z]{1,5}$/i.test(ticksCurr)) {
                  throw "Error: Wrong format.";
            }
            //checking if price is valid number after conversion
            const pricesCurr = parseFloat(priceCurr);
            if (((typeof pricesCurr) !== 'number') || pricesCurr <= 0) {
                  throw "Error: Price is not a number";
            }
      }

      for (let i = 0; i < last.length; i++) {
            //separating out ticks and prices
            const section = last[i].split(',');
            const [ticks, price] = section;
            const sectionCurr = curr[i].split(',');
            const [ticksCurr, priceCurr] = sectionCurr;
            const lastTicker = ticks.toLowerCase();
            const currTicker = ticksCurr.toLowerCase();
            //checking for unique stock tickers
            if (lastStockTick.includes(lastTicker) || currStockTick.includes(currTicker)) {
                  throw "Error: Overlapping strings.";
            }
            lastStockTick.push(lastTicker);
            currStockTick.push(currTicker);
      }

      let final = [];
      for (let j = 0; j < lastStockTick.length; j++) {
            let temp = {};
            //checking if both strings are same
            if (lastStockTick[j] !== currStockTick[j]) {
                  throw "Error: Different Stocks.";
            }
            //separating out ticks and prices
            const section = last[j].split(',');
            const [ticks, price] = section;
            const sectionCurr = curr[j].split(',');
            const [ticksCurr, priceCurr] = sectionCurr;
            const prices = parseFloat(price);
            const pricesCurr = parseFloat(priceCurr);
            //finding % changed
            const increase = pricesCurr - prices;
            const percent = Math.round(((increase / prices) * 100) * 10) / 10;
            //creating object for output
            temp.symbol = lastStockTick[j].toUpperCase();
            temp.price = pricesCurr;
            temp.change = percent;
            final[j] = temp;
      }
      final = final.sort((a, b) => b['change'] - a['change']);
      return final;
};

export let mashUp = (string1, string2) => {
      //error checking 
      if (((typeof string1) !== 'string') || (typeof string2 !== 'string')) {
            throw "Error: Not a string."
      }
      if ((string1.length < 4) || (string2.length < 4)) {
            throw "Error: String minimum 4 characters."
      }
      string1 = string1.trim();
      string2 = string2.trim();
      if ((string1.length === 0) || (string2.length === 0)) {
            throw "Error: Empty string."
      }
      //mashing and space
      let final = [];
      final += string2.slice(0, 4);
      final += string1.slice(4);
      final += " ";
      final += string1.slice(0, 4);
      final += string2.slice(4);
      return final;
};
