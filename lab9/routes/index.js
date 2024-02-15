//Here you will require route files and export them as used in previous labs.

import check from './palindromeCheck.js';

const constructorMethod = (app) => {
    app.use('/', check);
    app.use('*', (req, res) => {
        res.status(404).json({ error: "Not Found" });
    });
};

export default constructorMethod;
