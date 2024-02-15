// This data file should export all functions using the ES6 standard as shown in the lecture code
import { events } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import eventData from "./events.js";

export const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  //error checking
  if ((typeof eventId === undefined) || (typeof firstName === undefined) || (typeof lastName === undefined) || (typeof emailAddress === undefined)) {
    throw "Error: Argument is not valid"
  }
  if ((typeof eventId !== 'string') || (typeof firstName !== 'string') || (typeof lastName !== 'string') || (typeof emailAddress !== 'string')) {
    throw "Error: Argument is not valid"
  }

  //trimming strings
  const trimId = eventId.trim();
  const trimFirst = firstName.trim();
  const trimLast = lastName.trim();
  const trimEmail = emailAddress.trim();

  if ((trimId === "") || (trimFirst === "") || (trimLast === "") || (trimEmail === "")) {
    throw "Error: String is empty.";
  }
  //referenced lecture code 4
  if (!ObjectId.isValid(trimId)) {
    throw "Error: Invalid id.";
  }
  const eventList = await events();
  const event = await eventList.findOne({ _id: new ObjectId(eventId) });
  if (event === null) {
    throw "Error: ID does not have events.";
  }
  //checking email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(trimEmail) === false) {
    throw "Error: Invalid email.";
  }
  //check for overlapping email
  for (let attendees of event.attendees) {
    if (attendees.emailAddress === emailAddress) {
      throw "Error: Attendee already exists."
    }
  }
  if (event.maxCapacity === event.totalNumberOfAttendees) {
    throw "Error: Max attendees reached."
  }

  const newAttendeeId = new ObjectId();
  const newAttendee = {
    _id: newAttendeeId,
    firstName: trimFirst,
    lastName: trimLast,
    emailAddress: trimEmail
  }

  const filter = { _id: new ObjectId(eventId) };
  const eventNew = await eventList.findOne(filter);
  if (eventNew) {
    eventNew.attendees.push(newAttendee);
    eventNew.totalNumberOfAttendees += 1;
    const updatedInfo = await eventList.findOneAndUpdate(filter,
      { $set: eventNew },
      { returnDocument: 'after' });
    updatedInfo._id = new ObjectId(eventId);
    return updatedInfo;
  }
  else {
    throw 'Error: Could not update attendees successfully';
  }

};

export const getAllAttendees = async (eventId) => {
  //error checking
  if (!eventId) {
    throw "Error: Id not provided.";
  }
  if (typeof eventId !== "string" || eventId.trim().length === 0) {
    throw "Error: Invalid id parameters.";
  }
  eventId = eventId.trim();
  if (!ObjectId.isValid(eventId)) {
    throw "Error: Invalid id.";
  }
  const eventList = await events();

  const event = await eventList.findOne({ _id: new ObjectId(eventId) });
  if (event) {
    //empty array for no attendees
    return event.attendees;
  } else {
    throw "Error: Event not found";
  }
};

export const getAttendee = async (attendeeId) => {
  //error checking
  if (!attendeeId) {
    throw "Error: Id not provided.";
  }
  attendeeId = attendeeId.trim();
  if (typeof attendeeId !== "string" || attendeeId.trim().length === 0) {
    throw "Error: Invalid id parameters.";
  }
  if (!ObjectId.isValid(attendeeId)) {
    throw "Error: Invalid id.";
  }
  const eventList = await events();
  const eventListAll = await eventList.find({}).toArray();
  let find = null;
  for (let event of eventListAll) {
    let attendees = event.attendees;
    for (let attendee of attendees) {
      if (attendee._id.toString() === attendeeId) {
        find = attendee;
      }
    }
  }
  if (find === null) {
    throw "Error: Id does not have attendee.";
  }
  return find;
};

export const removeAttendee = async (attendeeId) => {
  // Validate and clean input
  if (!attendeeId) {
    throw "Error: Attendee ID not provided.";
  }
  attendeeId = attendeeId.trim();
  if (!ObjectId.isValid(attendeeId)) {
    throw "Error: Invalid Attendee ID.";
  }

  const eventList = await events();
  const filter = { "attendees._id": new ObjectId(attendeeId) };
  const update = { $pull: { attendees: { _id: new ObjectId(attendeeId) } } };
  const updatedEvent = await eventList.findOne(filter);
  const result = await eventList.updateOne(filter, update);

  if (result.modifiedCount === 0) {
    throw "Error: Attendee not found in any event.";
  }
  const eventId = updatedEvent._id.toString();
  return await eventData.get(eventId);
};

export default { createAttendee, getAllAttendees, getAttendee, removeAttendee };