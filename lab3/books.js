//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
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
        throw "Error: Book not found.";
    }
};

export const getAuthorName = async (bookId) => {
    //error checking
    if ((typeof bookId !== 'string')) {
        throw "Error: Argument is not a string.";
    }
    const trimId = bookId.trim();
    if ((trimId === "")) {
        throw "Error: Argument string is empty.";
    }
    const authors = await getAuthors();
    const books = await getBooks();
    let authorId = [];
    let bookFoundFlag = false;
    for (let book of books) {
        //find book names
        if (book.id === trimId) {
            authorId = book.authorId;
            bookFoundFlag = true;
            break;
        }
    }
    if (bookFoundFlag === false) {
        throw "Error: Book not found.";
    }
    for (let author of authors) {
        //check where author id is
        if (author.id === authorId) {
            const name = author.first_name + " " + author.last_name;
            return name;
        }
    }
};

export const sameGenre = async (genre) => {
    //error checking
    if ((typeof genre !== 'string')) {
        throw "Error: Argument is not a string.";
    }
    const trimGenre = genre.trim().toLowerCase();
    if ((trimGenre === "")) {
        throw "Error: Argument string is empty.";
    }
    const books = await getBooks();
    const bookObj = books.filter((item) => (item.genres.some((bookGenre) => bookGenre.toLowerCase() === trimGenre)));
    if (bookObj.length > 0) {
        //return the array
        return bookObj;
    }
    else {
        throw "Error: Books not found.";
    }
};

export const priceRange = async (min, max) => {
    //error checking
    if ((typeof min !== 'number') || (typeof max !== 'number')) {
        throw "Error: Argument is not a number.";
    }
    if (min > max) {
        throw "Error: Min is greater than max.";
    }
    if (min < 0 || max < 0) {
        throw "Error: Invalid numbers.";
    }
    const books = await getBooks();
    let bookPrice = [];
    for (let book of books) {
        if (book.price >= min && book.price <= max) {
            bookPrice.push(book);
        }
    }
    return bookPrice;
};

export const getAllBooksWithAuthorName = async () => {
    const authors = await getAuthors();
    const books = await getBooks();
    for (let book of books) {
        const authorId = book.authorId;
        let fullName = "";
        for (let author of authors) {
            if (authorId === author.id) {
                fullName = author.first_name + " " + author.last_name;
            }
        }
        delete book.authorId;
        book.author = fullName;
    }
    return books;
};
