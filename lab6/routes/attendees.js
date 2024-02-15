// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from "express";
import { getAllAttendees, getAttendee, createAttendee, removeAttendee } from "../data/attendees.js";
import { attendeeData } from '../data/index.js';
const router = express.Router();

router
  .route('/:eventId')
  .get(async (req, res) => {
    const eventId1 = req.params.eventId;
    try {
      ObjectId.isValid(eventId1);
    }
    catch (e) {
      return res.status(400).send(e);
    }
    try {
      const events = await getAllAttendees(eventId1);
      return res.json(events);
    }
    catch (e) {
      return res.status(404).send(e);
    }
  })
  .post(async (req, res) => {
    const body2 = req.body;
    const eventId1 = req.params.eventId;
    try {
      const final = await createAttendee(eventId1, body2.firstName, body2.lastName, body2.emailAddress);
      return res.json(final);
    }
    catch (e) {
      return res.status(400).send("yo" + e);
    }
  });

router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    const attendeeId1 = req.params.attendeeId;
    try {
      const event1 = await getAttendee(attendeeId1);
      return res.json(event1);
    }
    catch (e) {
      return res.status(404).send(e);
    }
  })
  .delete(async (req, res) => {
    const attendeeId1 = req.params.attendeeId;
    try {
      const event1 = await removeAttendee(attendeeId1);
      return res.json(event1);
    }
    catch (e) {
      return res.status(404).send(e);
    }
  });

export default router;