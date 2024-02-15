//Here you will import route files and export them as used in previous labs
import characters from './characters.js';

const constructorMethod = (app) => {
    app.use('/', characters);
    app.use('*', (req, res) => {
        res.status(404).json({ error: "Not Found" });
    });
};

export default constructorMethod;