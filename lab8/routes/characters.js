//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import { Router } from 'express';
const router = Router();
import { searchCharacterById, searchCharacterByName } from '../data/characters.js';

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    res.render('home', { title: 'Marvel Character Finder' });
  }
  catch (e) {
    return res.status(500).send(e);
  }
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  const charSearch = req.body['searchCharacterByName'];
  try {
    if (typeof charSearch !== 'string') {
      res.status(400).render('error', { title: "Marvel Characters Found", errors: e })
      return;
    }
    if (charSearch.trim().length == 0) {
      res.status(400).render('error', { title: "Marvel Characters Found", errors: e })
      return;
    }
    const getCharacters = await searchCharacterByName(charSearch);
    res.render('characterSearchResults', { title: 'Marvel Characters Found', searchResult: charSearch, characters: getCharacters })
  }
  catch (e) {
    return res.status(500).render('error', { title: "Marvel Characters Found", errors: "Error: Invalid input." });
  }
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
  const idSearch = req.params.id;
  try {
    if (isNaN(idSearch)) {
      res.status(400).render('error', { title: "Marvel Characters Found", errors: e })
      return;
    }
    const getCharacter = await searchCharacterById(idSearch);
    const image = getCharacter.thumbnail.path + '.' + getCharacter.thumbnail.extension;
    res.render('characterById', { title: getCharacter.name, character: getCharacter, image: image });
  }
  catch (e) {
    return res.status(404).render('error', { title: "Marvel Characters Found", errors: "Error: Character not found." });
  }
});

//export router
export default router;
