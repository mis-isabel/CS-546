/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.*/

import * as authors from "./authors.js";
try {
    const authorData = await authors.getAuthors();
    console.log(authorData);
} catch (e) {
    console.log(e);
}

import * as books from "./books.js";
try {
    const bookData = await books.getAuthors();
    console.log(bookData);
} catch (e) {
    console.log(e);
}

import { getAuthorById, searchAuthorByName, getBookNames, youngestOldest, sameBirthday } from "./authors.js";
import { getBookById, getAuthorName, sameGenre, priceRange, getAllBooksWithAuthorName } from "./books.js";

try {
    console.log(await getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c"));
    console.log("get author successful");
}
catch (e) {
    console.error("get author failed");
}
try {
    console.log(await getAuthorById("7989fa5e-5617-43f7-a931-46036f9dbcff"));
    console.log("get author successful");
}
catch (e) {
    console.error("get author failed");
}

try {
    console.log(await searchAuthorByName("Tom"));
    console.log("search author successful");
}
catch (e) {
    console.error("search author failed");
}
try {
    console.log(await searchAuthorByName());
    console.log("search author successful");
}
catch (e) {
    console.error("search author failed");
}

try {
    console.log(await getBookNames("Prisca", "Vakhonin"));
    console.log("get book names successful");
}
catch (e) {
    console.error("get book names failed");
}
try {
    console.log(await getBookNames());
    console.log("get book names successful");
}
catch (e) {
    console.error("get book names failed");
}

try {
    console.log(await youngestOldest());
    console.log("get youngest oldest successful");
}
catch (e) {
    console.error("get youngest oldest failed");
}

try {
    console.log(await sameBirthday(10, 12));
    console.log("get youngest oldest successful");
}
catch (e) {
    console.error("get youngest oldest failed");
}
try {
    console.log(await sameBirthday("09", "31"));
    console.log("get youngest oldest successful");
}
catch (e) {
    console.error("get youngest oldest failed");
}

try {
    console.log(await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"));
    console.log("get book by id successful");
}
catch (e) {
    console.error("get book by id failed");
}
try {
    console.log(await getBookById("7989fa5e-5617-43f7-a931-46036f9dbcff"));
    console.log("get book by id successful");
}
catch (e) {
    console.error("get book by id failed");
}

try {
    console.log(await getAuthorName("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"));
    console.log("get author name successful");
}
catch (e) {
    console.error("get author name failed");
}
try {
    console.log(await getAuthorName("7989fa5e-5617-43f7-a931-46036f9dbcff"));
    console.log("get author name successful");
}
catch (e) {
    console.error("get author name failed");
}

try {
    console.log(await sameGenre("Memoir"));
    console.log("get genre successful");
}
catch (e) {
    console.error("get genre failed");
}
try {
    console.log(await sameGenre("foo bar"));
    console.log("get genre successful");
}
catch (e) {
    console.error("get genre failed");
}

try {
    console.log(await priceRange(5.99, 30));
    console.log("get price range successful");
}
catch (e) {
    console.error("get price range failed");
}
try {
    console.log(await priceRange(-7, 5));
    console.log("get price range successful");
}
catch (e) {
    console.error("get price range failed");
}

try {
    console.log(await getAllBooksWithAuthorName());
    console.log("replacing author ids successful");
}
catch (e) {
    console.error("replacing author ids failed");
} 