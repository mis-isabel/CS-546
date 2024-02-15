/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the palindrome check page.

you just need one route to send the static homepage.html file
*/
import { Router } from "express";
const router = Router();
import * as path from "path";

router.route('/').get(async (req, res) => {
    try {
        res.sendFile(path.resolve('static/homepage.html'));
    }
    catch (e) {
        return res.status(404).send(e);
    }
});

export default router;