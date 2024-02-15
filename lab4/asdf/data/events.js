// TODO: Export and implement the following functions in ES6 format
import { events } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

export const create = async (
  eventName,
  eventDescription,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  if ((typeof eventName === undefined) || (typeof eventDescription === undefined) || (typeof eventLocation === undefined) || (typeof maxCapacity === undefined) || (typeof contactEmail === undefined) || (typeof priceOfAdmission === undefined) || (typeof eventDate === undefined) || (typeof startTime === undefined) || (typeof endTime === undefined) || (typeof publicEvent === undefined)) {
    throw "Error: Argument is not valid";
  }
  if ((typeof eventName !== 'string') || (typeof eventDescription !== 'string') || (typeof eventDate !== 'string') || (typeof contactEmail !== 'string') || (typeof endTime !== 'string') || (typeof startTime !== 'string')) {
    throw "Error: Argument is not a string.";
  }

  //trimming strings
  const trimName = eventName.trim();
  const trimDescription = eventDescription.trim();
  const trimDate = eventDate.trim();
  const trimEmail = contactEmail.trim();
  const trimStart = startTime.trim();
  const trimEnd = endTime.trim();

  if ((trimName === "") || (trimDescription === "") || (trimDate === "") || (trimEmail === "") || (trimStart === "") || (trimEnd === "")) {
    throw "Error: String is empty.";
  }

  if ((trimName.length < 5) || (trimDescription.length < 25)) {
    throw "Error: Insufficient character count.";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(trimEmail) === false) {
    throw "Error: Invalid email.";
  }
  //error checking time
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/;
  if ((timeRegex.test(trimStart) === false) || (timeRegex.test(trimEnd) === false)) {
    throw "Error: Time is invalid.";
  }
  let startValid = trimStart.split(":");
  let endValid = trimEnd.split(":");
  let tempStart = (startValid[1].slice(0, 2));
  let tempStartAmPm = (startValid[1].slice(2));
  let tempEnd = (endValid[1].slice(0, 2));
  let tempEndAmPm = (endValid[1].slice(2));
  startValid[1] = tempStart;
  startValid[2] = tempStartAmPm;
  endValid[1] = tempEnd;
  endValid[2] = tempEndAmPm;

  //checking if start time is before end time
  if ((startValid[2] === endValid[2] && endValid[0] < startValid[0])) {
    if (startValid[0] === endValid[0] && endValid[1] < startValid[1]) {
      throw "Error: Invalid time.";
    }
    throw "Error: Invalid time.";
  }

  //converting to 24 hour time
  if (startValid[2] === "PM") {
    startValid[0] = Number(startValid[0]) + 12;
  }

  if (endValid[2] === "PM") {
    endValid[0] = Number(endValid[0]) + 12;
  }

  //check end time is at least 30 minutes later
  const startMin = Number(startValid[0]) * 60 + Number(startValid[1]);
  const endMin = Number(endValid[0]) * 60 + Number(endValid[1]);

  if ((endMin - startMin) < 30) {
    throw "Error: Invalid time.";
  }

  //error checking dates
  if (trimDate[2] !== "/" || trimDate[5] !== "/") {
    throw "Error: Invalid date format.";
  }
  let date = trimDate.split("/");
  if ((Number(date[0]) > 12) || (Number(date[0]) < 1)) {
    throw "Error: Month is not valid.";
  }
  const thirtyOne = [1, 3, 5, 7, 8, 10, 12];
  const thirty = [4, 6, 9, 11];

  if ((thirtyOne.includes(Number(date[0])) && ((Number(date[1]) >= 31) || (Number(date[1]) <= 0))) || (thirty.includes(Number(date[0])) && ((Number(date[1]) >= 30) || (Number(date[1]) <= 0)))) {
    throw "Error: Date is not valid.";
  }
  //checking for leap years
  if (Number(date[0]) === 2) {
    if ((Number(date[2]) % 4 === 0 && Number(date[2]) % 100 !== 0) || Number(date[2]) % 400 === 0) {
      if (Number(date[1]) > 29 || Number(date[1]) < 1) {
        throw "Error: Invalid date.";
      }
    } else {
      if (Number(date[1]) > 28 || Number(date[1]) < 1) {
        throw "Error: Invalid date.";
      }
    }
  }

  //find current date and compare to given date
  const currDate = new Date();
  let currDay = currDate.getDate();
  let currMonth = currDate.getMonth() + 1;
  let currYear = currDate.getFullYear();
  let currHour = currDate.getHours();
  let currMinute = currDate.getMinutes();

  if (Number(date[2]) < currYear) {
    throw "Error: Year is not valid.";
  }
  else if (Number(date[2]) === currYear) {
    if (Number(date[1]) > currMonth) {
      throw "Error: Month is not valid.";
    }
    else if (Number(date[1]) === currMonth) {
      if (Number(date[0]) > currDay) {
        throw "Error: Day is not valid.";
      }
      else if (Number(date[0]) === currDay) {
        if (startValid[0] < currHour || (startValid[0] === currHour && startValid[1] <= currMinute)) {
          throw "Error: Time is not valid.";
        }
      }
    }
  }

  if (typeof publicEvent !== 'boolean') {
    throw "Error: Public Event is not a boolean.";
  }

  if ((typeof maxCapacity !== 'number') || (typeof priceOfAdmission !== 'number')) {
    throw "Error: Argument not a number.";
  }

  if (maxCapacity <= 0) {
    throw "Error: Max capacity should be positive whole number."
  }

  //regex for price of admission
  const priceRegex = /^(0|[1-9]\d*)(\.\d{2})?$/;
  if (priceRegex.test(priceOfAdmission.toString()) === false) {
    throw "Error: Invalid price of admission.";
  }

  if (typeof eventLocation !== 'object') {
    throw "Error: Event location is not an object.";
  }

  if (!(eventLocation.streetAddress) || !(eventLocation.city) || !(eventLocation.state) || !(eventLocation.zip)) {
    throw "Error: Invalid event location.";
  }

  if ((typeof eventLocation.streetAddress !== 'string') || (typeof eventLocation.city !== 'string') || (typeof eventLocation.state !== 'string') || (typeof eventLocation.zip !== 'string')) {
    throw "Error: Invalid event location type.";
  }

  if ((typeof eventLocation.streetAddress.trim() === "") || (typeof eventLocation.city.trim() === "") || (typeof eventLocation.state.trim() === "") || (typeof eventLocation.zip === "")) {
    throw "Error: Empty event location.";
  }

  if ((eventLocation.city.trim().length < 3) || (eventLocation.streetAddress.trim().length < 3)) {
    throw "Error: Invalid location.";
  }

  //state abbreviations
  const states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
    'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
    'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
    'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
    'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
  if (!states.includes(eventLocation.state.toUpperCase())) {
    throw "Error: Invalid state.";
  }

  if (eventLocation.zip.length != 5) {
    throw "Error: Invalid zip code.";
  }
  //check for only numbers in zip code
  const zipRegex = /^[0-9]+$/;
  if (zipRegex.test(eventLocation.zip) === false) {
    throw "Error: Invalid zip code.";
  }

  const newEvent = {
    eventName: trimName,
    description: trimDescription,
    eventLocation: eventLocation,
    contactEmail: trimEmail,
    maxCapacity: maxCapacity,
    priceOfAdmission: priceOfAdmission,
    eventDate: trimDate,
    startTime: trimStart,
    endTime: trimEnd,
    publicEvent: publicEvent
  }
  const eventCollection = await events();
  const insertInfo = await eventCollection.insertOne(newEvent);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add event';

  const newId = insertInfo.insertedId.toString();

  const event = await get(newId);
  return event;
}

