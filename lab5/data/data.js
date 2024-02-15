/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/

import axios from 'axios';

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
        return data // this will be the array of book objects}
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
        throw "Error: Author not found!";
    }
};

export const getBookById = async (id) => {
    //error checking
    if ((typeof id) !== 'string') {
        throw "Error: Argument is not a string.";
    }
    const trimmed = id.trim();
    if (trimmed === "") {
        throw "Error: id string is empty.";
    }
    const books = await getBooks();
    const bookObject = books.filter(item => item.id.includes(trimmed));
    if (bookObject.length > 0) {
        //return the object and not an array
        return bookObject[0];
    }
    else {
        throw "Error: Book not found!";
    }
};
