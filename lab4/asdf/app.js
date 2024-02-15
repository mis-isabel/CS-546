/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/
import * as events from "./data/events.js";
import { dbConnection, closeConnection } from './config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

const patrickBBQ = await events.create("Patrick's Big End of Summer BBQ", "Come join us for our yearly end of summer bbq!", { streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030" }, "phill@stevens.edu", 30, 0, "08/25/2024", "2:00PM", "8:00PM", false);
//console.log(patrickBBQ);
/* const sugaConcert = await events.create("AGUST D | SUGA Concert", "Long awaited SUGA concert is coming soon!", { streetAddress: "Prudential Center", city: "Newark", state: "NJ", zip: "07101" }, "msutedjo@stevens.edu", 3000, 80, "04/28/2024", "7:30PM", "10:00PM", true);
console.log(sugaConcert); */

/* const omakase = await events.create("Sushi Omakase", "Experience a 10 course chef tasting omakase menu!", { streetAddress: "Soho", city: "New York City", state: "NY", zip: "10001" }, "msutedjo@stevens.edu", 5, 100, "05/02/2024", "5:30PM", "8:15PM", false);
events.getAll();

const study = await events.create("Midterm Prep Practice", "You need to study for midterms!", { streetAddress: "Babbio Center", city: "Hoboken", state: "NJ", zip: "07030" }, "msutedjo@stevens.edu", 20, 0, "10/31/2023", "3:30PM", "11:30PM", false);
console.log(study); */

//events.rename(patrickBBQ._id, "Yoongi Concert!");

/* await events.remove(patrickBBQ._id);
await events.getAll();

const bad = await events.create("bad", "no", { streetAddress: "Babbio Center", state: "NJ", zip: "07030" }, "msutedjo@stevens.edu", 20, 0, "10/31/2020", "3:30PM", "11:30AM", false); */
try {
    const asdf = await events.rename(patrickBBQ._id, "asdilfialsdkfj");
    console.log(asdf);
}
catch (e) {
    console.log("bad input");
}

await closeConnection();
