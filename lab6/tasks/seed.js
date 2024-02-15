import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { create, getAll, get, update } from '../data/events.js'
import { createAttendee, getAllAttendees, getAttendee } from "../data/attendees.js";

const db = await dbConnection();

try {
    await db.collection('events').drop();
}
catch (err) {
    console.log(err)
}


const carnival = await create("Carnival"
    , "FAST presents a part amidst the streets of the Phillipines"
    , { streetAddress: "Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030" }
    , "jalcalde@stevens.edu"
    , 150
    , 0
    , "09/21/2024"
    , "8:30 AM"
    , "11:00 PM"
    , true);
const carnivalId = carnival._id.toString();
// console.log(carnivalId);
// console.log(await get(carnivalId));
const masskara = await create("MassKara"
    , "FAST presents a filipino celebration dedicated to bringing smiles to the Philippines"
    , { streetAddress: "River St", city: "Hoboken", state: "NJ", zip: "07030" }
    , "jalcalde@stevens.edu"
    , 150
    , 0
    , "10/19/2024"
    , "8:30 AM"
    , "11:00 PM"
    , true);
const masskaraId = masskara._id.toString();
// console.log(masskaraId);
// console.log(await getAll());

const att1 = await createAttendee(carnivalId, "Jedd", "Alcalde", "jalcalde@stevens.edu")
const att2 = await createAttendee(carnivalId, "Joelle", "An", "jan@stevens.edu")


console.log("Done seeding database");

process.exit();