// This file should set up the express server as shown in the lecture code

import express from 'express';
const app = express();
import constructorMethod from './routes/index.js';

app.use(express.json());

constructorMethod(app);

app.listen(3000, () => {
    console.log("server up");
});

// import * as events from "./data/events.js";
// import * as attendees from "./data/attendees.js";
// import { dbConnection, closeConnection } from './config/mongoConnection.js';

// const db = await dbConnection();
//await db.dropDatabase();

// let patrickBBQ = await events.create(
//     "Patrick's Big End of Summer BBQ",
//     "Come join us for our yearly end of summer bbq!",
//     { streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030" },
//     "phill@stevens.edu",
//     30,
//     0,
//     "08/25/2024",
//     "2:00 PM",
//     "8:00 PM",
//     false
// );
//const allEvents = await events.getAll();
//const patrickBBQ2 = await events.update("653f50ab8b8e4a635bdb3c9d", "Patrick's Birthday Bash!", "Come join us for my yearly birthday bash!", { streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030" }, "phill@stevens.edu", 2, 0, "08/25/2024", "2:00 PM", "9:00 PM", true);
// const attendee = await attendees.createAttendee(patrickBBQ._id.toString(), "Jennifer", "Cheng", "JCheng123@gmail.com");
// const event = await attendees.createAttendee(patrickBBQ._id.toString(), "sad", "boi", "helppp@gmail.com");
//const getEvent = await events.get("653f3a0aeb36db4d121d2654");
// const removeEvent = await events.remove(patrickBBQ._id.toString());
// const allAttendees = await attendees.getAllAttendees(patrickBBQ._id.toString());
//const getAttendee = await attendees.getAttendee("653f2f090715da0185e1ca91");
//console.log(getEvent);
// console.log(patrickBBQ);
//console.log(allEvents);
//console.log(patrickBBQ2);
// console.log(attendee);
// console.log(allAttendees);
//const removeAttendee = await attendees.removeAttendee("653f30fb3323f10280110fb3");
//console.log(removeAttendee);
//console.log(getEvent);
//console.log(removeEvent);

//await closeConnection();
