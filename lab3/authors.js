//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json
import axios from "axios";

export async function getAuthors() {
    try {
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
        return data // this will be the array of author objects
    }
    catch (e) {
        throw e;
    }
}

export async function getBooks() {
    try {
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
        return data // this will be the array of author objects}
    }
    catch (e) {
        throw e;
    }
}

export const getAuthorById = async (id) => {
    //error checking
    if ((typeof id) !== 'string') {
        throw "Error: Argument is not a string.";
    }
    const trimmed = id.trim();
    if (trimmed === "") {
        throw "Error: id string is empty.";
    }
    const authors = await getAuthors();
    const authorObject = authors.filter(item => item.id.includes(trimmed));
    if (authorObject.length > 0) {
        //return the object and not an array
        return authorObject[0];
    }
    else {
        throw "Error: Author not found.";
    }
};

export const searchAuthorByName = async (searchTerm) => {
    //error checking
    if (typeof searchTerm !== 'string') {
        throw "Error: Argument is not a string.";
    }
    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed === "") {
        throw "Error: searchTerm string is empty.";
    }
    const authors = await getAuthors();
    let names = [];
    for (let author of authors) {
        //combine first and last names
        const fullName = author.first_name + " " + author.last_name;
        //check if its in the name in lowercase
        if (fullName.toLowerCase().includes(trimmed)) {
            names.push(fullName);
        }
    }
    if (names.length > 0) {
        //sort the names
        names.sort((x, y) => {
            const [firstX, lastX] = x.split(" ");
            const [firstY, lastY] = y.split(" ");
            const compareLast = lastX.localeCompare(lastY);
            //sort for same last name
            if (compareLast === 0) {
                return names.indexOf(x) - names.indexOf(y);
            }
            return compareLast;
        })
        return names;
    }
    else {
        throw "Error: Author not found.";
    }
};

export const getBookNames = async (firstName, lastName) => {
    //error checking
    if ((typeof firstName !== 'string') || (typeof lastName !== 'string')) {
        throw "Error: Argument is not a string.";
    }
    const trimFirst = firstName.trim().toLowerCase();
    const trimLast = lastName.trim().toLowerCase();
    if ((trimFirst === "") || (trimLast === "")) {
        throw "Error: Argument string is empty.";
    }
    const authors = await getAuthors();
    const books = await getBooks();
    let bookId = [];
    let authorFoundFlag = false;
    for (let author of authors) {
        //check if the names are equal in lowercase
        if ((author.first_name.toLowerCase() === trimFirst) && (author.last_name.toLowerCase() === trimLast)) {
            bookId = author.books;
            authorFoundFlag = true;
            break;
        }
    }
    //error checking
    if (authorFoundFlag === false) {
        throw "Error: Author not found.";
    }
    let i = 0;
    let bookTitles = [];
    for (let book of books) {
        //find book names
        if (book.id === bookId[i]) {
            bookTitles.push(book.title);
            i++;
        }
    }
    if (bookId.length > 0) {
        //sort the names
        bookTitles.sort((x, y) => {
            return x.localeCompare(y);
        })
        return bookTitles;
    }
    else {
        throw "Error: Books not found.";
    }
};

export const youngestOldest = async () => {
    const authors = await getAuthors();
    let old = authors[0].date_of_birth.split("/");
    let young = authors[0].date_of_birth.split("/");
    //finds oldest and youngest years
    for (let author of authors) {
        const currAge = author.date_of_birth.split("/");
        if (Number(currAge[2]) < Number(old[2])) {
            old = currAge;
        }
        else if (Number(currAge[2]) === Number(old[2])) {
            if (Number(currAge[0]) < Number(old[0])) {
                old = currAge;
            }
            else if (Number(currAge[0]) === Number(old[0])) {
                if (Number(currAge[1]) <= Number(old[1])) {
                    old = currAge;
                }
            }
        }
        if (Number(currAge[2]) > Number(young[2])) {
            young = currAge;
        }
        else if (Number(currAge[2]) === Number(young[2])) {
            if (Number(currAge[0]) > Number(young[0])) {
                young = currAge;
            }
            else if (Number(currAge[0]) === Number(young[0])) {
                if (Number(currAge[1]) >= Number(young[1])) {
                    young = currAge;
                }
            }
        }
    }
    let oldArray = [];
    let youngArray = [];
    //finds names of oldest and youngest
    for (let author of authors) {
        let oldDob = old[0] + "/" + old[1] + "/" + old[2];
        let youngDob = young[0] + "/" + young[1] + "/" + young[2];
        if (author.date_of_birth === oldDob) {
            oldArray.push(author.first_name + " " + author.last_name)
        }
        if (author.date_of_birth === youngDob) {
            youngArray.push(author.first_name + " " + author.last_name)
        }
    }
    const datesObject = {
        youngest: youngArray,
        oldest: oldArray
    };
    return datesObject;
};

export const sameBirthday = async (month, day) => {
    //error checking
    if ((typeof month !== 'number') || (typeof day !== 'number')) {
        throw "Error: Argument is not a number.";
    }
    if ((month > 12) || (month < 1)) {
        throw "Error: Month is not valid";
    }
    const thirtyOne = [1, 3, 5, 7, 8, 10, 12];
    const thirty = [4, 6, 9, 11];
    if ((thirtyOne.includes(month) && (day >= 31)) || (thirty.includes(month) && (day >= 30)) || (month === 2 && (day >= 28))) {
        throw "Error: Day is not valid";
    }
    const authors = await getAuthors();
    const sameBday = [];
    for (let author of authors) {
        //check for same birthday
        const currBday = author.date_of_birth.split("/");
        if (Number(currBday[0]) === month && Number(currBday[1]) === day) {
            sameBday.push(author.first_name + " " + author.last_name)
        }
    }
    if (sameBday.length >= 2) {
        //sort the names
        sameBday.sort((x, y) => {
            const [firstX, lastX] = x.split(" ");
            const [firstY, lastY] = y.split(" ");
            const compareLast = lastX.localeCompare(lastY);
            //sort for same last name
            if (compareLast === 0) {
                return sameBday.indexOf(x) - sameBday.indexOf(y);
            }
            return compareLast;
        })
        return sameBday;
    }
    else {
        throw "Error: No 2 authors with same birthday.";
    }
};