export const getAll = async () => {
  // referenced lecture 4 code
  const allEvents = await events();
  let eventList = await allEvents.find({}).toArray();
  if (!eventList) {
    throw "Error: No events.";
  }
  eventList = eventList.map((element) => {
    element._id = element._id.toString();
    return element;
  })
  return eventList;
};

export const get = async (id) => {
  //error checking
  if (!id) {
    throw "Error: Id not provided.";
  }
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "Error: Invalid id parameters.";
  }
  //referenced lecture code 4
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw "Error: Invalid id.";
  }
  const eventList = await events();
  const event = await eventList.findOne({ _id: new ObjectId(id) });
  if (event === null) {
    throw "Error: ID does not have events.";
  }
  event._id = event._id.toString();
  return event;
};

export const remove = async (id) => {
  //error checking
  if (!id) {
    throw "Error: Id not provided.";
  }
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "Invalid id.";
  }
  if (!ObjectId.isValid(id)) {
    throw "Error: Invalid id.";
  }
  //referenced lecture 4 code
  const eventList = await events();
  const deleteEvent = await eventList.findOneAndDelete({ _id: new ObjectId(id) });
  if (!deleteEvent) {
    throw "Error: Could not delete event";
  }
  const final = {
    eventName: deleteEvent.eventName,
    deleted: true
  }
  return final;
};

export const rename = async (id, newEventName) => {
  //error checking
  if (!id) {
    throw "Error: Id not provided.";
  }
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "Error: Invalid id.";
  }
  if (!newEventName) {
    throw "Error: New Event Name not provided.";
  }
  if (typeof newEventName !== "string" || newEventName.trim().length === 0) {
    throw "Error: Invalid new event name.";
  }
  if (newEventName.trim().length < 5) {
    throw "Error: New event name is too short.";
  }
  //referenced lecture 4 code
  newEventName = newEventName.trim();

  const updatedEvent = {
    eventName: newEventName
  };
  const eventList = await events();
  const updatedInfo = await eventList.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedEvent },
    { returnDocument: 'after' }
  );
  if (!updatedInfo) {
    throw 'could not update event successfully';
  }
  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
};
