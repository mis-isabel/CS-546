//import axios, md5
import axios from 'axios';
import md5 from 'blueimp-md5'
const publickey = '8c6c7f87cddedea6c932e5dedc444dc0';
const privatekey = 'e933d5d41f6fac02c1daeebbda643296e82a5ce5';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const idUrl = 'https://gateway.marvel.com/v1/public/characters';

export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  const nameStartsLimitUrl = baseUrl + '?nameStartsWith=' + name + '&limit=15&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  if ((typeof name) !== 'string') {
    throw "Error: Argument is not a string.";
  }
  const trimmed = name.trim();
  if (trimmed == "") {
    throw "Error: name string is empty.";
  }
  const { data } = await axios.get(nameStartsLimitUrl);
  let characters = data.data.results;
  return characters;
};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  const characterIdUrl = idUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  if (isNaN(id)) {
    throw "Error: Argument is not a number.";
  }
  const data = await axios.get(characterIdUrl);
  let characterData = data.data.data.results[0];
  return characterData;
};
