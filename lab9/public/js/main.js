//Here is where you will do all of the logic and processing for the palindrome and prime checking.

function palindromeValidator(input) {
    const regex = /[\W_]/g;
    input = input.trim();
    input = input.toLowerCase();
    input = input.replace(regex, "");
    const reverseInput = input.split("").reverse().join("");
    //checks if the reverse is the same as the original input, if it is then it is a palindrome
    if (reverseInput === input) {
        return "true";
    }
    else {
        return "false";
    }
}

//referenced https://www.geeksforgeeks.org/javascript-program-for-prime-numbers/# 
function primeValidator(num) {
    if (num <= 1)
        return false;

    for (let x = 2; x < num; x++)
        if (num % x == 0)
            return false;

    return true;
}

let palindrome = document.getElementById("form");
let inputElement = document.getElementById("palindrome_input");
let pal = document.getElementById("palindromes");

if (palindrome) {
    //event listener to the form
    palindrome.addEventListener("submit", function (event) {
        event.preventDefault();
        try {
            const errorType = document.querySelector(".error");
            if (errorType) {
                errorType.remove();
            }
            let input = inputElement.value.trim();
            if (input === "") {
                throw "Error: Invalid input."
            }
            let palindromeArray = [];
            let inputArr = input.split(",");
            for (const input of inputArr) {
                palindromeArray.push(palindromeValidator(input));
            }
            let arrLength = palindromeArray.length;
            palindromeArray = '[' + palindromeArray.join(", ") + ']';
            let result = document.createElement('li');
            result.classList.add('result');
            result.innerHTML = palindromeArray;
            pal.appendChild(result);
            if (primeValidator(arrLength)) {
                result.classList.add('prime');
            }
            else {
                result.classList.add("not-prime");
            }
        }
        catch (e) {
            let error = document.createElement("p");
            error.classList.add("error");
            error.innerHTML = e;
            palindrome.append(error);
        }

    });

}
